import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { ADVANTAGES, SCHEDULE, REVIEWS, PRICES, IMG_LUNCH } from "./constants";
import FeaturesSection from "./FeaturesSection";
import { ymGoal } from "@/lib/ym";

// ── Section (shared animated wrapper) ─────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null!);
  const visible = useInView(ref);
  return (
    <section id={id} ref={ref} className={`section-block ${visible ? "section-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// ── InfoSections (блоки 2–5) ───────────────────────────────────────────────
interface InfoSectionsProps {
  onOpenModal: () => void;
  timerMm: string;
  timerSs: string;
}

export default function InfoSections({ onOpenModal, timerMm, timerSs }: InfoSectionsProps) {
  return (
    <>
      {/* ── БЛОК 2: Преимущества ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Почему выбирают нас</span>
            <h2 className="section-h2">Всё, что важно<br />для вашего ребёнка</h2>
          </div>
          <div className="adv-grid">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="adv-card">
                <div className="adv-icon">
                  <Icon name={a.icon as "Shield"} size={28} />
                </div>
                <h3 className="adv-title">{a.title}</h3>
                <p className="adv-text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FeaturesSection onOpenModal={onOpenModal} />

      {/* ── БЛОК 3: День в садике ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">Каждая минута<br />наполнена смыслом</h2>
          </div>
          <div className="schedule-wrap">
            <div className="schedule-list">
              {SCHEDULE.map((s, i) => (
                <div key={i} className="schedule-item">
                  <div className="schedule-time">{s.time}</div>
                  <div className="schedule-dot" />
                  <div className="schedule-info">
                    <strong>{s.title}</strong>
                    {s.desc && <span>{s.desc}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="schedule-photo">
              <img src={IMG_LUNCH} alt="1 день в нашем садике" />
              <div className="schedule-photo-badge">
                <Icon name="Utensils" size={16} />
                4-разовое питание каждый день
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 4: Отзывы ── */}
      <Section id="reviews" className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отзывы родителей</span>
            <h2 className="section-h2">Что говорят<br />наши семьи</h2>
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="yandex-badge" onClick={() => ymGoal('click_yandex_maps')}>
              <img src="https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v56/icons/favicon/favicon.svg" alt="Яндекс" width={18} height={18} />
              <span className="yandex-badge-stars">★★★★★</span>
              <span className="yandex-badge-rating">4,8</span>
              <span className="yandex-badge-label">на Яндекс Картах</span>
            </a>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
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
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_reviews_cta'); onOpenModal(); }}>
              Хочу так же — записаться
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 5: Цены ── */}
      <Section id="prices" className="bg-dark">
        <div className="container">
          <div className="section-header section-header-light">
            <span className="section-tag section-tag-light">Прозрачные цены</span>
            <h2 className="section-h2 clr-white">Никаких скрытых<br />доплат</h2>
          </div>
          <div className="timer-banner">
            <Icon name="Clock" size={18} />
            <span>Акция «Раннее бронирование» заканчивается через: <strong>{timerMm}:{timerSs}</strong></span>
          </div>
          <div className="prices-grid">
            {PRICES.map((p) => (
              <div key={p.name} className={`price-card ${p.badge ? "price-card-popular" : ""}`}>
                {p.badge && <div className="price-badge">{p.badge}</div>}
                <h3 className="price-name">{p.name}</h3>
                <div className="price-hours">{p.hours}</div>
                <div className="price-amount">
                  {p.old && <span className="price-old">{p.old} ₽</span>}
                  <span className="price-current">{p.price}{" "}{p.unit}</span>
                </div>
                <button className="cta-btn cta-btn-price" onClick={() => { ymGoal(`click_price_${p.name}`); onOpenModal(); }}>
                  Выбрать <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="prices-note">В стоимость входит: питание, занятия, прогулки, мероприятия проводимые центром</p>
        </div>
      </Section>
    </>
  );
}