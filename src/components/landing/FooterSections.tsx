import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHECKLIST } from "./constants";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";

const SEND_CHECKLIST_URL = "https://functions.poehali.dev/34e49ad9-ee73-40be-bb8a-e56d71588fb0";

// ── FooterSections (блоки 10–12) ───────────────────────────────────────────
interface FooterSectionsProps {
  onOpenModal: () => void;
}

export default function FooterSections({ onOpenModal }: FooterSectionsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;
    setLoading(true);
    await fetch(SEND_CHECKLIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    ymGoal('form_checklist_submit');
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
                <label className="privacy-checkbox-label privacy-checkbox-label--light">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                  <span>Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a></span>
                </label>
                <button type="submit" className="cta-btn cta-btn-white" disabled={loading || !agreed}>
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

      {/* ── БЛОК 10б: Карта ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Как нас найти</span>
            <h2 className="section-h2">Мы в Керчи,<br />ул. Циолковского, 12</h2>
          </div>
          <div className="map-wrap">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=120578628138"
              width="100%"
              height="420"
              frameBorder="0"
              allowFullScreen
              title="Детский сад Рыбка Долли на карте"
              style={{ borderRadius: "16px", display: "block" }}
            />
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
              <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_final_cta'); onOpenModal(); }}>
                Записаться на экскурсию
                <Icon name="ArrowRight" size={20} />
              </button>
              <a href="tel:+79881521698" className="cta-btn cta-btn-outline-light cta-btn-lg" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={18} />
                +7 (988) 152-16-98
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 12: Безопасность ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Безопасность</span>
            <h2 className="section-h2">Мы заботимся<br />о безопасности детей</h2>
          </div>
          <div style={{ maxWidth: 400, margin: "0 auto", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
            <video
              src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/4c6ede15-7344-4e48-9347-b67c23097995.mp4"
              controls
              width="100%"
              style={{ display: "block" }}
            />
          </div>
          <div style={{ maxWidth: 800, margin: "32px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              { icon: "Camera", text: "Видеонаблюдение" },
              { icon: "Flame", text: "Пожарная безопасность" },
              { icon: "KeyRound", text: "Электронный замок на входной двери" },
              { icon: "BriefcaseMedical", text: "Аптечка первой помощи — воспитатели имеют сертификат" },
              { icon: "Lightbulb", text: "Бактерицидные лампы закрытого типа в группах" },
              { icon: "Trees", text: "Своя закрытая площадка для прогулок" },
              { icon: "DoorOpen", text: "3 пожарных выхода" },
              { icon: "Thermometer", text: "Индивидуальное отопление" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#f8fafc", borderRadius: 12, padding: "16px 18px" }}>
                <Icon name={item.icon} size={20} style={{ color: "var(--clr-teal, #2bbfbf)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 15, color: "#333", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── БЛОК 13: Футер ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">🌊 Рыбка Долли</div>
              <p>Частный детский сад в Керчи</p>
              <p>г. Керчь, ул. Циолковского, 12</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+79881521698" className="footer-link" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={15} /> +7 (988) 152-16-98 (МТС)
              </a>
              <a href="tel:+79787120353" className="footer-link" onClick={() => ymGoal('click_phone')}>
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
            <span>ИП Савченко И.И. · ОГРН 318911200074795</span>
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline", fontSize: 12 }}>Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </>
  );
}