import hmac
import json
import os

import psycopg2

S = os.environ.get('MAIN_DB_SCHEMA', 't_p54774028_landing_structure_cr')

CORS = {'Access-Control-Allow-Origin': '*'}

TARIFF_TITLES = {
    'basic': 'Основной',
    'special': 'Специальный',
    'half': 'Неполный день с питанием',
    'club': 'Смена летнего клуба',
    'morning': 'Утренняя продлёнка',
    'day': 'Дневная продлёнка',
}
TARIFF_AMOUNTS = {
    'basic': 25000,
    'special': 20000,
    'half': 18000,
    'club': 15500,
    'morning': 15000,
    'day': 15000,
}
KIND_TITLES = {
    'garden': 'Детский сад',
    'prod': 'Продлёнка',
    'half': 'Неполный день с питанием',
    'club': 'Летний клуб',
}
EARLY_VISIT_EXTRA = 3000
DEFAULT_LIMIT = 50
MAX_LIMIT = 200


def reply(status: int, payload) -> dict:
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(payload, ensure_ascii=False, default=str)}


def authorized(event: dict) -> bool:
    expected = os.environ.get('AGENT_API_KEY', '')
    headers = {str(k).lower(): v for k, v in (event.get('headers') or {}).items()}
    given = str(headers.get('x-api-key') or '')
    return bool(expected) and hmac.compare_digest(given.encode(), expected.encode())


def amount_for(tariff: str, form: dict):
    base = TARIFF_AMOUNTS.get(tariff)
    if base is None:
        return None
    if tariff == 'club' and form.get('earlyVisit'):
        base += EARLY_VISIT_EXTRA
    return base


def handler(event: dict, context) -> dict:
    """Кабинет агента: только чтение списка последних подписанных договоров. Доступ по ключу в заголовке X-Api-Key"""
    method = event.get('httpMethod')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }
    if not authorized(event):
        return reply(401, {'error': 'Неверный ключ доступа'})
    if method != 'GET':
        return reply(405, {'error': 'Разрешено только чтение (GET)'})

    params = event.get('queryStringParameters') or {}
    raw_limit = str(params.get('limit', '')).strip()
    limit = int(raw_limit) if raw_limit.isdigit() and int(raw_limit) > 0 else DEFAULT_LIMIT
    limit = min(limit, MAX_LIMIT)

    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        conn.set_session(readonly=True, autocommit=True)
    except Exception:
        return reply(503, {'error': 'База данных временно недоступна'})
    try:
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, signed_at, full_name, email, tariff, status, kind, form_json "
            f"FROM {S}.contracts WHERE COALESCE((form_json::json)->>'isTest', '') <> 'true' ORDER BY id DESC LIMIT {limit}"
        )
        items = []
        for r in cur.fetchall():
            form = json.loads(r[7])
            items.append({
                'contract_number': r[0],
                'signed_at': r[1].isoformat(),
                'parent_name': r[2],
                'child_name': form.get('childName', ''),
                'child_birth_date': form.get('childBirthDate', ''),
                'phone': form.get('phoneMother', ''),
                'phone_second': form.get('phoneFather', ''),
                'email': r[3],
                'service': KIND_TITLES.get(r[6], r[6]),
                'tariff': TARIFF_TITLES.get(r[4], r[4]),
                'amount': amount_for(r[4], form),
                'currency': 'RUB',
                'status': r[5],
                'source': form.get('source', ''),
            })
        return reply(200, {'count': len(items), 'items': items})
    finally:
        conn.close()
