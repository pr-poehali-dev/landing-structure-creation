from datetime import date, timedelta

SEASON_START_MONTH = 6
SEASON_START_DAY = 1
SHIFTS_COUNT = 6
SHIFT_DAYS = 14
SHIFT_WORKDAYS = 10

HALF_GROUPS = {
    'nursery': {'title': 'Ясельная группа', 'from': '8:00', 'to': '12:00'},
    'senior': {'title': 'Старшая группа', 'from': '8:00', 'to': '13:00'},
}


def _fmt(d: date) -> str:
    return d.strftime('%d.%m.%Y')


def _last_workday(start: date) -> date:
    d, n = start, 1
    while n < SHIFT_WORKDAYS:
        d += timedelta(days=1)
        if d.weekday() < 5:
            n += 1
    return d


def get_shifts(today: date = None) -> list:
    """Смены ближайшего сезона: первая начинается 1 июня, далее каждые 2 недели"""
    today = today or date.today()
    year = today.year
    first = date(year, SEASON_START_MONTH, SEASON_START_DAY)
    last_start = first + timedelta(days=SHIFT_DAYS * (SHIFTS_COUNT - 1))
    if today > _last_workday(last_start):
        first = date(year + 1, SEASON_START_MONTH, SEASON_START_DAY)
    out = []
    for i in range(SHIFTS_COUNT):
        s = first + timedelta(days=SHIFT_DAYS * i)
        out.append({'number': i + 1, 'from': _fmt(s), 'to': _fmt(_last_workday(s))})
    return out
