import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHECKLIST } from "./constants";
import { Section } from "./InfoSections";

const SEND_CHECKLIST_URL = "https://functions.poehali.dev/34e49ad9-ee73-40be-bb8a-e56d71588fb0";

// ── FooterSections (блоки 10–12) ───────────────────────────────────────────
interface FooterSectionsProps {
  onOpenModal: () => void;
}

export default function FooterSections({ onOpenModal }: FooterSectionsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    await fetch(SEND_CHECKLIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <>
      {/* ── БЛОК 10: Лид-магнит ── */}
      <Section className="bg-teal">
        <div className="container container-narrow">
          <div className="leadmag-wrap">
            <div className="leadmag-emoji">🎁</div>
            <h2 className="leadmag-title">Получите бесплатно</h2>
            <p className="leadmag-sub">Три полезных чек-листа для родителей — пришлём на почту</p>
            <ul className="leadmag-list">
              {CHECKLIST.map((item, i) => (
                <li key={i}><Icon name="CheckCircle" size={16} />{item}</li>
              ))}
            </ul>
            {!done ? (
              <form onSubmit={submitChecklist} className="leadmag-form">
                <input
                  className="leadmag-input"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  className="leadmag-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="cta-btn cta-btn-white" disabled={loading}>
                  {loading ? 'Отправляем...' : 'Получить чек-листы бесплатно'}
                  {!loading && <Icon name="ArrowRight" size={18} />}
                </button>
                <p className="leadmag-privacy">
                  <Icon name="Lock" size={11} /> Отправляя форму, вы соглашаетесь получать материалы блога blogribkadolli.ru
                </p>
              </form>
            ) : (
              <div className="leadmag-success">
                <Icon name="CheckCircle" size={32} />
                <p>Отлично, <strong>{name}</strong>! Чек-листы уже летят к вам на почту.</p>
              </div>
            )}
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
              и убедитесь сами, что это именно тот садик, который вам нужен.
            </p>
            <div className="final-actions">
              <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={onOpenModal}>
                Записаться на экскурсию
                <Icon name="ArrowRight" size={20} />
              </button>
              <a href="tel:+79881521698" className="cta-btn cta-btn-outline-light cta-btn-lg">
                <Icon name="Phone" size={18} />
                +7 (988) 152-16-98
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
              <p>г. Керчь, ул. Циолковского, 12</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+79881521698" className="footer-link">
                <Icon name="Phone" size={15} /> +7 (988) 152-16-98 (МТС)
              </a>
              <a href="tel:+79787120353" className="footer-link">
                <Icon name="Phone" size={15} /> +7 (978) 712-03-53 (Волна)
              </a>
              <a href="https://ribkadollli.ru" target="_blank" rel="noopener noreferrer" className="footer-link">
                <Icon name="Globe" size={15} /> ribkadollli.ru
              </a>
              <a href="https://blogribkadolli.ru" target="_blank" rel="noopener noreferrer" className="footer-link">
                <Icon name="BookOpen" size={15} /> blogribkadolli.ru
              </a>
              <div className="footer-hours">
                <Icon name="Clock" size={15} /> Пн–Пт: 8:00–18:00
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