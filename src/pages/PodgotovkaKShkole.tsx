import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/landing/SiteHeader";
import { Modal } from "@/components/landing/HeroSection";
import { Section } from "@/components/landing/InfoSections";
import FoodSection from "@/components/landing/FoodSection";
import SafetySection from "@/components/landing/SafetySection";
import FooterSections from "@/components/landing/FooterSections";
import WaveDivider from "@/components/landing/WaveDivider";
import { ymGoal } from "@/lib/ym";
import { useSeo } from "@/lib/useSeo";
import {
  IMG_STARSHAYA_HERO,
  VIDEO_STARSHAYA_DEN,
  IMG_POSTER_STARSHAYA_DEN,
  IMG_STARSHAYA_EMOTIONS,
  IMG_KOMANDA_GRUPPOVOE,
  IMG_SVETLANA_VLADIMIROVNA,
  IMG_MARINA_ANATOLIEVNA,
  IMG_NATALIA_PETROVNA,
  IMG_VIKTORIA_ANATOLIEVNA,
  VIDEO_STARSHAYA_FOOD,
  IMG_POSTER_STARSHAYA_FOOD,
  STARSHAYA_SKILLS,
  STARSHAYA_SCHEDULE_PHOTOS,
  STARSHAYA_SCHEDULE_TEXT_SLOTS,
  STARSHAYA_REVIEWS,
  STARSHAYA_FAQ,
  STARSHAYA_CHECKLIST,
  PRICE_PLANS_STARSHAYA,
} from "@/components/landing/constants";

