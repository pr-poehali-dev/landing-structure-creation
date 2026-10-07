export interface Shift {
  number: number;
  from: string;
  to: string;
}

const SHIFTS_COUNT = 6;
const SHIFT_DAYS = 14;
const SHIFT_WORKDAYS = 10;

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

function lastWorkday(start: Date): Date {
  let d = start;
  let n = 1;
  while (n < SHIFT_WORKDAYS) {
    d = addDays(d, 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) n++;
  }
  return d;
}

export function getShifts(today = new Date()): Shift[] {
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let first = new Date(day.getFullYear(), 5, 1);
  if (day > lastWorkday(addDays(first, SHIFT_DAYS * (SHIFTS_COUNT - 1)))) first = new Date(day.getFullYear() + 1, 5, 1);
  return Array.from({ length: SHIFTS_COUNT }, (_, i) => {
    const s = addDays(first, SHIFT_DAYS * i);
    return { number: i + 1, from: fmt(s), to: fmt(lastWorkday(s)) };
  });
}

export const SHIFTS: Shift[] = getShifts();

export const HALF_GROUPS = {
  nursery: { title: "Ясельная группа", note: "С 8:00 до 12:00" },
  senior: { title: "Старшая группа", note: "С 8:00 до 13:00" },
} as const;
