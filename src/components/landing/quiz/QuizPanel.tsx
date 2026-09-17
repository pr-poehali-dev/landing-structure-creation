import { useState } from "react";
import Icon from "@/components/ui/icon";
import QuizModal from "./QuizModal";
import type { QuizConfig } from "./types";

// ── QuizPanel — глубокая синяя панель-триггер квиза на /podgotovka-k-shkole/ ─
// Панель сама является карточкой (без вложенного белого блока), с оверлайном
// рукописным шрифтом сверху.
interface QuizPanelProps {
  config: QuizConfig;
  overline: string;
}

export default function QuizPanel({ config, overline }: QuizPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="quiz-panel-wrap">
      <p className="quiz-panel-overline">{overline}</p>
      <div className="quiz-panel">
        <div className="quiz-panel-icon">
          <Icon name="ListChecks" size={22} />
        </div>
        <div className="quiz-panel-body">
          <h3 className="quiz-panel-title">{config.card.title}</h3>
          <p className="quiz-panel-subtitle">{config.card.subtitle}</p>
        </div>
        <button className="quiz-panel-btn" onClick={() => setOpen(true)}>
          <Icon name="Star" size={14} className="quiz-panel-btn-star" />
          <span>{config.card.button}</span>
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
      <QuizModal config={config} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
