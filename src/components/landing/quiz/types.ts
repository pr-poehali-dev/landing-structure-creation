// ── Типы конфига квиза (см. схему в quiz-*.json) ───────────────────────────

export interface QuizOption {
  label: string;
  score: number;
  /** Всплывающая подсказка после выбора ответа. Опционально — не все квизы её используют. */
  line?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
  /** Ключ шкалы (только для квизов со шкалами, напр. 5-7) */
  scale?: string;
}

export interface QuizVerdictCta {
  label: string;
  action: string;
  formType?: string;
}

export interface QuizVerdict {
  min: number;
  max: number;
  title: string;
  text: string;
  cta: QuizVerdictCta;
  /** Персональная цель Метрики для клика по CTA этого результата (для аналитики по вердиктам) */
  resultGoal?: string;
  /** Текст, который автоматически подставляется в поле "Комментарий" формы заявки */
  prefillComment?: string;
}

export interface QuizScale {
  id?: string;
  key?: string;
  name?: string;
  label?: string;
  maxScore?: number;
  order?: number;
}

export interface QuizMetrics {
  started: string;
  completed: string;
  /** Аналитическая цель клика по CTA на экране результата (до заполнения формы).
   *  НЕ добавлять в целевые действия рекламной кампании — только для отчётов. */
  cta?: string;
  lead: string;
  quizIdInEvent: string;
}

export interface QuizConfig {
  quizId: string;
  page: string;
  card: {
    title: string;
    subtitle: string;
    button: string;
  };
  ui: {
    back: string;
    next: string;
    result: string;
    progress: string;
  };
  disclaimer: string;
  questions: QuizQuestion[];
  verdicts: QuizVerdict[];
  scales: QuizScale[] | null;
  metrics: QuizMetrics;
}

export interface QuizScaleResult {
  label: string;
  percent: number;
}