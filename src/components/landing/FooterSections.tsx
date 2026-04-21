import Icon from "@/components/ui/icon";
import { CHECKLIST } from "./constants";
import { Section } from "./InfoSections";

// ── FooterSections (блоки 10–12) ───────────────────────────────────────────
interface FooterSectionsProps {
  onOpenModal: () => void;
}

export default function FooterSections({ onOpenModal }: FooterSectionsProps) {
  return (
    <>
      {/* ── БЛОК 10: Лид-магнит ── */}
      <Section className="bg-teal">
        <div className="container container-narrow">
          <div className="leadmag-wrap">
            <div className="leadmag-emoji">🎁</div>
            <h2 className="leadmag-title">Получите бесплатно</h2>
            <p className="leadmag-sub">Подборка материалов для родителей — скачайте прямо сейчас</p>
            <ul className="leadmag-list">
              {CHECKLIST.map((item, i) => (
                <li key={i}><Icon name="CheckCircle" size={16} />{item}</li>
              ))}
            </ul>
            <button className="cta-btn cta-btn-white" onClick={onOpenModal}>
              Получить подборку бесплатно
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 11: Последний призыв ── */}
      <Section className="bg-dark">
        <div className="container container-narrow">
          <div className="final-cta">
            <div className="final-emoji">🌊</div>
            <h2 className="final-title">Свободных мест<br />осталось <span className="clr-teal">3</span></h2>
            <p className="final-sub">
              Не откладывайте — запишитесь на бесплатную экскурсию
              и убедитесь сами, что это именно то место
            </p>
            <div className="final-actions">
              <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={onOpenModal}>
                Записаться на экскурсию
                <Icon name="ArrowRight" size={20} />
              </button>
              <a href="tel:+79780000000" className="cta-btn cta-btn-outline-light cta-btn-lg">
                <Icon name="Phone" size={18} />
                +7 (978) 000-00-00
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 12: Футер ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">🌊 Рыбка</div>
              <p>Частный детский сад в Керчи</p>
              <p>пр-т Победы, 15, Керчь, Республика Крым</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+79780000000" className="footer-link">
                <Icon name="Phone" size={15} /> +7 (978) 000-00-00
              </a>
              <a href="mailto:info@ribkadollli.ru" className="footer-link">
                <Icon name="Mail" size={15} /> info@ribkadollli.ru
              </a>
              <div className="footer-hours">
                <Icon name="Clock" size={15} /> Пн–Пт: 7:30–19:00
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 Детский сад «Рыбка»</span>
            <span>ИП Иванова А.В. · ОГРН 000000000000000</span>
          </div>
        </div>
      </footer>
    </>
  );
}
