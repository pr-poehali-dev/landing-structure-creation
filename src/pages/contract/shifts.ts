export interface Shift {
  number: number;
  from: string;
  to: string;
}

const SHIFTS_COUNT = 6;
const SHIFT_WORKDAYS = 10;

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

function nextWorkday(d: Date): Date {
  let r = d;
  while (isWeekend(r)) r = addDays(r, 1);
  return r;
}

function lastWorkday(start: Date): Date {
  let d = start;
  let n = 1;
  while (n < SHIFT_WORKDAYS) {
    d = addDays(d, 1);
    if (!isWeekend(d)) n++;
  }
  return d;
}

function build(year: number) {
  let start = nextWorkday(new Date(year, 5, 1));
  return Array.from({ length: SHIFTS_COUNT }, (_, i) => {
    const end = lastWorkday(start);
    const shift = { number: i + 1, from: fmt(start), to: fmt(end), end };
    start = nextWorkday(addDays(end, 1));
    return shift;
  });
}

export function getShifts(today = new Date()): Shift[] {
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let list = build(day.getFullYear());
  if (day > list[list.length - 1].end) list = build(day.getFullYear() + 1);
  return list.map(({ number, from, to }) => ({ number, from, to }));
}

export const SHIFTS: Shift[] = getShifts();

export const HALF_GROUPS = {
  nursery: { title: "Ясельная группа", note: "С 8:00 до 12:00" },
  senior: { title: "Старшая группа", note: "С 8:00 до 13:00" },
} as const;
