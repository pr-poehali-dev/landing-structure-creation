// ── Утилиты маски и валидации телефона: +7 (___) ___-__-__ ──────────────────
// Принимает любые 11-значные номера, начинающиеся с 7 или 8 (мобильные и городские).

/** Достаёт только цифры из строки */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Нормализует введённые/вставленные цифры к 11-значному номеру, начинающемуся с "7".
 * "8 988..." → "7 988...", "988..." (10 цифр) → "7 988...".
 */
function normalizeDigits(raw: string): string {
  let d = digitsOnly(raw);
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10 && !d.startsWith("7")) d = "7" + d;
  if (!d.startsWith("7") && d.length > 0) d = "7" + d;
  return d.slice(0, 11);
}

/** Форматирует нормализованные цифры (начинаются с "7") в маску +7 (___) ___-__-__ */
export function formatPhoneDigits(d: string): string {
  if (!d) return "";
  const rest = d.slice(1); // цифры после ведущей "7"
  let result = "+7";
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += `)`;
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
}

/** Форматирует любой ввод (набор с клавиатуры или вставка из буфера) в маску */
export function formatPhoneInput(raw: string): string {
  return formatPhoneDigits(normalizeDigits(raw));
}

/** true, если номер полный (11 цифр, начинается с 7) */
export function isPhoneComplete(raw: string): boolean {
  return normalizeDigits(raw).length === 11;
}

/** Приводит номер к единому нормализованному виду для CRM: +7 988 123-45-67 */
export function normalizePhoneForCrm(raw: string): string {
  const d = normalizeDigits(raw);
  if (d.length !== 11) return raw.trim();
  const rest = d.slice(1);
  return `+7 ${rest.slice(0, 3)} ${rest.slice(3, 6)}-${rest.slice(6, 8)}-${rest.slice(8, 10)}`;
}

export const PHONE_ERROR_MESSAGE = "Допишите номер целиком — он нужен, чтобы мы вам перезвонили";

/** Значение маски для пустого поля при первом фокусе */
export const PHONE_EMPTY_MASK = "+7 (";
