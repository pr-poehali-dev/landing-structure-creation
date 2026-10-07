import hashlib
import json
import secrets
from datetime import datetime, timedelta, timezone

from guard import client_ip, reply, verify_captcha
from validation import clean_form
from contract_render import contract_html, signature_mark_html, questionnaire_html
from mailer import send_code, send_signed
from store import Store, MAX_CODES_PER_HOUR

MSK = timezone(timedelta(hours=3))
MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']


def hash_code(email: str, code: str) -> str:
    return hashlib.sha256(f'{email}:{code}'.encode()).hexdigest()


def request_code(event: dict, body: dict) -> dict:
    form, error = clean_form(body.get('form') or {})
    if error:
        return reply(400, {'error': error})
    ip = client_ip(event)
    if not verify_captcha(str(body.get('captcha_token', '')), ip):
        return reply(403, {'error': 'Проверка не пройдена'})
    store = Store()
    try:
        if store.codes_last_hour(form['email']) >= MAX_CODES_PER_HOUR:
            return reply(429, {'error': 'Слишком много запросов кода, попробуйте через час'})
        code = f'{secrets.randbelow(1000000):06d}'
        store.create_code(form['email'], hash_code(form['email'], code), form)
    finally:
        store.close()
    send_code(form['email'], code)
    return reply(200, {'ok': True})


def verify_code(event: dict, body: dict) -> dict:
    email = str(body.get('email', '')).strip().lower()
    code = ''.join(ch for ch in str(body.get('code', '')) if ch.isdigit())
    if not email or len(code) != 6:
        return reply(400, {'error': 'Введите 6-значный код из письма'})
    ip = client_ip(event)
    store = Store()
    try:
        row = store.latest_active(email)
        if row is None:
            return reply(404, {'error': 'Код не найден. Запросите новый код'})
        code_id, code_hash, form_json, _attempts, blocked, expired = row
        if blocked:
            return reply(429, {'error': 'Слишком много неверных попыток. Попробуйте через 5 минут'})
        if expired:
            return reply(410, {'error': 'Срок действия кода истёк. Запросите новый код'})
        if hash_code(email, code) != code_hash:
            now_blocked = store.register_failure(code_id)
            if now_blocked:
                return reply(429, {'error': 'Слишком много неверных попыток. Попробуйте через 5 минут'})
            return reply(400, {'error': 'Неверный код'})
        form = json.loads(form_json)
        number = store.consume_and_create_contract(code_id, form, ip)
        if not number:
            return reply(409, {'error': 'Код уже использован'})
    finally:
        store.close()

    now = datetime.now(MSK)
    date_str = f'«{now.day:02d}» {MONTHS[now.month - 1]} {now.year} г.'
    time_str = now.strftime('%H:%M:%S') + ' (МСК)'
    body_html = (
        '<div style="font-family:Arial,sans-serif;max-width:760px;line-height:1.5;">'
        + signature_mark_html(form, now.strftime('%d.%m.%Y'), time_str, ip)
        + contract_html(form, number, date_str)
        + questionnaire_html(form)
        + signature_mark_html(form, now.strftime('%d.%m.%Y'), time_str, ip)
        + '</div>'
    )
    send_signed(form['email'], number, body_html, form.get('kind', 'garden'))
    return reply(200, {'ok': True, 'number': number})


def handler(event: dict, context) -> dict:
    """Подписание договора простой электронной подписью: action=request_code отправляет код на email, action=verify_code проверяет код и рассылает подписанный договор"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }
    body = json.loads(event.get('body') or '{}')
    if str(body.get('website', '')).strip():
        return reply(200, {'ok': True})
    action = body.get('action')
    if action == 'request_code':
        return request_code(event, body)
    if action == 'verify_code':
        return verify_code(event, body)
    return reply(400, {'error': 'Неизвестное действие'})
