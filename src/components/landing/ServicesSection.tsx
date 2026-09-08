import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";
import { IMG_YASLI_HERO, IMG_STARSHAYA_HERO, IMG_VIKTORIA_ANATOLIEVNA, IMG_NATALIA_PETROVNA } from "./constants";

const SERVICES = [
  {
    title: "Ясли",
    age: "От 1,5 до 3 лет",
    desc: "Быстрая адаптация",
    photo: IMG_YASLI_HERO,
    cardClass: "service-card-nursery service-card-photo",
    overlayClass: "service-overlay-peach",
    deficit: "Свободно 2 места",
    type: "link" as const,
    href: "/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli",
    goal: "click_service_yasli",
  },
  {
    title: "Старшая группа",
    age: "От 4 до 6 лет",
    desc: "Качественная подготовка к школе",
    photo: IMG_STARSHAYA_HERO,
    cardClass: "service-card-senior service-card-photo",
    overlayClass: "service-overlay-honey",
    deficit: "Свободно 4 места",
    type: "link" as const,
    href: "/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_starshaya",
    goal: "click_service_school",
  },
  {
    title: "Английский",
    age: "Абонемент 4 000 ₽/мес",
    desc: "Ведёт Наталья Петровна — играя и говоря, без зубрёжки",
    medallion: IMG_NATALIA_PETROVNA,
    cardClass: "service-card-english",
    type: "modal" as const,
    goal: "click_service_english",
    btnLabel: "Записаться",
  },
  {
    title: "Логопед",
    age: "",
    desc: "Коррекция звукопроизношения",
    medallion: IMG_VIKTORIA_ANATOLIEVNA,
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
            <div
              key={s.title}
              className={`service-card ${s.cardClass}`}
              style={s.photo ? { backgroundImage: `url(${s.photo})` } : undefined}
            >
              {s.overlayClass && <div className={`service-card-photo-overlay ${s.overlayClass}`} />}
              <div className="service-card-body">
                {s.deficit && <div className="service-card-deficit">{s.deficit}</div>}
                {s.medallion ? (
                  <div className="service-icon-wrap">
                    <img src={s.medallion} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                ) : !s.photo ? (
                  <div className="service-icon-wrap" />
                ) : null}
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}