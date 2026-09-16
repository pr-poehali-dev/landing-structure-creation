// ── Типы данных «Карты готовности» (диагностика 5-7 лет) ───────────────────

export interface ReadinessParam {
  id: string;
  /** Номер параметра в медовом круге (1-7) */
  number: number;
  title: string;
  hint?: string;
}

/** Семь параметров диагностики — соответствуют содержанию занятия «Предшкольная подготовка» */
export const READINESS_PARAMS: ReadinessParam[] = [
  { id: "reading", number: 1, title: "Чтение", hint: "техника, понимание прочитанного" },
  { id: "writing", number: 2, title: "Письмо", hint: "почерк, посадка, захват пера" },
  { id: "math", number: 3, title: "Математика", hint: "счёт до 20, простые задачи" },
  { id: "attention", number: 4, title: "Внимание", hint: "удержание на задаче 25-30 минут" },
  { id: "speech", number: 5, title: "Речь", hint: "словарный запас, связный пересказ" },
  { id: "motor", number: 6, title: "Мелкая моторика", hint: "рука, готовая к письму" },
  { id: "social", number: 7, title: "Мотивация и поведение", hint: "готовность выполнять правила, интерес к занятиям" },
];

export type VerdictKey = "ready" | "in-progress" | "starting";

export const VERDICTS: { key: VerdictKey; label: string }[] = [
  { key: "ready", label: "готов" },
  { key: "in-progress", label: "в пути" },
  { key: "starting", label: "начинаем сейчас" },
];

export type TrackKey = "foundation-4-5" | "preschool-5-7";
export type FormatKey = "group" | "individual";

export interface ReadinessMapData {
  childName: string;
  childAge: string;
  date: string;
  /** Две сильные стороны в карточке «Что уже сияет» */
  strengths: [string, string];
  /** Оценка 1-5 по каждому из 7 параметров (0 = не оценено) */
  scores: Record<string, number>;
  /** Комментарий под каждым параметром */
  comments: Record<string, string>;
  verdict: VerdictKey | null;
  track: TrackKey | null;
  format: FormatKey | null;
  /** План по месяцам, три строки */
  monthlyPlan: [string, string, string];
  /** Что делать дома — список игр/занятий */
  homeActivities: string;
  /** Скан подписи Ирины Павловны (data URL), только для заполненной версии */
  signatureImage?: string;
}

export const EMPTY_READINESS_MAP: ReadinessMapData = {
  childName: "",
  childAge: "",
  date: "",
  strengths: ["", ""],
  scores: {},
  comments: {},
  verdict: null,
  track: null,
  format: null,
  monthlyPlan: ["", "", ""],
  homeActivities: "",
};

/** Сумма баллов: 7 параметров × максимум 5 = 35 */
export const MAX_TOTAL_SCORE = READINESS_PARAMS.length * 5;

export function calcTotalScore(scores: Record<string, number>): number {
  return READINESS_PARAMS.reduce((sum, p) => sum + (scores[p.id] || 0), 0);
}
