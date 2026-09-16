import Icon from "@/components/ui/icon";
import type { QuizConfig } from "./types";

// ── QuizCard — карточка-триггер квиза на первом экране страницы ────────────
interface QuizCardProps {
  config: QuizConfig;
  onStart: () => void;
}

export default function QuizCard({ config, onStart }: QuizCardProps) {
  return (
    <div className="quiz-card">
      <div className="quiz-card-icon">
        <Icon name="ListChecks" size={22} />
      </div>
      <div className="quiz-card-body">
        <h3 className="quiz-card-title">{config.card.title}</h3>
        <p className="quiz-card-subtitle">{config.card.subtitle}</p>
      </div>
      <button className="cta-btn cta-btn-outline quiz-card-btn" onClick={onStart}>
        {config.card.button}
        <Icon name="ArrowRight" size={16} />
      </button>
    </div>
  );
}
