import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";
import { IMG_STARSHAYA_HERO } from "./constants";

// ── StarshayaHeroSection (БЛОК 2: Первый экран страницы /podgotovka-k-shkole/) ─
interface StarshayaHeroSectionProps {
  onOpenModal: (source?: string) => void;
}

export default function StarshayaHeroSection({ onOpenModal }: StarshayaHeroSectionProps) {
  return (
    <section className="hero-wrap-v2">
      <div className="hero-v2-bg">
        <img src={IMG_STARSHAYA_HERO} alt="Подготовка к школе в Керчи: занятие в старшей группе" />
        <div className="hero-v2-overlay" />
      </div>
      <div className="container hero-v2-content">
        <h1 className="hero-v2-h1">Подготовка к школе в Керчи — читаем, пишем, считаем к 1 классу</h1>
        <p className="hero-v2-sub">
          Мини-группы до 12 детей, занятия по возрасту, логопед и английский. Ваш ребёнок пойдёт в школу подготовленным и уверенным.
        </p>

        <div className="hero-v2-trust">
          <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('click_yandex_maps')}>
            <Icon name="Star" size={14} /> 4,9 на Яндекс Картах
          </a>
          <span><Icon name="ShieldCheck" size={14} /> Лицензия</span>
          <span><Icon name="MapPin" size={14} /> ул. Циолковского, 12</span>
        </div>

        <div className="hero-v2-deficit">
          <Icon name="Clock" size={16} />
          В старшей группе свободно 4 места
        </div>

        <div className="hero-v2-cta-row">
          <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_hero_cta'); onOpenModal('excursion'); }}>
            Записаться на пробное занятие
            <Icon name="ArrowRight" size={18} />
          </button>
          <a
            href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn-outline"
            onClick={() => ymGoal('click_messenger')}
          >
            <Icon name="MessageCircle" size={17} />
            Спросить в MAX
          </a>
        </div>
      </div>
    </section>
  );
}
