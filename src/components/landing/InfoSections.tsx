import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { FACTS, SCHEDULE, REVIEWS, PRICE_PLANS } from "./constants";
import FoodSection from "./FoodSection";
import SafetySection from "./SafetySection";
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

// ── InfoSections (блоки 4, 5, 6, 7, 8, 9) ──────────────────────────────────
interface InfoSectionsProps {
  onOpenModal: (source?: string) => void;
}

export default function InfoSections({ onOpenModal }: InfoSectionsProps) {
  return (
    <>
      {/* ── БЛОК 4: Почему родители выбирают нас ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Почему выбирают нас</span>
            <h2 className="section-h2">Всё, что важно<br />для вашего ребёнка</h2>
          </div>
          <div className="facts-grid">
            {FACTS.map((f) => (
              <div key={f.title} className="fact-card">
                <div className="fact-photo">
                  <img src={f.img} alt={f.title} loading="lazy" />
                </div>
                <h3 className="fact-title">{f.title}</h3>
                <p className="fact-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── БЛОК 5: Безопасность (кратко) ── */}
      <SafetySection />

      {/* ── БЛОК 6: Питание ── */}
      <FoodSection />

      {/* ── БЛОК 7: Распорядок дня (компактно) ── */}
      <Section id="schedule" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">Каждая минута<br />наполнена смыслом</h2>
          </div>
          <div className="schedule-list schedule-list-compact">
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
          <p className="schedule-note">В старшей группе — занятия по возрасту</p>
        </div>
      </Section>

      {/* ── БЛОК 8: Стоимость ── */}
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
                <button className="cta-btn cta-btn-price" onClick={() => { ymGoal(`click_plan_${p.id}`); onOpenModal('calculator'); }}>
                  Выбрать «{p.name}» <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="prices-note prices-note-light">
            Английский для дошкольников — абонемент 4 000 ₽/мес. Нестандартный график — уточните по телефону или в MAX.
          </p>
          <p className="prices-footnote">Полные условия — в договоре, выдаём на ознакомление до подписания.</p>
        </div>
      </Section>

      {/* ── БЛОК 9: Отзывы ── */}
      <Section id="reviews" className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отзывы родителей</span>
            <h2 className="section-h2">Что говорят<br />наши семьи</h2>
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="yandex-badge" onClick={() => ymGoal('click_yandex_maps')}>
              <img src="https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v56/icons/favicon/favicon.svg" alt="Яндекс" width={18} height={18} />
              <span className="yandex-badge-stars">★★★★★</span>
              <span className="yandex-badge-rating">4,9</span>
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
            <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-outline" onClick={() => ymGoal('click_yandex_maps')}>
              Все отзывы на Яндекс Картах
              <Icon name="ArrowRight" size={16} />
            </a>
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_reviews_cta'); onOpenModal('excursion'); }}>
              Хочу так же — записаться
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}