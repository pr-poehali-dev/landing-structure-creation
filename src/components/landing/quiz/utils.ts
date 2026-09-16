import type { QuizConfig, QuizVerdict, QuizScaleResult } from "./types";

// ── Подсчёт баллов, вердикта и шкал по ответам квиза ────────────────────────

export function computeTotalScore(config: QuizConfig, answers: Record<number, number>): number {
  return config.questions.reduce((sum, q) => {
    const optIndex = answers[q.id];
    if (optIndex === undefined) return sum;
    return sum + q.options[optIndex].score;
  }, 0);
}

export function findVerdict(config: QuizConfig, score: number): QuizVerdict {
  const match = config.verdicts.find((v) => score >= v.min && score <= v.max);
  return match ?? config.verdicts[config.verdicts.length - 1];
}

export function computeScales(config: QuizConfig, answers: Record<number, number>): QuizScaleResult[] {
  if (!config.scales) return [];
  return config.scales
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((scale) => {
      const scaleKey = scale.key ?? scale.name ?? scale.label ?? "";
      const scaleQuestions = config.questions.filter((q) => q.scale === scaleKey);
      const earned = scaleQuestions.reduce((sum, q) => {
        const optIndex = answers[q.id];
        return sum + (optIndex !== undefined ? q.options[optIndex].score : 0);
      }, 0);
      const max = scaleQuestions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0);
      const percent = max > 0 ? Math.round((earned / max) * 100) : 0;
      return { label: scale.label ?? scale.name ?? scaleKey, percent };
    });
}

export function formatProgress(template: string, current: number, total: number): string {
  return template.replace("{current}", String(current)).replace("{total}", String(total));
}

export function buildQuizResultSummary(
  config: QuizConfig,
  score: number,
  verdict: QuizVerdict,
  scales: QuizScaleResult[]
): string {
  const lines = [`Квиз: «${config.card.title}»`, `Баллы: ${score}`, `Вердикт: ${verdict.title}`];
  if (scales.length) {
    lines.push("Шкалы:");
    scales.forEach((s) => lines.push(`  ${s.label}: ${s.percent}%`));
  }
  return lines.join("\n");
}
