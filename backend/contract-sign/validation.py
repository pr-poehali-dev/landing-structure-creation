import re
from datetime import datetime

REQUIRED = [
    'fullName', 'birthDate', 'passportSeries', 'passportNumber', 'passportIssuedBy', 'passportIssuedDate',
    'passportDeptCode', 'address', 'phoneMother', 'email', 'childName', 'childBirthDate', 'childCertificate',
    'trustedPersons', 'health', 'tariff',
]
FIELDS = REQUIRED + ['phoneFather', 'agreePhoto']


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
    form = {}
    for k in FIELDS:
        v = raw.get(k, '')
        form[k] = bool(v) if k == 'agreePhoto' else str(v or '').strip()[:500]
    for k in REQUIRED:
        if not form[k]:
            return form, 'Заполните все обязательные поля'
    if not raw.get('agreeContract') or not raw.get('agreePersonal'):
        return form, 'Необходимо подтвердить обязательные согласия'
    if form['tariff'] not in ('basic', 'special'):
        return form, 'Выберите тариф'
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
