import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/landing/SiteHeader";
import { Modal } from "@/components/landing/HeroSection";
import { Section } from "@/components/landing/InfoSections";
import FooterSections from "@/components/landing/FooterSections";
import { ymGoal } from "@/lib/ym";
import { useSeo } from "@/lib/useSeo";
import {
  IMG_PODGOTOVKA_2X,
  IMG_PODGOTOVKA_2X_MAIN,
  PODGOTOVKA_2X_POINTS,
  PODGOTOVKA_2X_FAQ,
  PODGOTOVKA_2X_PRICE,
} from "@/components/landing/constants";

export default function PodgotovkaKShkole2x() {
  useSeo(
    "Подготовка к школе 2 раза в неделю в Керчи — ДДЦ «Рыбка Долли» | Без полного дня в саду",
    "Занятия подготовки к школе для детей 5-7 лет в Керчи: чтение, письмо, математика. Только уроки 2 раза в неделю, без пребывания в детском саду. Запишитесь на пробное занятие!"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("podgotovka2x");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (source?: string) => {
    setModalSource(source || "podgotovka2x");
    setModalOpen(true);
  };

  return (
    <div className="ld theme-podgotovka2x">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} type="lessons2x" />
      <SiteHeader onOpenModal={openModal} ctaLabel="Записаться на пробное занятие" />

      <div className="back-to-home-bar">
        <div className="container">
          <Link to="/" className="back-to-home-link">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
        </div>
      </div>

      {/* Первый экран */}
      <section className="hero-wrap-v2">
        <div className="hero-v2-bg">
          <img src={IMG_PODGOTOVKA_2X} alt="Подготовка к школе в Керчи: занятия 2 раза в неделю" />
          <div className="hero-v2-overlay" />
        </div>
        <div className="container hero-v2-content">
          <h1 className="hero-v2-h1">Подготовка к школе — занятия 2 раза в неделю</h1>
          <p className="hero-v2-sub">
            Чтение, письмо, математика для детей 5-7 лет. Без полного пребывания в саду — только уроки,
            как кружок или курсы, 60 минут дважды в неделю.
          </p>

          <div className="hero-v2-trust">
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('click_yandex_maps')}>
              <Icon name="Star" size={14} /> 4,9 на Яндекс Картах
            </a>
            <span><Icon name="ShieldCheck" size={14} /> Лицензия</span>
            <span><Icon name="MapPin" size={14} /> ул. Циолковского, 12</span>
          </div>

          <p className="hero-v2-price-teaser">
            Абонемент {PODGOTOVKA_2X_PRICE.amount} {PODGOTOVKA_2X_PRICE.unit} — 2 занятия в неделю
          </p>

          <div className="hero-v2-cta-row">
            <button className="cta-btn cta-btn-blue cta-btn-lg" onClick={() => { ymGoal('click_hero_cta_podgotovka2x'); openModal('podgotovka2x'); }}>
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

      {/* Пояснение формата — без полного дня */}
      <Section className="bg-white">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Формат занятий</span>
            <h2 className="age-section-h2">Только уроки — без детского сада</h2>
            <p className="age-lead">
              Это не группа полного дня: ребёнок приходит к нам исключительно на занятие — без завтрака, обеда,
              тихого часа и прогулок. Позанимались 60 минут — и домой. Подходит, если малыш уже ходит
              в детский сад или школу и ему нужна именно точечная подготовка.
            </p>
          </div>

          <div className="age-points-grid">
            {PODGOTOVKA_2X_POINTS.map((p) => (
              <div key={p.text} className="age-point-card age-point-card-milk">
                <div className="age-point-icon"><Icon name={p.icon} size={20} /></div>
                <p className="age-point-text">{p.text}</p>
              </div>
            ))}
          </div>

          <figure className="age-photo-wrap">
            <img src={IMG_PODGOTOVKA_2X_MAIN} alt="Подготовка к школе: занятие с педагогом" />
          </figure>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-blue cta-btn-lg" onClick={() => { ymGoal('click_podgotovka2x_diagnostics'); openModal('podgotovka2x'); }}>
              Записаться на пробное занятие
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* Стоимость */}
      <Section id="prices" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Стоимость</span>
            <h2 className="age-section-h2">Один абонемент — без скрытых доплат</h2>
          </div>
          <div className="age-extra-block" style={{ justifyContent: "center", maxWidth: 480, margin: "32px auto 0", borderColor: "#dbeafe" }}>
            <div className="age-extra-block-icon" style={{ background: "#2563eb" }}><Icon name="Wallet" size={20} /></div>
            <p className="age-extra-block-text">
              <strong style={{ color: "#1d4ed8" }}>{PODGOTOVKA_2X_PRICE.amount} {PODGOTOVKA_2X_PRICE.unit}</strong> — {PODGOTOVKA_2X_PRICE.note.toLowerCase()}
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="cta-btn cta-btn-blue cta-btn-lg" onClick={() => { ymGoal('click_podgotovka2x_prices'); openModal('podgotovka2x'); }}>
              Записаться на пробное занятие
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* Сравнение с группой полного дня */}
      <Section className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Чем это отличается</span>
            <h2 className="age-section-h2">Занятия 2 раза в неделю или старшая группа?</h2>
          </div>
          <div className="age-points-grid">
            <div className="age-point-card">
              <div className="age-point-icon"><Icon name="Clock" size={20} /></div>
              <p className="age-point-text">
                <strong>Занятия 2 раза в неделю</strong> — только уроки, 60 минут, без пребывания в саду.
                Подходит, если ребёнок уже ходит в другой садик или школу.
              </p>
            </div>
            <div className="age-point-card">
              <div className="age-point-icon"><Icon name="Sun" size={20} /></div>
              <p className="age-point-text">
                <strong>Старшая группа</strong> — полный день в саду: питание, прогулки, сон и занятия.{" "}
                <Link to="/podgotovka-k-shkole/#5-7" className="fear-anchor-link" style={{ display: "inline-flex" }}>
                  Смотреть программу старшей группы
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Частые вопросы</span>
            <h2 className="section-h2">Отвечаем честно<br />на всё</h2>
          </div>
          <div className="faq-list">
            {PODGOTOVKA_2X_FAQ.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "faq-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} />
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FooterSections
        onOpenModal={openModal}
        leadmagTitle="Боитесь, что чтение в школе пойдёт со слезами?"
        leadmagSubtitle="Заберите 5 упражнений нашего педагога бесплатно"
        deficitNode={<h2 className="final-title">Записывайтесь на<br />пробное занятие</h2>}
      />
    </div>
  );
}