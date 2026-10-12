import hmac
import json
import os
import secrets

import psycopg2

S = os.environ.get('MAIN_DB_SCHEMA', 't_p54774028_landing_structure_cr')

SITE = 'https://ribkadollilend.ru'
PROGRAM_PATH = {'garden': '/dogovor/polny-den/', 'prod': '/dogovor/prodlenka/'}
PROGRAM_ALIASES = {
    'garden': 'garden', 'sad': 'garden', 'сад': 'garden', 'садик': 'garden', 'детский сад': 'garden',
    'prod': 'prod', 'gpd': 'prod', 'гпд': 'prod', 'продлёнка': 'prod', 'продленка': 'prod',
}
PROGRAM_TITLES = {'garden': 'Садик', 'prod': 'ГПД'}
STATUS_TITLES = {'active': 'Активно', 'used': 'Использовано', 'cancelled': 'Отменено'}
MAX_PRICE = 1000000
DEFAULT_LIMIT = 50
MAX_LIMIT = 200

CORS = {'Access-Control-Allow-Origin': '*'}


def reply(status: int, payload) -> dict:
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(payload, ensure_ascii=False, default=str)}


def authorized(event: dict) -> bool:
    expected = os.environ.get('AGENT_API_KEY', '')
    headers = {str(k).lower(): v for k, v in (event.get('headers') or {}).items()}
    given = str(headers.get('x-api-key') or '')
    return bool(expected) and hmac.compare_digest(given.encode(), expected.encode())


def q(s) -> str:
    return "'" + str(s).replace("'", "''") + "'"


def offer_link(program: str, code: str) -> str:
    return f'{SITE}{PROGRAM_PATH[program]}?offer={code}'


def offer_json(r) -> dict:
    return {
        'id': r[0],
        'program': r[1],
        'program_title': PROGRAM_TITLES[r[1]],
        'child_name': r[2],
        'tariff_name': r[3],
        'price_month': r[4],
        'comment': r[5],
        'code': r[6],
        'status': r[7],
        'status_title': STATUS_TITLES[r[7]],
        'created_at': r[8].isoformat(),
        'contract_number': r[9],
        'link': offer_link(r[1], r[6]),
    }


COLUMNS = 'id, program, child_name, tariff_name, price_month, comment, code, status, created_at, contract_id'


def create_offer(cur, body: dict) -> dict:
    program = PROGRAM_ALIASES.get(str(body.get('program', '')).strip().lower())
    if not program:
        return reply(400, {'error': 'Укажите программу: garden (садик) или prod (ГПД)'})
    child_name = str(body.get('child_name', '')).strip()[:200]
    tariff_name = str(body.get('tariff_name', '')).strip()[:200]
    comment = str(body.get('comment', '') or '').strip()[:1000]
    if not child_name:
        return reply(400, {'error': 'Укажите ФИО ребёнка (child_name)'})
    if not tariff_name:
        return reply(400, {'error': 'Укажите название тарифа (tariff_name)'})
    raw_price = body.get('price_month')
    if isinstance(raw_price, bool) or not isinstance(raw_price, (int, str)) or not str(raw_price).strip().isdigit():
        return reply(400, {'error': 'Укажите цену в месяц целым числом рублей (price_month)'})
    price = int(str(raw_price).strip())
    if price <= 0 or price > MAX_PRICE:
        return reply(400, {'error': 'Некорректная цена в месяц'})
    code = secrets.token_urlsafe(12)
    cur.execute(
        f"INSERT INTO {S}.personal_offers (program, child_name, tariff_name, price_month, comment, code) VALUES "
        f"({q(program)}, {q(child_name)}, {q(tariff_name)}, {price}, {q(comment)}, {q(code)}) RETURNING {COLUMNS}"
    )
    return reply(200, {'ok': True, 'offer': offer_json(cur.fetchone())})


def list_offers(cur, body: dict) -> dict:
    where = []
    status = str(body.get('status', '') or '').strip().lower()
    if status:
        if status not in STATUS_TITLES:
            return reply(400, {'error': 'Статус: active, used или cancelled'})
        where.append(f'status = {q(status)}')
    program_raw = str(body.get('program', '') or '').strip().lower()
    if program_raw:
        program = PROGRAM_ALIASES.get(program_raw)
        if not program:
            return reply(400, {'error': 'Программа: garden или prod'})
        where.append(f'program = {q(program)}')
    raw_limit = str(body.get('limit', '')).strip()
    limit = min(int(raw_limit), MAX_LIMIT) if raw_limit.isdigit() and int(raw_limit) > 0 else DEFAULT_LIMIT
    clause = ('WHERE ' + ' AND '.join(where)) if where else ''
    cur.execute(f"SELECT {COLUMNS} FROM {S}.personal_offers {clause} ORDER BY id DESC LIMIT {limit}")
    items = [offer_json(r) for r in cur.fetchall()]
    return reply(200, {'count': len(items), 'items': items})


def cancel_offer(cur, body: dict) -> dict:
    code = str(body.get('code', '') or '').strip()[:100]
    raw_id = str(body.get('id', '') or '').strip()
    if code:
        cond = f'code = {q(code)}'
    elif raw_id.isdigit():
        cond = f'id = {int(raw_id)}'
    else:
        return reply(400, {'error': 'Укажите code или id предложения'})
    cur.execute(f"SELECT {COLUMNS} FROM {S}.personal_offers WHERE {cond}")
    row = cur.fetchone()
    if row is None:
        return reply(404, {'error': 'Предложение не найдено'})
    if row[7] == 'used':
        return reply(409, {'error': 'Предложение уже использовано, отменить нельзя', 'offer': offer_json(row)})
    if row[7] == 'active':
        cur.execute(
            f"UPDATE {S}.personal_offers SET status = 'cancelled' WHERE id = {row[0]} AND status = 'active' RETURNING {COLUMNS}"
        )
        updated = cur.fetchone()
        if updated is None:
            cur.execute(f"SELECT {COLUMNS} FROM {S}.personal_offers WHERE id = {row[0]}")
            return reply(409, {'error': 'Предложение уже использовано, отменить нельзя', 'offer': offer_json(cur.fetchone())})
        row = updated
    return reply(200, {'ok': True, 'offer': offer_json(row)})


ACTIONS = {'create': create_offer, 'list': list_offers, 'cancel': cancel_offer}


def handler(event: dict, context) -> dict:
    """Персональные предложения для Долли: action=create создаёт предложение и возвращает ссылку для родителя, action=list показывает список со статусами, action=cancel отменяет. Доступ по ключу в заголовке X-Api-Key"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }
    if not authorized(event):
        return reply(401, {'error': 'Неверный ключ доступа'})
    if event.get('httpMethod') != 'POST':
        return reply(405, {'error': 'Используйте POST'})
    try:
        body = json.loads(event.get('body') or '{}')
    except ValueError:
        return reply(400, {'error': 'Тело запроса должно быть JSON'})
    if not isinstance(body, dict):
        return reply(400, {'error': 'Тело запроса должно быть JSON-объектом'})
    action = ACTIONS.get(str(body.get('action', '')))
    if action is None:
        return reply(400, {'error': 'Неизвестное действие. Доступно: create, list, cancel'})
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
    except Exception:
        return reply(503, {'error': 'База данных временно недоступна'})
    try:
        cur = conn.cursor()
        result = action(cur, body)
        conn.commit()
        return result
    finally:
        conn.close()
