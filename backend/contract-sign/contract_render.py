import html

import re

from contract_kinds import KINDS, kind_or_default
from contract_config import HALF_HOURS

TARIFFS = {
    'basic': 'Основной (25 000 руб./мес)',
    'special': 'Специальный (20 000 руб./мес, минимальный срок 4 месяца)',
    'morning': 'Утренняя продлёнка (с 8:00 до 12:30)',
    'day': 'Дневная продлёнка (с 12:00 до 18:00)',
    'half': 'Неполный день с питанием (18 000 руб./мес)',
    'club': 'Летний клуб (15 500 руб. за смену)',
}
INN = '911116164829'
PROD_DAY = 'Дневная группа продлёнки (с 12:00 до 18:00)'
PROD_MORNING = 'Утренняя группа продлёнки (с 8:00 до 12:30)'


def esc(s) -> str:
    return html.escape(str(s))


def runs_html(runs: list) -> str:
    out = ''
    for r in runs:
        t = esc(r['t'])
        if r.get('b'):
            t = f'<strong>{t}</strong>'
        if r.get('i'):
            t = f'<em>{t}</em>'
        out += t
    return out


def items_html(items: list, tag: str = 'ol', fill=None) -> str:
    out = f'<{tag} style="margin:6px 0;padding-left:28px;">'
    for it in items:
        plain = ''.join(r['t'] for r in it['r'])
        filled = fill(plain) if fill else plain
        body = esc(filled) if filled != plain else runs_html(it['r'])
        out += f'<li>{body}'
        if it.get('sub'):
            out += items_html(it['sub'], 'ol', fill)
        out += '</li>'
    return out + f'</{tag}>'


def passport_text(form: dict) -> str:
    return (
        f'паспорт серия {esc(form["passportSeries"])} № {esc(form["passportNumber"])}, '
        f'выдан {esc(form["passportIssuedBy"])}, код подразделения {esc(form["passportDeptCode"])}, '
        f'дата выдачи {esc(form["passportIssuedDate"])} г.'
    )


def header_html(form: dict, number: int, date_str: str, kind: str = 'garden') -> str:
    """Шапка договора с подставленными данными анкеты вместо прочерков"""
    passport = passport_text(form)
    if kind in ('club', 'half'):
        blocks = KINDS[kind]['blocks']
        title = ''.join(r['t'] for r in blocks[1]['r'])
        party = ''.join(r['t'] for r in blocks[3]['r']).replace('ИНН _______________________', f'ИНН {INN}')
        tail_src = ''.join(r['t'] for r in blocks[4]['r'])
        tail = tail_src.split('(ФИО, дата рождения), ', 1)[-1]
        return (
            f'<h1 style="text-align:center;">ДОГОВОР № {number}</h1>'
            f'<p>{esc(title)}</p>'
            f'<p><strong>г. Керчь, {esc(date_str)}</strong></p>'
            f'<p>{esc(party)}</p>'
            f'<p><strong>{esc(form["fullName"])}</strong> (ФИО полностью), дата рождения {esc(form["birthDate"])}, {passport} '
            f'Зарегистрирован(а) по адресу: {esc(form["address"])}, действующий(ая) в интересах ребёнка '
            f'<strong>{esc(form["childName"])}</strong>, дата рождения {esc(form["childBirthDate"])}, '
            f'свидетельство о рождении № {esc(form["childCertificate"])} (ФИО, дата рождения), {esc(tail)}</p>'
        )
    return (
        f'<h1 style="text-align:center;">ДОГОВОР № {number}</h1>'
        '<p>об оказании услуг по присмотру и уходу за детьми</p>'
        f'<p><strong>г. Керчь, {esc(date_str)}</strong></p>'
        f'<p>Индивидуальный предприниматель Савченко Ирина Игоревна, ОГРНИП 318911200074795, ИНН {INN}, '
        'именуемая в дальнейшем «Исполнитель», с одной стороны, и</p>'
        f'<p><strong>{esc(form["fullName"])}</strong> (ФИО полностью), дата рождения {esc(form["birthDate"])}, {passport} '
        f'Зарегистрирован(а) по адресу: {esc(form["address"])}, действующий(ая) в интересах ребёнка '
        f'<strong>{esc(form["childName"])}</strong>, дата рождения {esc(form["childBirthDate"])}, '
        f'свидетельство о рождении № {esc(form["childCertificate"])} (ФИО, дата рождения), '
        'именуемый(ая) в дальнейшем «Заказчик», с другой стороны, совместно именуемые «Стороны», '
        'заключили настоящий договор о нижеследующем:</p>'
    )


