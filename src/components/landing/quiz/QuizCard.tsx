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
      <button className="quiz-card-btn-lead quiz-card-btn" onClick={onStart}>
        <Icon name="Star" size={14} className="quiz-card-btn-lead-star" />
        <span>{config.card.button}</span>
        <Icon name="ArrowRight" size={18} />
      </button>
    </div>
  );
}