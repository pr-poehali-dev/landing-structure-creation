import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import WaveDivider from "./WaveDivider";
import { ymGoal } from "@/lib/ym";
import { STARSHAYA_REVIEWS, STARSHAYA_FAQ, PRICE_PLANS_STARSHAYA } from "./constants";

// ── StarshayaPricesReviewsFaq (БЛОКИ 11–13: стоимость, отзывы, FAQ) ────────
interface StarshayaPricesReviewsFaqProps {
  onOpenModal: (source?: string) => void;
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
}

export default function StarshayaPricesReviewsFaq({ onOpenModal, openFaq, setOpenFaq }: StarshayaPricesReviewsFaqProps) {
  return (
    <>
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
                <button className="cta-btn cta-btn-price" onClick={() => { ymGoal(`click_plan_${p.id}`); onOpenModal('calculator'); }}>
                  Выбрать «{p.name}» <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="prices-note prices-note-light">
            Английский — абонемент 4 000 ₽/мес. Нестандартный график — уточните по телефону или в MAX.
          </p>
          <p className="prices-footnote">
            Полные условия — в договоре, выдаём на ознакомление до подписания.{" "}
            <a href="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/790410e3-ec68-4029-8af0-8b5ca84f4d14.pdf" target="_blank" rel="noopener noreferrer" className="prices-oferta-link">
              Читать договор-оферту
            </a>
          </p>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="cta-btn cta-btn-outline-light" onClick={() => { ymGoal('click_prices_excursion'); onOpenModal('excursion'); }}>
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
          <div className="reviews-grid reviews-grid-4">
            {STARSHAYA_REVIEWS.map((r, i) => (
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
    </>
  );
}