SIGN_NOTE = 'подписано простой электронной подписью'
U = r'_{3,}'


def _sub(pattern: str, repl: str, text: str) -> str:
    return re.sub(pattern, lambda m: repl, text, count=1)


def fill_item(text: str, form: dict) -> str:
    """Пункты списка анкеты (неполный день): подставляет данные в прочерки"""
    if text.startswith('Фамилия, имя Ребёнка:'):
        return _sub(U, form['childName'], text)
    if text.startswith('Дата рождения:'):
        return _sub(U, form['childBirthDate'], text)
    if text.startswith('Свидетельство о рождении:'):
        return f'Свидетельство о рождении: {form["childCertificate"]}'
    if text.startswith('ФИО родителей'):
        t = _sub(r'Мама:\s*' + U, f'Мама: {form["phoneMother"]}', text)
        return _sub(r'Папа:\s*' + U, f'Папа: {form.get("phoneFather") or "—"}', t)
    if text.startswith('Домашний адрес:'):
        return _sub(U, form['address'], text)
    if text.startswith('Лица, которым доверено забирать Ребёнка:'):
        return f'Лица, которым доверено забирать Ребёнка: {form["trustedPersons"]}, тел. {form["phoneMother"]}'
    if text.startswith('Сведения о состоянии здоровья'):
        return _sub(U, form['health'], text)
    return fill_generic(text, form, 0, '')


def fill_generic(text: str, form: dict, number: int, date_str: str) -> str:
    """Согласия и прочие места с прочерками: подставляет данные анкеты, номер и дату договора"""
    if '_' not in text:
        return text
    t = text
    t = re.sub(r'^«_*»\s*_+\s*20_*\s*г\.\s*_+\s*/.*$', lambda m: f'{date_str} Подпись: {SIGN_NOTE}', t)
    t = re.sub(r'(^Я, |нижеподписавш\S*\s)' + U, lambda m: m.group(1) + form['fullName'], t, count=1)
    t = _sub(r'свидетельство о рождении серия\s+' + U + r'\s*№\s*' + U, f'свидетельство о рождении № {form["childCertificate"]}', t)
    t = _sub(r'серия\s+' + U + r'\s*№\s*' + U, f'серия {form["passportSeries"]} № {form["passportNumber"]}', t)
    t = _sub(r'выдан\s+' + U, f'выдан {form["passportIssuedBy"]}', t)
    if 'выдан ' in t and 'года' in t:
        t = re.sub(r'«_*»\s*_+\s*_+\s*года', lambda m: f'{form["passportIssuedDate"]} года', t, count=1)
    t = re.sub(r'(по адресу:|адрес регистрации:)\s*' + U, lambda m: f'{m.group(1)} {form["address"]}', t, count=1)
    t = _sub(r'несовершеннолетнего\s+' + U, f'несовершеннолетнего {form["childName"]}, {form["childBirthDate"]} г.р.', t)
    t = _sub(r'Договора № _+ от «_*» _+ 20 г\.', f'Договора № {number} от {date_str}', t)
    t = _sub(r'контактный телефон:\s*' + U, f'контактный телефон: {form["phoneMother"]}', t)
    t = _sub(r'e-mail:\s*' + U, f'e-mail: {form["email"]}', t)
    t = _sub(r'ИП/ООО «»', 'ИП Савченко И.И.', t)
    t = _sub(r'приходящегося мне\s+' + U, 'приходящегося мне ребёнком', t)
    t = _sub(r'Подпись:\s*_{3,}', f'Подпись: {SIGN_NOTE}', t)
    return t


