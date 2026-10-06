import hmac
import json
import os

import psycopg2

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
                "SELECT id, signed_at, full_name, email, tariff, ip, status, form_json "
                f"FROM contracts WHERE id = {int(contract_id)}"
            )
            row = cur.fetchone()
            if row is None:
                return reply(404, {'error': 'Договор не найден'})
            return reply(200, {
                'id': row[0], 'signed_at': row[1], 'full_name': row[2], 'email': row[3],
                'tariff': row[4], 'ip': row[5], 'status': row[6], 'form': json.loads(row[7]),
            })
        cur.execute(
            "SELECT id, signed_at, full_name, email, tariff, status FROM contracts ORDER BY id DESC LIMIT 500"
        )
        items = [
            {'id': r[0], 'signed_at': r[1], 'full_name': r[2], 'email': r[3], 'tariff': r[4], 'status': r[5]}
            for r in cur.fetchall()
        ]
        return reply(200, {'items': items})
    finally:
        conn.close()
