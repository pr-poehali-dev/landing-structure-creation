export interface Shift {
  number: number;
  from: string;
  to: string;
}

const FIRST_SHIFT_START = new Date(2027, 5, 7);
const SHIFTS_COUNT = 6;
const SHIFT_DAYS = 14;

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const SHIFTS: Shift[] = Array.from({ length: SHIFTS_COUNT }, (_, i) => ({
  number: i + 1,
  from: fmt(addDays(FIRST_SHIFT_START, SHIFT_DAYS * i)),
  to: fmt(addDays(FIRST_SHIFT_START, SHIFT_DAYS * i + 11)),
}));

export const HALF_GROUPS = {
  nursery: { title: "Ясельная группа", note: "С 8:00 до 12:00" },
  senior: { title: "Старшая группа", note: "С 8:00 до 13:00" },
} as const;