def fill_paragraph(text: str, form: dict, date_str: str, number: int = 0, kind: str = 'garden') -> str:
    """Подставляет данные анкеты в прочерки приложений, анкеты и согласий; остальной текст не меняется"""
    name = form['fullName']
    if text.startswith('Заказчик: Я, ___'):
        return _sub(r'Я, ' + U, 'Я, ' + name, text)
    if text.startswith('Дата: ___'):
        return f'Дата: {date_str} Подпись: {SIGN_NOTE}'
    if text.startswith('Фамилия, имя Ребёнка:'):
        return (
            f'Фамилия, имя Ребёнка: {form["childName"]} '
            f'Номер свидетельства о рождении: {form["childCertificate"]} '
            f'Дата рождения: {form["childBirthDate"]} '
            f'Данные паспорта родителя (Заказчика): серия {form["passportSeries"]} № {form["passportNumber"]}, '
            f'выдан {form["passportIssuedBy"]}, {form["passportIssuedDate"]}, код подразделения {form["passportDeptCode"]} '
            f'ФИО родителей (законных представителей), контактные телефоны: '
            f'Мама: {form["phoneMother"]} Папа: {form.get("phoneFather") or "—"} '
            f'Домашний адрес: {form["address"]} '
            f'Лица, которым доверено забирать Ребёнка: {form["trustedPersons"]} '
            f'Сведения о состоянии здоровья, аллергиях, хронических заболеваниях: {form["health"]}'
        )
    if text.startswith('Согласие на обработку персональных данных'):
        return text.replace('Подпись: ____________', f'Подпись: {SIGN_NOTE}')
    if 'фото- и видеоматериалов' in text and text.startswith(('Я, ____', 'Я, нижеподписавш')) or (
        text.startswith('Я, ____') and 'фото- и видеосъёмку' in text
    ):
        if not form.get('agreePhoto'):
            return 'Заказчик не дал согласие на фото- и видеосъёмку Ребёнка.'
    if kind == 'club':
        t = _sub(
            r'с «_*» _+ 20 г\. по «_*» _+ 20 г\. включительно\. Номер смены: _+\.',
            f'с {form.get("shiftFrom", "")} по {form.get("shiftTo", "")} включительно. Номер смены: {form.get("shiftNumber", "")}.',
            text,
        )
        if t != text:
            return t
        if 'ИНН ___' in text:
            return text.replace('ИНН _______________________', f'ИНН {INN}')
    if kind == 'half' and 'в период с ______ до ______ час.' in text and HALF_HOURS[0]:
        return text.replace('с ______ до ______ час.', f'с {HALF_HOURS[0]} до {HALF_HOURS[1]} час.')
    if kind == 'prod':
        if text.strip() == 'г. Керчь':
            return f'г. Керчь, {date_str}'
        t = text
        t = re.sub(r'^, и ' + U, lambda m: f', и {name}', t)
        t = re.sub(r'учащегося\s+' + U + r'класса\s+' + U, lambda m: f'учащегося {form.get("schoolClass", "")} класса {form["childName"]}', t)
        t = re.sub(r'^' + U + r' 20 _+ года рождения', lambda m: f'{form["childBirthDate"]} года рождения', t)
        t = re.sub(r'(Свидетельство о рождении ребенка)' + U, lambda m: f'{m.group(1)}: {form["childCertificate"]}', t)
        t = re.sub(
            r'(адрес прописки\))' + U,
            lambda m: (
                f'{m.group(1)}: серия {form["passportSeries"]} № {form["passportNumber"]}, выдан {form["passportIssuedBy"]}, '
                f'{form["passportIssuedDate"]}, код подразделения {form["passportDeptCode"]}; адрес: {form["address"]}'
            ),
            t,
        )
        t = re.sub(r'(Телефон родителя/законного представителя)' + U, lambda m: f'{m.group(1)}: {form["phoneMother"]}', t)
        if t != text:
            return t
        if text.startswith('"_____"'):
            return date_str
        if text.startswith('Заказчик _'):
            return f'Заказчик: {name} ({SIGN_NOTE})'
        if text.startswith('Руководитель ИП'):
            return 'Руководитель: ИП Савченко И.И.'
    return fill_generic(text, form, number, date_str)


def contract_html(form: dict, number: int, date_str: str) -> str:
    kind = kind_or_default(form.get('kind'))
    blocks = KINDS[kind]['blocks']
    out = '' if kind == 'prod' else header_html(form, number, date_str, kind)
    started = kind == 'prod'
    for blk in blocks:
        k = blk['k']
        if not started:
            if k == 'h2':
                started = True
            else:
                continue
        if kind == 'prod' and k == 'h2' and blk['t'].strip() == 'Анкета':
            break
        if k == 'h1':
            t = esc(blk['t']).replace('Б/Н', str(number))
            out += f'<h1 style="text-align:center;">{t}</h1>'
        elif k == 'h2':
            t = esc(blk['t']).replace('к Договору № ___', f'к Договору № {number}').replace('№ Б/Н', f'№ {number}')
            out += f'<h2>{t}</h2>'
        elif k == 'p':
            plain = ''.join(r['t'] for r in blk['r'])
            filled = fill_paragraph(plain, form, date_str, number, kind)
            body = esc(filled) if filled != plain else runs_html(blk['r'])
            out += f'<p>{body}</p>'
        elif k in ('ol', 'ul'):
            out += items_html(
                blk['items'],
                k,
                lambda text: fill_item(text, form) if kind == 'half' else fill_paragraph(text, form, date_str, number, kind),
            )
        elif k == 'table':
            out += '<table style="border-collapse:collapse;width:100%;font-size:14px;">'
            for ri, row in enumerate(blk['rows']):
                out += '<tr>' + ''.join(
                    f'<td style="border:1px solid #999;padding:6px;vertical-align:top;'
                    f'{"font-weight:bold;background:#eee;" if ri == 0 else ""}">{esc(c)}</td>' for c in row
                ) + '</tr>'
            out += '</table>'
    return out