export default function PodgotovkaKShkole() {
  useSeo(
    "Подготовка к школе в Керчи — ДДЦ «Рыбка Долли» | Чтение, письмо, математика, английский",
    "Старшая группа и подготовка к школе в Керчи на Циолковского, 12. Мини-группы до 12 детей, занятия по возрасту, логопед и английский. Свободно 4 места. Запишитесь на пробное занятие!"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("excursion");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (source?: string) => {
    setModalSource(source || "excursion");
    setModalOpen(true);
  };

  return (
    <div className="ld theme-starshaya">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
      <SiteHeader onOpenModal={openModal} ctaLabel="Записаться на пробное занятие" />

      <div className="back-to-home-bar">
        <div className="container">
          <Link to="/" className="back-to-home-link">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
        </div>
      </div>

      {/* БЛОК 2: Первый экран */}
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
            <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_hero_cta'); openModal('excursion'); }}>
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

      {/* БЛОК 3: Видео "Один день в старшей группе" */}
      <Section className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Один день в старшей группе</span>
            <h2 className="section-h2">Посмотрите, как проходит<br />день в старшей группе</h2>
          </div>
          <div className="tv-frame" style={{ margin: "0 auto" }}>
            <video
              src={VIDEO_STARSHAYA_DEN}
              poster={IMG_POSTER_STARSHAYA_DEN}
              preload="none"
              controls
              playsInline
              width="100%"
              style={{ display: "block" }}
            />
          </div>
          <p className="schedule-note">
            В кадре: приём и зарядка, занятия по возрасту, прогулка, обед, тихий час, полдник, игры и прогулка домой.
          </p>
        </div>
      </Section>

      {/* БЛОК 4: Что ребёнок освоит к школе */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Готовность к школе</span>
            <h2 className="section-h2">Что ребёнок<br />освоит к школе</h2>
          </div>
          <div className="adaptation-layout">
            <div className="facts-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {STARSHAYA_SKILLS.map((s) => (
                <div key={s.title} className="fear-card">
                  <div className="fear-icon"><Icon name={s.icon} size={24} /></div>
                  <h3 className="fear-q">{s.title}</h3>
                  <p className="fear-a">{s.text}</p>
                  {s.anchor && (
                    <a href={s.anchor} className="fear-anchor-link">
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <figure className="adaptation-photo">
              <img src={IMG_STARSHAYA_EMOTIONS} alt="Подготовка к школе в Керчи: игра «Какие эмоции во мне сейчас»" />
              <figcaption>Игра «Какие эмоции во мне сейчас»: дети учатся распознавать и называть свои чувства</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* БЛОК 5: Распорядок дня */}
      <Section id="schedule" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">День в старшей<br />группе</h2>
            <p className="food-subtitle">Распорядок общий с яслями, занятия — по возрасту.</p>
          </div>
          <div className="schedule-text-slots">
            {STARSHAYA_SCHEDULE_TEXT_SLOTS.map((s) => (
              <div key={s.time} className="schedule-text-slot">
                <span className="schedule-photo-card-time">{s.time}</span>
                <strong>{s.title}</strong>
              </div>
            ))}
          </div>
          <div className="schedule-photo-grid">
            {STARSHAYA_SCHEDULE_PHOTOS.map((s) => (
              <div key={s.time} className="schedule-photo-card">
                <img src={s.img} alt={s.alt} loading="lazy" />
                <div className="schedule-photo-card-info">
                  <span className="schedule-photo-card-time">{s.time}</span>
                  <strong>{s.title}</strong>
                  {s.caption && <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>{s.caption}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* БЛОК 6: Питание */}
      <FoodSection
        videoSrc={VIDEO_STARSHAYA_FOOD}
        videoPoster={IMG_POSTER_STARSHAYA_FOOD}
        videoCaption="Завтрак, обед и полдник в старшей группе"
      />

      {/* БЛОК 7: Безопасность */}
      <SafetySection id="safety" />

      {/* БЛОК 8: Команда старшей группы */}
      <Section id="team" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Команда старшей группы</span>
            <h2 className="section-h2">Люди, которым<br />доверяют подготовку к школе</h2>
          </div>
          <figure className="komanda-group-photo">
            <img src={IMG_KOMANDA_GRUPPOVOE} alt="Подготовка к школе в Керчи: команда центра «Рыбка Долли»" />
            <figcaption>Ирина Васильевна, Светлана Владимировна, Ирина Павловна, Наталья Петровна — команда центра</figcaption>
          </figure>
          <div className="team-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: 640, margin: "40px auto 0" }}>
            <div className="team-card">
              <div className="team-photo">
                <img src={IMG_SVETLANA_VLADIMIROVNA} alt="Светлана Владимировна — педагог старшей группы" />
              </div>
              <h3 className="team-name">Светлана Владимировна</h3>
              <div className="team-role">Педагог старшей группы</div>
              <div className="team-exp">Работает в центре 1 год</div>
              <div className="team-credo">«Никогда не останавливаться на достигнутом, делиться не задумываясь, учить — обучаясь самой»</div>
            </div>
            <div className="team-card">
              <div className="team-photo">
                <img src={IMG_MARINA_ANATOLIEVNA} alt="Марина Анатольевна — нянечка старшей группы" />
              </div>
              <h3 className="team-name">Марина Анатольевна</h3>
              <div className="team-role">Нянечка обеих групп</div>
              <div className="team-credo">Забота и тепло каждый день</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_team_excursion'); openModal('excursion'); }}>
              Познакомиться лично — на пробном занятии
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* БЛОК 9: Английский язык */}
      <Section id="english" className="bg-white">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Английский язык</span>
            <h2 className="section-h2">Английский — играя<br />и говоря, без зубрёжки</h2>
          </div>
          <div className="adaptation-layout" style={{ gridTemplateColumns: "260px 1fr" }}>
            <figure className="adaptation-photo">
              <img src={IMG_NATALIA_PETROVNA} alt="Наталья Петровна — педагог английского языка" />
              <figcaption>Наталья Петровна — педагог английского языка</figcaption>
            </figure>
            <div>
              <p className="fear-a" style={{ fontSize: 15, marginBottom: 16 }}>
                Абонемент — 4 000 ₽/мес.
              </p>
              <ul className="check-list" style={{ marginBottom: 16 }}>
                <li><Icon name="Check" size={16} /><span>Полное погружение в языковую среду</span></li>
                <li><Icon name="Check" size={16} /><span>Дети говорят и договариваются на английском</span></li>
                <li><Icon name="Check" size={16} /><span>Слова запоминаются в контексте, а не списком</span></li>
              </ul>
              <div className="feat-result" style={{ marginBottom: 20 }}>
                <Icon name="TrendingUp" size={14} />
                Ребёнок не боится говорить и понимает речь на слух
              </div>
              <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_english_cta'); openModal('english'); }}>
                Записаться на английский
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* БЛОК 10: Логопед */}
      <Section id="logoped" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Логопед</span>
            <h2 className="section-h2">Чистая речь —<br />уверенный старт в школе</h2>
          </div>
          <div className="adaptation-layout" style={{ gridTemplateColumns: "260px 1fr" }}>
            <figure className="adaptation-photo">
              <img src={IMG_VIKTORIA_ANATOLIEVNA} alt="Виктория Анатольевна — логопед" />
              <figcaption>Виктория Анатольевна, логопед</figcaption>
            </figure>
            <div>
              <p className="fear-a" style={{ fontSize: 15, marginBottom: 16 }}>
                Коррекция звукопроизношения, развитие речи, подготовка к школе.
              </p>
              <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_logoped_cta'); openModal('logoped'); }}>
                Записаться на консультацию
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* БЛОК 11: Стоимость */}
      <WaveDivider bg="var(--cream)" color="#1b3a5c" />
      <Section id="prices" className="bg-dark">
        <div className="container">
          <div className="section-header section-header-light">
            <span className="section-tag section-tag-light">Стоимость</span>
            <h2 className="section-h2 clr-white">Честная стоимость:<br />три формата на выбор</h2>
          </div>
          <div className="plans-grid">
            {PRICE_PLANS_STARSHAYA.map((p) => (
              <div key={p.id} className={`plan-card ${p.badge ? "plan-card-accent" : ""}`}>
                {p.badge && <div className="plan-badge">{p.badge}</div>}
                <h3 className="plan-name">{p.name}</h3>
                <div className="plan-price">
                  {p.price} <span>{p.unit}</span>
                </div>
                <ul className="plan-features">
                  {p.features.map((f, i) => (
                    <li key={i} className={f.included ? "plan-feature-yes" : "plan-feature-no"}>
                      <Icon name={f.included ? "Check" : "X"} size={16} />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button className="cta-btn cta-btn-price" onClick={() => { ymGoal(`click_plan_${p.id}`); openModal('calculator'); }}>
                  Выбрать «{p.name}» <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="prices-note prices-note-light">
            Английский — абонемент 4 000 ₽/мес. Нестандартный график — уточните по телефону или в MAX.
          </p>
          <p className="prices-footnote">Полные условия — в договоре, выдаём на ознакомление до подписания.</p>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="cta-btn cta-btn-outline-light" onClick={() => { ymGoal('click_prices_excursion'); openModal('excursion'); }}>
              Записаться на пробное занятие
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </Section>
      <WaveDivider bg="var(--dark-bg)" color="#fff" flip />

      {/* БЛОК 12: Отзывы родителей */}
      <Section id="reviews" className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отзывы родителей</span>
            <h2 className="section-h2">Что говорят<br />родители старшей группы</h2>
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="yandex-badge" onClick={() => ymGoal('click_yandex_maps')}>
              <img src="https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v56/icons/favicon/favicon.svg" alt="Яндекс" width={18} height={18} />
              <span className="yandex-badge-stars">★★★★★</span>
              <span className="yandex-badge-rating">4,9</span>
              <span className="yandex-badge-label">на Яндекс Картах</span>
            </a>
          </div>
          <div className="reviews-grid">
            {STARSHAYA_REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                <p className="review-text">«{r.text}»</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-cta">
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-outline" onClick={() => ymGoal('click_yandex_maps')}>
              Все отзывы на Яндекс Картах
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>
      </Section>

      {/* БЛОК 13: FAQ */}
      <Section id="faq" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Частые вопросы</span>
            <h2 className="section-h2">Отвечаем честно<br />на всё</h2>
          </div>
          <div className="faq-list">
            {STARSHAYA_FAQ.map((f, i) => (
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

      {/* БЛОК 14–16: Лид-магнит, финальный CTA, футер */}
      <FooterSections
        onOpenModal={openModal}
        checklist={STARSHAYA_CHECKLIST}
        leadmagTitle="Боитесь, что чтение в школе пойдёт со слезами?"
        leadmagSubtitle="Заберите 5 упражнений нашего педагога бесплатно"
        deficitNode={<h2 className="final-title">В старшей группе<br />свободно <span className="clr-teal">4</span> места</h2>}
      />


    </div>
  );
}