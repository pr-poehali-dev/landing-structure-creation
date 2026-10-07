import json
import os
import time
import html
import urllib.parse
import urllib.request

import psycopg2

CORS = {'Access-Control-Allow-Origin': '*'}
ALLOWED_HOSTS = ('ribkadollilend.ru', 'blogribkadolli.ru', 'ribkadolli.ru')
RATE_LIMIT = 3
RATE_WINDOW_MIN = 60


def reply(status: int, payload: dict) -> dict:
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(payload)}


def client_ip(event: dict) -> str:
    ip = ((event.get('requestContext') or {}).get('identity') or {}).get('sourceIp')
    if not ip:
        forwarded = (event.get('headers') or {}).get('X-Forwarded-For', '')
        ip = forwarded.split(',')[0].strip()
    return ip or 'unknown'


def page_info(body: dict) -> tuple:
    """Возвращает (домен, url страницы) из данных формы; домен проверяется по списку своих сайтов"""
    url = str(body.get('page_url', '')).strip()[:500]
    host = str(body.get('site_host', '')).strip().lower()[:100]
    parsed = urllib.parse.urlparse(url)
    if parsed.hostname:
        host = parsed.hostname.lower()
    if host.startswith('www.'):
        host = host[4:]
    if host not in ALLOWED_HOSTS:
        return 'не определён', ''
    return host, url


def origin_line(body: dict) -> str:
    host, url = page_info(body)
    host_e = html.escape(host)
    if url:
        url_e = html.escape(url, quote=True)
        return f'Заявка отправлена с сайта {host_e}<br>Страница: <a href="{url_e}">{html.escape(url)}</a>'
    return f'Заявка отправлена с сайта {host_e}'


def verify_captcha(token: str, ip: str) -> bool:
    """Проверяет токен Яндекс СмартКапчи. Если серверный ключ не задан — проверка пропускается"""
    secret = os.environ.get('SMARTCAPTCHA_SERVER_KEY')
    if not secret:
        return True
    if not token:
        return False
    data = urllib.parse.urlencode({'secret': secret, 'token': token, 'ip': ip}).encode()
    req = urllib.request.Request('https://smartcaptcha.yandexcloud.net/validate', data=data)
    with urllib.request.urlopen(req, timeout=4) as resp:
        result = json.loads(resp.read().decode())
    return result.get('status') == 'ok'


_memory_hits: dict = {}


def rate_limited_in_memory(ip: str) -> bool:
    """Запасной лимит в памяти экземпляра функции — работает, пока недоступна таблица в БД"""
    now = time.time()
    window = RATE_WINDOW_MIN * 60
    hits = [t for t in _memory_hits.get(ip, []) if now - t < window]
    if len(hits) >= RATE_LIMIT:
        _memory_hits[ip] = hits
        return True
    hits.append(now)
    _memory_hits[ip] = hits
    return False


def rate_limited(ip: str, scope: str) -> bool:
    """Не более 3 заявок в час с одного IP. Записывает попытку, если лимит не превышен"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return rate_limited_in_memory(ip)
    try:
        return rate_limited_db(dsn, ip, scope)
    except Exception:
        return rate_limited_in_memory(ip)


def rate_limited_db(dsn: str, ip: str, scope: str) -> bool:
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        ip_q = ip.replace("'", "''")
        scope_q = scope.replace("'", "''")
        cur.execute(
            f"SELECT COUNT(*) FROM form_rate_limit WHERE ip = '{ip_q}' "
            f"AND created_at > NOW() - INTERVAL '{RATE_WINDOW_MIN} minutes'"
        )
        count = cur.fetchone()[0]
        if count >= RATE_LIMIT:
            return True
        cur.execute(f"INSERT INTO form_rate_limit (ip, scope) VALUES ('{ip_q}', '{scope_q}')")
        conn.commit()
        return False
    finally:
        conn.close()


def check_request(event: dict, body: dict, scope: str):
    """Общая проверка: honeypot, капча, лимит. Возвращает готовый ответ при отказе, иначе None"""
    ip = client_ip(event)
    if str(body.get('website', '')).strip():
        print(f'[guard:{scope}] отброшено ловушкой для ботов, ip={ip}')
        return reply(200, {'ok': True})
    if not verify_captcha(str(body.get('captcha_token', '')), ip):
        print(f'[guard:{scope}] капча не пройдена, ip={ip}')
        return reply(403, {'error': 'Проверка не пройдена'})
    if rate_limited(ip, scope):
        print(f'[guard:{scope}] превышен лимит, ip={ip}')
        return reply(429, {'error': 'Слишком много заявок, попробуйте позже'})
    print(f'[guard:{scope}] проверки пройдены, ip={ip}')
    return None