def signature_mark_html(form: dict, date_str: str, time_str: str, ip: str) -> str:
    kind = kind_or_default(form.get('kind'))
    tariff = TARIFFS.get(form.get('tariff'), form.get('tariff', ''))
    photo = 'да' if form.get('agreePhoto') else 'нет'
    label = 'Группа' if kind == 'prod' else 'Тариф'
    extra = ''
    if kind == 'club':
        early = 'да (+3 000 руб. за смену)' if form.get('earlyVisit') else 'нет'
        extra = (
            f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Смена:</td>'
            f'<td>№ {esc(form.get("shiftNumber", ""))}, {esc(form.get("shiftFrom", ""))} — {esc(form.get("shiftTo", ""))}</td></tr>'
            f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Раннее посещение с 8:00:</td><td>{esc(early)}</td></tr>'
        )
    return (
        '<div style="margin-top:24px;padding:14px 16px;border:2px solid #2e7d32;border-radius:8px;background:#f1f8f1;">'
        '<h3 style="margin:0 0 8px;">Отметка о подписании</h3>'
        f'<p style="margin:0 0 8px;">Договор «{esc(KINDS[kind]["short"])}» подписан простой электронной подписью ({esc(KINDS[kind]["sign_clause"])}).</p>'
        '<table style="font-size:14px;">'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Дата:</td><td>{esc(date_str)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Время:</td><td>{esc(time_str)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Email:</td><td>{esc(form["email"])}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">IP-адрес:</td><td>{esc(ip)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">{label}:</td><td>{esc(tariff)}</td></tr>'
        f'{extra}'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Согласие на фото- и видеосъёмку:</td><td>{photo}</td></tr>'
        '</table></div>'
    )


def questionnaire_html(form: dict) -> str:
    """Данные анкеты, которых нет в шапке договора"""
    kind = kind_or_default(form.get('kind'))
    rows = [
        ('Телефон (мама)', form['phoneMother']),
        ('Телефон (папа)', form.get('phoneFather') or '—'),
        ('Лица, которым доверено забирать Ребёнка', form['trustedPersons']),
        ('Состояние здоровья / аллергии', form['health']),
    ]
    if kind == 'prod':
        rows = [
            ('Ф.И.О. ребёнка', form['childName']),
            ('Дата рождения ребёнка', form['childBirthDate']),
            ('Домашний адрес', form['address']),
            ('Школа', form.get('school') or '—'),
            ('Класс', form.get('schoolClass') or '—'),
            ('Группа', PROD_MORNING if form.get('tariff') == 'morning' else PROD_DAY),
            ('Родитель: ФИО', form['fullName']),
            ('Родитель: дата рождения', form['birthDate']),
            ('Родитель: место работы, должность', form.get('parentWork') or '—'),
            ('Родитель: телефон', form['phoneMother']),
            ('Второй родитель: ФИО', form.get('parent2Name') or '—'),
            ('Второй родитель: место работы, должность', form.get('parent2Work') or '—'),
            ('Второй родитель: телефон', form.get('phoneFather') or '—'),
            ('Лица, которым доверено забирать Ребёнка', form['trustedPersons']),
            ('Хронические заболевания, аллергии', form['health']),
            ('Творческие увлечения ребёнка', form.get('hobbies') or '—'),
        ]
    out = '<h2>Данные анкеты-заявления</h2><table style="font-size:14px;">'
    for k, v in rows:
        out += f'<tr><td style="padding:3px 12px 3px 0;color:#666;vertical-align:top;">{esc(k)}:</td><td>{esc(v)}</td></tr>'
    return out + '</table>'
