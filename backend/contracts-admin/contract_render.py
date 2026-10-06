import html

from contract_blocks import BLOCKS

TARIFFS = {'basic': 'Основной (25 000 руб./мес)', 'special': 'Специальный (20 000 руб./мес, минимальный срок 4 месяца)'}


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


def items_html(items: list) -> str:
    out = '<ol style="margin:6px 0;padding-left:28px;">'
    for it in items:
        out += f'<li>{runs_html(it["r"])}'
        if it.get('sub'):
            out += items_html(it['sub'])
        out += '</li>'
    return out + '</ol>'


def header_html(form: dict, number: int, date_str: str) -> str:
    """Шапка договора с подставленными данными анкеты вместо прочерков"""
    passport = (
        f'паспорт серия {esc(form["passportSeries"])} № {esc(form["passportNumber"])}, '
        f'выдан {esc(form["passportIssuedBy"])}, код подразделения {esc(form["passportDeptCode"])}, '
        f'дата выдачи {esc(form["passportIssuedDate"])} г.'
    )
    return (
        f'<h1 style="text-align:center;">ДОГОВОР № {number}</h1>'
        '<p>об оказании услуг по присмотру и уходу за детьми</p>'
        f'<p><strong>г. Керчь, {esc(date_str)}</strong></p>'
        '<p>Индивидуальный предприниматель Савченко Ирина Игоревна, ОГРНИП 318911200074795, ИНН 911116164829, '
        'именуемая в дальнейшем «Исполнитель», с одной стороны, и</p>'
        f'<p><strong>{esc(form["fullName"])}</strong> (ФИО полностью), дата рождения {esc(form["birthDate"])}, {passport} '
        f'Зарегистрирован(а) по адресу: {esc(form["address"])}, действующий(ая) в интересах ребёнка '
        f'<strong>{esc(form["childName"])}</strong>, дата рождения {esc(form["childBirthDate"])}, '
        f'свидетельство о рождении № {esc(form["childCertificate"])} (ФИО, дата рождения), '
        'именуемый(ая) в дальнейшем «Заказчик», с другой стороны, совместно именуемые «Стороны», '
        'заключили настоящий договор о нижеследующем:</p>'
    )


SIGN_NOTE = 'подписано простой электронной подписью'


def fill_paragraph(text: str, form: dict, date_str: str) -> str:
    """Подставляет данные анкеты в прочерки приложений, анкеты и согласий; остальной текст не меняется"""
    name = form['fullName']
    if text.startswith('Заказчик: Я, ___'):
        return text.replace('Я, ' + '_' * 42, 'Я, ' + name, 1)
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
    if text.startswith('Я, ____'):
        if not form.get('agreePhoto'):
            return 'Заказчик не дал согласие на фото- и видеосъёмку Ребёнка.'
        text = text.replace('Я, ' + '_' * 54, 'Я, ' + name, 1)
        text = text.replace('паспорт серия ____ № ________', f'паспорт серия {form["passportSeries"]} № {form["passportNumber"]}', 1)
        text = text.replace('выдан ' + '_' * 30, 'выдан ' + form['passportIssuedBy'], 1)
        text = text.replace('несовершеннолетнего ' + '_' * 38, 'несовершеннолетнего ' + form['childName'], 1)
        return text.replace('Подпись: ____________', f'Подпись: {SIGN_NOTE}')
    return text


def contract_html(form: dict, number: int, date_str: str) -> str:
    out = header_html(form, number, date_str)
    started = False
    for blk in BLOCKS:
        k = blk['k']
        if not started:
            if k == 'h2':
                started = True
            else:
                continue
        if k == 'h1':
            out += f'<h1 style="text-align:center;">{esc(blk["t"])}</h1>'
        elif k == 'h2':
            t = esc(blk['t']).replace('к Договору № ___', f'к Договору № {number}')
            out += f'<h2>{t}</h2>'
        elif k == 'p':
            plain = ''.join(r['t'] for r in blk['r'])
            filled = fill_paragraph(plain, form, date_str)
            body = esc(filled) if filled != plain else runs_html(blk['r'])
            out += f'<p>{body}</p>'
        elif k == 'ol':
            out += items_html(blk['items'])
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
    tariff = TARIFFS.get(form['tariff'], form['tariff'])
    photo = 'да' if form.get('agreePhoto') else 'нет'
    return (
        '<div style="margin-top:24px;padding:14px 16px;border:2px solid #2e7d32;border-radius:8px;background:#f1f8f1;">'
        '<h3 style="margin:0 0 8px;">Отметка о подписании</h3>'
        '<p style="margin:0 0 8px;">Договор подписан простой электронной подписью (п. 8.3.1 Договора).</p>'
        '<table style="font-size:14px;">'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Дата:</td><td>{esc(date_str)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Время:</td><td>{esc(time_str)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Email:</td><td>{esc(form["email"])}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">IP-адрес:</td><td>{esc(ip)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Тариф:</td><td>{esc(tariff)}</td></tr>'
        f'<tr><td style="padding:2px 12px 2px 0;color:#666;">Согласие на фото- и видеосъёмку:</td><td>{photo}</td></tr>'
        '</table></div>'
    )


def questionnaire_html(form: dict) -> str:
    """Данные анкеты, которых нет в шапке договора"""
    rows = [
        ('Телефон (мама)', form['phoneMother']),
        ('Телефон (папа)', form.get('phoneFather') or '—'),
        ('Лица, которым доверено забирать Ребёнка', form['trustedPersons']),
        ('Состояние здоровья / аллергии', form['health']),
    ]
    out = '<h2>Данные анкеты-заявления</h2><table style="font-size:14px;">'
    for k, v in rows:
        out += f'<tr><td style="padding:3px 12px 3px 0;color:#666;vertical-align:top;">{esc(k)}:</td><td>{esc(v)}</td></tr>'
    return out + '</table>'
