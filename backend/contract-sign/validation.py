import re
from datetime import datetime

from contract_config import HALF_GROUPS, SHIFTS
from contract_kinds import KINDS

BASE_REQUIRED = [
    'fullName', 'birthDate', 'passportSeries', 'passportNumber', 'passportIssuedBy', 'passportIssuedDate',
    'passportDeptCode', 'address', 'phoneMother', 'email', 'childName', 'childBirthDate', 'childCertificate',
    'trustedPersons', 'health', 'tariff',
]
EXTRA_REQUIRED = {
    'garden': [],
    'half': ['halfGroup'],
    'club': ['shiftNumber'],
    'prod': ['school', 'schoolClass'],
}
OPTIONAL = [
    'phoneFather', 'agreePhoto', 'earlyVisit', 'shiftFrom', 'shiftTo', 'parentWork', 'parent2Name', 'parent2Work', 'hobbies',
    'school', 'schoolClass', 'shiftNumber', 'halfGroup',
]
TARIFFS = {
    'garden': ('basic', 'special'),
    'half': ('half',),
    'club': ('club',),
    'prod': ('morning', 'day'),
}


def digits(s: str) -> str:
    return re.sub(r'\D', '', s)


def valid_date(s: str) -> bool:
    try:
        d = datetime.strptime(s, '%d.%m.%Y')
    except ValueError:
        return False
    return 1900 <= d.year and d <= datetime.now()


def clean_form(raw: dict) -> tuple:
    """Возвращает (очищенная анкета, текст ошибки или None)"""
    kind = raw.get('kind') if raw.get('kind') in KINDS else 'garden'
    required = BASE_REQUIRED + EXTRA_REQUIRED[kind]
    form = {'kind': kind}
    for k in required + OPTIONAL:
        v = raw.get(k, '')
        form[k] = bool(v) if k in ('agreePhoto', 'earlyVisit') else str(v or '').strip()[:500]
    for k in required:
        if not form[k]:
            return form, 'Заполните все обязательные поля'
    if not raw.get('agreeContract') or not raw.get('agreePersonal'):
        return form, 'Необходимо подтвердить обязательные согласия'
    if form['tariff'] not in TARIFFS[kind]:
        return form, 'Выберите тариф'
    if kind == 'half' and form['halfGroup'] not in HALF_GROUPS:
        return form, 'Выберите группу'
    if kind == 'club':
        shift = next((s for s in SHIFTS if str(s['number']) == form['shiftNumber']), None)
        if SHIFTS and shift is None:
            return form, 'Выберите смену'
        if shift:
            form['shiftFrom'], form['shiftTo'] = shift['from'], shift['to']
        elif not (valid_shift_date(form['shiftFrom']) and valid_shift_date(form['shiftTo'])):
            return form, 'Укажите даты смены'
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]{2,}$', form['email']):
        return form, 'Некорректный email'
    form['email'] = form['email'].lower()
    if len(digits(form['phoneMother'])) != 11:
        return form, 'Некорректный телефон'
    if form['phoneFather'] and len(digits(form['phoneFather'])) != 11:
        return form, 'Некорректный телефон'
    for k in ('birthDate', 'passportIssuedDate', 'childBirthDate'):
        if not valid_date(form[k]):
            return form, 'Некорректная дата'
    if len(digits(form['passportSeries'])) != 4 or len(digits(form['passportNumber'])) != 6:
        return form, 'Некорректные паспортные данные'
    if len(digits(form['passportDeptCode'])) != 6:
        return form, 'Некорректный код подразделения'
    return form, None


def valid_shift_date(s: str) -> bool:
    try:
        datetime.strptime(s, '%d.%m.%Y')
    except ValueError:
        return False
    return True
