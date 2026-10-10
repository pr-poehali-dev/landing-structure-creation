import hmac
import json
import os

import psycopg2

S = os.environ.get('MAIN_DB_SCHEMA', 't_p54774028_landing_structure_cr')
from datetime import datetime, timedelta, timezone

from contract_render import contract_html, signature_mark_html, questionnaire_html

MSK = timezone(timedelta(hours=3))
MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

CORS = {'Access-Control-Allow-Origin': '*'}


def reply(status: int, payload) -> dict:
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(payload, ensure_ascii=False, default=str)}


def authorized(event: dict) -> bool:
    expected = os.environ.get('CONTRACTS_ADMIN_KEY', '')
    given = (event.get('headers') or {})
    key = given.get('X-Auth-Token') or given.get('x-auth-token') or ''
    return bool(expected) and hmac.compare_digest(key.encode(), expected.encode())


def handler(event: dict, context) -> dict:
    """Админка договоров: список подписанных договоров и карточка договора. Доступ только по ключу в заголовке X-Auth-Token"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }
    if not authorized(event):
        return reply(401, {'error': 'Неверный ключ доступа'})

    params = event.get('queryStringParameters') or {}
    contract_id = str(params.get('id', '')).strip()

    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
    except Exception:
        return reply(503, {'error': 'База данных временно недоступна'})
    try:
        cur = conn.cursor()
        if contract_id:
            if not contract_id.isdigit():
                return reply(400, {'error': 'Некорректный номер'})
            cur.execute(
                "SELECT id, signed_at, full_name, email, tariff, ip, status, form_json, kind "
                f"FROM {S}.contracts WHERE id = {int(contract_id)}"
            )
            row = cur.fetchone()
            if row is None:
                return reply(404, {'error': 'Договор не найден'})
            form = json.loads(row[7])
            form['kind'] = row[8]
            if params.get('format') == 'doc':
                dt = row[1].astimezone(MSK)
                date_str = f'«{dt.day:02d}» {MONTHS[dt.month - 1]} {dt.year} г.'
                mark = signature_mark_html(form, dt.strftime('%d.%m.%Y'), dt.strftime('%H:%M:%S') + ' (МСК)', row[5] or '')
                html_doc = mark + contract_html(form, row[0], date_str) + questionnaire_html(form) + mark
                return reply(200, {'id': row[0], 'html': html_doc})
            return reply(200, {
                'id': row[0], 'signed_at': row[1], 'full_name': row[2], 'email': row[3],
                'tariff': row[4], 'ip': row[5], 'status': row[6], 'kind': row[8], 'form': form,
            })
        cur.execute(
            f"SELECT id, signed_at, full_name, email, tariff, status, kind, (form_json::json)->>'source' FROM {S}.contracts ORDER BY id DESC LIMIT 500"
        )
        items = [
            {'id': r[0], 'signed_at': r[1], 'full_name': r[2], 'email': r[3], 'tariff': r[4], 'status': r[5], 'kind': r[6], 'source': r[7] or ''}
            for r in cur.fetchall()
        ]
        return reply(200, {'items': items})
    finally:
        conn.close()
