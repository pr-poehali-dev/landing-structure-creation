import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";

const SAFETY_MAIN = [
  { icon: "KeyRound", text: "Электронный замок на входной двери" },
  { icon: "Camera", text: "Видеонаблюдение во всех группах" },
  { icon: "DoorOpen", text: "3 пожарных выхода" },
  { icon: "Lightbulb", text: "Бактерицидные лампы закрытого типа" },
];

const SAFETY_MORE = [
  { icon: "Flame", text: "Пожарная безопасность" },
  { icon: "BriefcaseMedical", text: "Аптечка первой помощи — воспитатели имеют сертификат" },
  { icon: "Trees", text: "Своя закрытая площадка для прогулок" },
  { icon: "Thermometer", text: "Индивидуальное отопление" },
];

// ── БЛОК 5: Безопасность (кратко) ───────────────────────────────────────────
interface SafetySectionProps {
  id?: string;
}

export default function SafetySection({ id = "safety" }: SafetySectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section id={id} className="bg-white">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Безопасность</span>
          <h2 className="section-h2">Мы заботимся<br />о безопасности детей</h2>
        </div>

        <div className="safety-layout">
          <div className="phone-frame">
            <div className="phone-frame-notch" />
            <video
              src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/4c6ede15-7344-4e48-9347-b67c23097995.mp4"
              poster="/images/safety-video-poster.jpg"
              controls
              playsInline
              width="100%"
              style={{ display: "block" }}
            />
          </div>

          <div className="safety-cards">
            {SAFETY_MAIN.map((item, i) => (
              <div key={i} className="safety-card">
                <Icon name={item.icon} size={22} />
                <span>{item.text}</span>
              </div>
            ))}

            {expanded && SAFETY_MORE.map((item, i) => (
              <div key={`more-${i}`} className="safety-card">
                <Icon name={item.icon} size={22} />
                <span>{item.text}</span>
              </div>
            ))}

            <button className="safety-more-btn" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Свернуть" : "Подробнее о безопасности"}
              <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}