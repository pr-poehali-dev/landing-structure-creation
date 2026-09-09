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
  IMG_YASLI_HERO,
  IMG_YASLI_PEDAGOG,
  IMG_KOMANDA_GRUPPOVOE,
  IMG_POSTER_YASLI_DEN,
  VIDEO_YASLI_DEN,
  IMG_MARINA_ANATOLIEVNA,
  YASLI_FEARS,
  YASLI_ADAPTATION_STEPS,
  YASLI_SCHEDULE,
  YASLI_DAY_STRIP,
  YASLI_REVIEWS,
  YASLI_FAQ,
  YASLI_CHECKLIST,
  PRICE_PLANS,
  TEAM,
} from "@/components/landing/constants";

const irinaVasilievna = TEAM.find((t) => t.name === "Ирина Васильевна")!;

export default function Yasli() {
  useSeo(
    "Ясли в Керчи с 1,5 лет — ДДЦ «Рыбка Долли» | Мягкая адаптация, 4-разовое питание, мини-группы",
    "Частные ясли в Керчи на Циолковского, 12. Группы до 12 детей, фотоотчёты каждый день, своя площадка. Свободно 2 места. Запишитесь на бесплатную экскурсию!"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("excursion");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (source?: string) => {
    setModalSource(source || "excursion");
    setModalOpen(true);
  };

  return (
    <div className="ld theme-yasli">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
      <SiteHeader onOpenModal={openModal} ctaLabel="Записаться на экскурсию" />

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
          <img src={IMG_YASLI_HERO} alt="Ясли в Керчи: дети ясельной группы на празднике" />
          <div className="hero-v2-overlay" />
        </div>
        <div className="container hero-v2-content">
          <h1 className="hero-v2-h1">Ясли в Керчи с 1,5 лет — мягкая адаптация без слёз</h1>
          <p className="hero-v2-sub">
            Мини-группы до 12 детей, своя закрытая площадка, 4-разовое питание и фотоотчёты каждый день.
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
            В ясельной группе свободно 2 места
          </div>

          <div className="hero-v2-cta-row">
            <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_hero_cta'); openModal('excursion'); }}>
              Записаться на бесплатную экскурсию
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

      {/* БЛОК 3: Видео "Один день в яслях" */}
      <Section className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Один день в яслях</span>
            <h2 className="section-h2">Посмотрите, как проходит<br />день в наших яслях</h2>
          </div>
          <div className="tv-frame" style={{ margin: "0 auto" }}>
            <video
              src={VIDEO_YASLI_DEN}
              poster={IMG_POSTER_YASLI_DEN}
              preload="none"
              controls
              playsInline
              width="100%"
              style={{ display: "block" }}
            />
          </div>
          <p className="schedule-note">
            В кадре: приём и зарядка, занятие, прогулка, обед, тихий час, полдник, игры и прогулка домой.
          </p>
        </div>
      </Section>

      {/* БЛОК 4: Страхи мамы и наши ответы */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отвечаем честно</span>
            <h2 className="section-h2">Страхи мамы<br />и наши ответы</h2>
          </div>
          <div className="facts-grid">
            {YASLI_FEARS.map((f) => (
              <div key={f.q} className="fear-card">
                <div className="fear-icon"><Icon name={f.icon} size={24} /></div>
                <h3 className="fear-q">{f.q}</h3>
                <p className="fear-a">{f.a}</p>
                {f.fact && (
                  <div className="feat-result" style={{ marginTop: "auto" }}>
                    <Icon name="TrendingUp" size={14} />
                    {f.fact}
                  </div>
                )}
                {f.anchor && (
                  <a href={f.anchor} className="fear-anchor-link">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* БЛОК 5: Программа адаптации по шагам */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Программа адаптации</span>
            <h2 className="section-h2">Идём по шагам,<br />в темпе ребёнка</h2>
          </div>
          <div className="adaptation-layout">
            <div className="adaptation-steps">
              {YASLI_ADAPTATION_STEPS.map((s) => (
                <div key={s.step} className="adaptation-step">
                  <div className="adaptation-step-badge">{s.step}</div>
                  <div>
                    <h3 className="adaptation-step-title">{s.title} <span>· {s.time}</span></h3>
                    <p className="adaptation-step-text">{s.text}</p>
                  </div>
                </div>
              ))}
              <p className="schedule-note" style={{ textAlign: "left" }}>
                Темп подбираем индивидуально вместе с Ириной Васильевной.
              </p>
            </div>
            <figure className="adaptation-photo">
              <img src={IMG_YASLI_PEDAGOG} alt="Ясли в Керчи: Ирина Васильевна рядом с первого дня" />
              <figcaption>Ирина Васильевна рядом с первого дня</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* БЛОК 6: Распорядок дня с фото */}
      <Section id="schedule" className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">Каждая минута<br />наполнена смыслом</h2>
          </div>
          <div className="schedule-timeline">
            {YASLI_SCHEDULE.map((s) => (
              <div key={s.time} className={`schedule-slot ${s.img ? "schedule-slot-photo" : "schedule-slot-text"}`}>
                {s.img && <img src={s.img} alt={s.alt} loading="lazy" />}
                <div className="schedule-slot-info">
                  <span className="schedule-slot-time">{s.time}</span>
                  <strong>{s.title}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="yasli-day-strip">
            <p className="yasli-day-strip-title">Ясельный день в кадрах</p>
            <div className="yasli-day-strip-row">
              {YASLI_DAY_STRIP.map((p) => (
                <div key={p.src} className="yasli-day-strip-item">
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* БЛОК 7: Питание */}
      <FoodSection hideAgeSpecificNorms />

      {/* БЛОК 8: Безопасность */}
      <SafetySection id="safety" />

      {/* БЛОК 9: Команда ясельной группы */}
      <Section id="team" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Команда ясельной группы</span>
            <h2 className="section-h2">Люди, которым<br />доверяют малышей</h2>
          </div>
          <figure className="komanda-group-photo">
            <img src={IMG_KOMANDA_GRUPPOVOE} alt="Ясли в Керчи: команда центра «Рыбка Долли»" />
            <figcaption>Ирина Васильевна, Светлана Владимировна, Ирина Павловна, Наталья Петровна — команда центра</figcaption>
          </figure>
          <div className="team-grid team-grid-2">
            <div className="team-card">
              <div className="team-photo">
                <img src={irinaVasilievna.img} alt={irinaVasilievna.name} />
              </div>
              <h3 className="team-name">{irinaVasilievna.name}</h3>
              <div className="team-role">{irinaVasilievna.role}</div>
              <div className="team-exp">{irinaVasilievna.exp}</div>
              <div className="team-credo">{irinaVasilievna.credo}</div>
            </div>
            <div className="team-card">
              <div className="team-photo">
                <img src={IMG_MARINA_ANATOLIEVNA} alt="Марина Анатольевна — нянечка ясельной группы" />
              </div>
              <h3 className="team-name">Марина Анатольевна</h3>
              <div className="team-role">Нянечка — «сердце группы»</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_team_excursion'); openModal('excursion'); }}>
              Познакомиться лично — на экскурсии
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* БЛОК 10: Стоимость */}
      <WaveDivider bg="var(--cream)" color="#1b3a5c" />
      <Section id="prices" className="bg-dark">
        <div className="container">
          <div className="section-header section-header-light">
            <span className="section-tag section-tag-light">Стоимость</span>
            <h2 className="section-h2 clr-white">Честная стоимость:<br />два формата на выбор</h2>
          </div>
          <div className="plans-grid">
            {PRICE_PLANS.map((p) => (
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
            Английский для малышей — абонемент 4 000 ₽/мес. Нестандартный график — уточните по телефону или в MAX.
          </p>
          <p className="prices-footnote">
            Полные условия — в договоре, выдаём на ознакомление до подписания.{" "}
            <a href="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/790410e3-ec68-4029-8af0-8b5ca84f4d14.pdf" target="_blank" rel="noopener noreferrer" className="prices-oferta-link">
              Читать договор-оферту
            </a>
          </p>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="cta-btn cta-btn-outline-light" onClick={() => { ymGoal('click_prices_excursion'); openModal('excursion'); }}>
              Записаться на экскурсию
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </Section>
      <WaveDivider bg="var(--dark-bg)" color="#fff" flip />

      {/* БЛОК 11: Отзывы родителей яслей */}
      <Section id="reviews" className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отзывы родителей</span>
            <h2 className="section-h2">Что говорят<br />мамы малышей</h2>
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="yandex-badge" onClick={() => ymGoal('click_yandex_maps')}>
              <img src="https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v56/icons/favicon/favicon.svg" alt="Яндекс" width={18} height={18} />
              <span className="yandex-badge-stars">★★★★★</span>
              <span className="yandex-badge-rating">4,9</span>
              <span className="yandex-badge-label">на Яндекс Картах</span>
            </a>
          </div>
          <div className="reviews-grid">
            {YASLI_REVIEWS.map((r, i) => (
              <div key={i} className="review-card review-card-noavatar">
                <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                <div className="review-meta">
                  <strong>{r.name}</strong>
                  <span>{r.date}</span>
                </div>
                <p className="review-text">«{r.text}»</p>
                <div className="review-source">
                  <Icon name="MapPin" size={13} />
                  Отзыв с Яндекс Карт
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

      {/* БЛОК 12: FAQ яслей */}
      <Section id="faq" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Частые вопросы</span>
            <h2 className="section-h2">Отвечаем честно<br />на всё</h2>
          </div>
          <div className="faq-list">
            {YASLI_FAQ.map((f, i) => (
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

      {/* БЛОК 13–15: Лид-магнит, финальный CTA, футер */}
      <FooterSections
        onOpenModal={openModal}
        checklist={YASLI_CHECKLIST}
        leadmagTitle="Готовитесь к яслям?"
        leadmagSubtitle="Заберите чек-лист адаптации бесплатно"
        deficitNode={<h2 className="final-title">В ясельной группе<br />свободно <span className="clr-teal">2</span> места</h2>}
      />

    </div>
  );
}