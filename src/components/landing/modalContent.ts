// ── Контекстная модалка заявки: типы и контент по типу ──────────────────────

export type ModalType = "tour" | "diagnostics" | "lessons2x";

export interface ModalContentConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
}

export const MODAL_CONTENT: Record<ModalType, ModalContentConfig> = {
  tour: {
    title: "Записаться на экскурсию",
    subtitle: "Покажем ясли, познакомим с воспитателями, ответим на все вопросы",
    submitLabel: "Записаться на экскурсию",
  },
  diagnostics: {
    title: "Записаться на бесплатную диагностику",
    subtitle: "40 минут игры с Ириной Павловной: уйдёте с картой готовности и планом по месяцам",
    submitLabel: "Записаться на диагностику",
  },
  lessons2x: {
    title: "Записаться на пробное занятие",
    subtitle: "Подготовка к школе 2 раза в неделю — без полного пребывания в саду",
    submitLabel: "Записаться на пробное занятие",
  },
};

/** Метрические цели lead_* по типу модалки — единые для обычных форм и квизов */
export const LEAD_GOAL_BY_TYPE: Record<ModalType, string> = {
  tour: "lead_tour",
  diagnostics: "lead_diagnostics",
  lessons2x: "lead_lessons2x",
};

/**
 * Определяет тип модалки: явный type (или formType из конфига квиза) имеет приоритет,
 * иначе выводится из source (fundament/predshkola → diagnostics, podgotovka2x → lessons2x, остальное → tour).
 */
export function deriveModalType(source?: string, explicitType?: string): ModalType {
  if (explicitType === "diagnostics" || explicitType === "tour" || explicitType === "lessons2x") return explicitType;
  if (source === "fundament" || source === "predshkola") return "diagnostics";
  if (source === "podgotovka2x") return "lessons2x";
  return "tour";
}

export const CHILD_AGE_OPTIONS = [
  "Ещё не родился(ась)",
  "До 1,5 лет",
  "1,5–3 года",
  "3–4 года",
  "4–5 лет",
  "5–6 лет",
  "6–7 лет",
  "Уже школьник(ца)",
];