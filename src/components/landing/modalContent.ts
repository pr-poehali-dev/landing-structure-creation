// ── Контекстная модалка заявки: типы и контент по типу ──────────────────────

export type ModalType = "tour" | "diagnostics";

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
};

/** Метрические цели lead_* по типу модалки — единые для обычных форм и квизов */
export const LEAD_GOAL_BY_TYPE: Record<ModalType, string> = {
  tour: "lead_tour",
  diagnostics: "lead_diagnostics",
};

/**
 * Определяет тип модалки: явный type (или formType из конфига квиза) имеет приоритет,
 * иначе выводится из source (fundament/predshkola → diagnostics, остальное → tour).
 */
export function deriveModalType(source?: string, explicitType?: string): ModalType {
  if (explicitType === "diagnostics" || explicitType === "tour") return explicitType;
  if (source === "fundament" || source === "predshkola") return "diagnostics";
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
