from datetime import date, timedelta

FIRST_SHIFT_START = date(2027, 6, 7)
SHIFTS_COUNT = 6
SHIFT_DAYS = 14


def _fmt(d: date) -> str:
    return d.strftime('%d.%m.%Y')


SHIFTS = [
    {
        'number': i + 1,
        'from': _fmt(FIRST_SHIFT_START + timedelta(days=SHIFT_DAYS * i)),
        'to': _fmt(FIRST_SHIFT_START + timedelta(days=SHIFT_DAYS * i + 11)),
    }
    for i in range(SHIFTS_COUNT)
]

HALF_GROUPS = {
    'nursery': {'title': 'Ясельная группа', 'from': '8:00', 'to': '12:00'},
    'senior': {'title': 'Старшая группа', 'from': '8:00', 'to': '13:00'},
}
