from datetime import date, timedelta

SEASON_START_MONTH = 6
SEASON_START_DAY = 1
SHIFTS_COUNT = 6
SHIFT_WORKDAYS = 10

HALF_GROUPS = {
    'nursery': {'title': 'Ясельная группа', 'from': '8:00', 'to': '12:00'},
    'senior': {'title': 'Старшая группа', 'from': '8:00', 'to': '13:00'},
}


def _fmt(d: date) -> str:
    return d.strftime('%d.%m.%Y')


def _next_workday(d: date) -> date:
    while d.weekday() >= 5:
        d += timedelta(days=1)
    return d


def _last_workday(start: date) -> date:
    d, n = start, 1
    while n < SHIFT_WORKDAYS:
        d += timedelta(days=1)
        if d.weekday() < 5:
            n += 1
    return d


def _build(year: int) -> list:
    start = _next_workday(date(year, SEASON_START_MONTH, SEASON_START_DAY))
    out = []
    for i in range(SHIFTS_COUNT):
        end = _last_workday(start)
        out.append({'number': i + 1, 'from': _fmt(start), 'to': _fmt(end), 'end': end})
        start = _next_workday(end + timedelta(days=1))
    return out


def get_shifts(today: date = None) -> list:
    """Смены ближайшего сезона: первая в первый рабочий день с 1 июня, каждая — 10 рабочих дней, суббота и воскресенье не считаются"""
    today = today or date.today()
    shifts = _build(today.year)
    if today > shifts[-1]['end']:
        shifts = _build(today.year + 1)
    return [{'number': x['number'], 'from': x['from'], 'to': x['to']} for x in shifts]
