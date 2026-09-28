import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";
import {
  IMG_YASLI_HERO,
  IMG_STARSHAYA_HERO,
  IMG_VIKTORIA_ANATOLIEVNA,
  IMG_NATALIA_PETROVNA,
  IMG_RANETS_ICON,
} from "./constants";

const AGE_CARDS = [
  {
    key: "yasli",
    title: "Ясли",
    subtitle: "1,5–3 года",
    desc: "Мягкая адаптация, группа полного дня",
    badge: "Свободно 2 места",
    photo: IMG_YASLI_HERO,
    accent: "sage" as const,
    href: "/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli",
    btnLabel: "Подробнее",
    goal: "click_service_yasli",
  },
  {
    key: "starshaya",
    title: "Старшая группа",
    subtitle: "4–6 лет",
    desc: (
      <>
        Две программы на выбор:
        <ul>
          <li>4-5 лет — Фундамент: учимся учиться через игру</li>
          <li>5-7 лет — Подготовка к школе: чтение, письмо, счёт</li>
        </ul>
      </>
    ),
    badge: "Свободно 4 места",
    photo: IMG_STARSHAYA_HERO,
    accent: "sage" as const,
    href: "/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_starshaya",
    btnLabel: "Выбрать программу",
    goal: "click_service_school",
    wide: true,
  },
  {
    key: "podgotovka2x",
    title: "Подготовка к школе",
    subtitle: "Занятия 2 раза в неделю",
    desc: "Чтение, письмо, математика. Без полного дня — для тех, кто ходит в другой сад",
    badge: "2 раза в неделю",
    photo: IMG_RANETS_ICON,
    accent: "lavender" as const,
    href: "/podgotovka-k-shkole-2-raza-v-nedelyu/?utm_source=main&utm_medium=internal&utm_campaign=hub_podgotovka2x",
    btnLabel: "Подробнее",
    goal: "click_service_podgotovka2x",
  },
];

const EXTRA_SERVICES = [
  {
    title: "Английский",
    age: "Абонемент 4 000 ₽/мес",
    desc: "Ведёт Наталья Петровна — играя и говоря, без зубрёжки",
    medallion: IMG_NATALIA_PETROVNA,
    cardClass: "service-card-english",
    goal: "click_service_english",
    btnLabel: "Записаться",
    topIcon: "Languages" as const,
  },
  {
    title: "Логопед",
    age: "",
    desc: "Коррекция звукопроизношения",
    medallion: IMG_VIKTORIA_ANATOLIEVNA,
    cardClass: "service-card-speech",
    goal: "click_service_speech",
    btnLabel: "Записаться на консультацию",
    topIcon: "MicVocal" as const,
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

        <div className="age-cards-grid">
          {AGE_CARDS.map((c) => (
            <div key={c.key} className={`age-card ${c.accent === "lavender" ? "age-card-lavender" : ""}`}>
              <div className={`age-card-photo-frame ${c.accent === "sage" ? "age-card-photo-frame-sage" : "age-card-photo-frame-lavender"}`}>
                <img src={c.photo} alt={c.title} loading="lazy" />
              </div>
              <div className="age-card-body">
                {c.badge && <span className="age-card-badge">{c.badge}</span>}
                <h3 className="age-card-title">{c.title}</h3>
                <span className="age-card-subtitle">{c.subtitle}</span>
                <div className="age-card-desc">{c.desc}</div>
                <Link to={c.href} className="age-card-btn" onClick={() => ymGoal(c.goal)}>
                  {c.btnLabel} <Icon name="ArrowRight" size={15} />
                </Link>
              </div>
              <div className={`age-card-stripe age-card-stripe-${c.accent === "sage" ? "sage" : "lavender"}`} />
            </div>
          ))}
        </div>

        <div className="services-grid services-grid-2">
          {EXTRA_SERVICES.map((s) => (
            <div key={s.title} className={`service-card ${s.cardClass}`}>
              <div className="service-card-body">
                <div className="service-top-icon">
                  <Icon name={s.topIcon} size={24} />
                </div>
                <div className="service-icon-wrap">
                  <img src={s.medallion} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                </div>
                <h3 className="service-title">{s.title}</h3>
                {s.age && <div className="service-age">{s.age}</div>}
                <p className="service-desc">{s.desc}</p>
                <button className="service-btn" onClick={() => { ymGoal(s.goal); onOpenModal(s.goal); }}>
                  {s.btnLabel} <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}