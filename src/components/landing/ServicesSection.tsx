import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";

const SERVICES = [
  {
    title: "Ясли",
    age: "От 1,5 до 3 лет",
    desc: "Быстрая адаптация",
    icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/e17abf1b-eaa0-43fe-b7f0-ec754690b647.png",
    cardClass: "service-card-nursery",
    type: "link" as const,
    href: "/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli",
    goal: "click_service_yasli",
  },
  {
    title: "Старшая группа",
    age: "От 4 до 6 лет",
    desc: "Качественная подготовка к школе",
    icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/c72fac87-c170-45ca-9636-8d52fca5e6d1.png",
    cardClass: "service-card-senior",
    type: "link" as const,
    href: "/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_starshaya",
    goal: "click_service_school",
  },
  {
    title: "Английский",
    age: "Абонемент 4 000 ₽/мес",
    desc: "Ведёт Наталья Петровна — играя и говоря, без зубрёжки",
    icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/c72fac87-c170-45ca-9636-8d52fca5e6d1.png",
    cardClass: "service-card-english",
    type: "modal" as const,
    goal: "click_service_english",
    btnLabel: "Записаться",
  },
  {
    title: "Логопед",
    age: "",
    desc: "Коррекция звукопроизношения",
    icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/e6e11d33-b047-402b-b655-2c9e294def42.png",
    cardClass: "service-card-speech",
    type: "modal" as const,
    goal: "click_service_speech",
    btnLabel: "Записаться на консультацию",
  },
];

interface ServicesSectionProps {
  onOpenModal: (source?: string) => void;
}

export default function ServicesSection({ onOpenModal }: ServicesSectionProps) {
  return (
    <Section id="services" className="bg-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Наши услуги</span>
          <h2 className="section-h2">Программы<br />для каждого возраста</h2>
        </div>
        <div className="services-grid services-grid-4">
          {SERVICES.map((s) => (
            <div key={s.title} className={`service-card ${s.cardClass}`}>
              <div className="service-icon-wrap">
                <img src={s.icon} alt={s.title} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              {s.age && <div className="service-age">{s.age}</div>}
              <p className="service-desc">{s.desc}</p>
              {s.type === "link" ? (
                <Link to={s.href} className="service-btn" onClick={() => ymGoal(s.goal)}>
                  Подробнее <Icon name="ArrowRight" size={15} />
                </Link>
              ) : (
                <button className="service-btn" onClick={() => { ymGoal(s.goal); onOpenModal(s.goal); }}>
                  {s.btnLabel} <Icon name="ArrowRight" size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}