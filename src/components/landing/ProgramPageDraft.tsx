import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

interface ProgramPageDraftProps {
  h1: string;
  intro: string;
  cardTitle: string;
  cardItems: string[];
  cardResult?: string | null;
  formSource: string;
  formGoal: string;
}

export default function ProgramPageDraft({ h1, intro, cardTitle, cardItems, cardResult, formSource, formGoal }: ProgramPageDraftProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed) return;
    setLoading(true);
    await fetch(SEND_LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, age: "", source: formSource }),
    });
    ymGoal(formGoal);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="ld">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-header-logo">
            <img
              src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png"
              alt="Рыбка Долли"
            />
          </Link>
          <Link to="/" className="site-header-nav-link" style={{ marginLeft: "auto" }}>
            <Icon name="ArrowLeft" size={15} style={{ marginRight: 6, verticalAlign: -2 }} />
            На главную
          </Link>
        </div>
      </header>

      <section className="draft-hero">
        <div className="container container-narrow">
          <div className="draft-badge">
            <Icon name="Construction" size={14} /> Страница в разработке — полное наполнение скоро
          </div>
          <h1 className="draft-h1">{h1}</h1>
          <p className="draft-intro">{intro}</p>
        </div>
      </section>

      <section className="bg-cream" style={{ padding: "48px 0" }}>
        <div className="container container-narrow">
          <div className="draft-card" style={{ maxWidth: 640, margin: "0 auto" }}>
            <h3 className="draft-card-title">{cardTitle}</h3>
            <ul className="draft-card-list">
              {cardItems.map((item, i) => (
                <li key={i}>
                  <Icon name="Check" size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {cardResult && (
              <div className="draft-card-result">
                <Icon name="TrendingUp" size={14} />
                {cardResult}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white" style={{ padding: "56px 0" }}>
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Заявка</span>
            <h2 className="section-h2">Оставьте заявку —<br />мы перезвоним</h2>
          </div>
          {!done ? (
            <form onSubmit={submit} className="modal-form" style={{ maxWidth: 420, margin: "0 auto" }}>
              <input className="modal-input" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="modal-input" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label className="privacy-checkbox-label">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                <span>
                  Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a>
                </span>
              </label>
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={loading || !agreed} style={{ justifyContent: "center" }}>
                {loading ? "Отправляем..." : "Оставить заявку"}
                {!loading && <Icon name="ArrowRight" size={18} />}
              </button>
            </form>
          ) : (
            <div className="modal-success" style={{ maxWidth: 420, margin: "0 auto" }}>
              <span className="success-big-emoji">🎉</span>
              <h3 className="modal-title">Отлично!</h3>
              <p className="modal-sub">Мы позвоним вам в течение 30 минут.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-cream" style={{ padding: "40px 0" }}>
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <div className="hero-v2-cta-row" style={{ justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            <a href="tel:+79881521698" className="cta-btn cta-btn-outline" onClick={() => ymGoal("click_phone")}>
              <Icon name="Phone" size={16} /> +7 (988) 152-16-98 (МТС)
            </a>
            <a href="tel:+79787120353" className="cta-btn cta-btn-outline" onClick={() => ymGoal("click_phone")}>
              <Icon name="Phone" size={16} /> +7 (978) 712-03-53 (Волна)
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
              onClick={() => ymGoal("click_messenger")}
            >
              <Icon name="MessageCircle" size={16} /> Спросить в MAX
            </a>
          </div>
          <Link to="/" className="footer-link" style={{ display: "inline-flex", marginTop: 24, color: "var(--text-muted)" }}>
            <Icon name="ArrowLeft" size={15} /> На главную
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">🌊 ДДЦ «Рыбка Долли»</div>
              <p>Частный детский сад в Керчи</p>
              <p>г. Керчь, ул. Циолковского, 12</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+79881521698" className="footer-link" onClick={() => ymGoal("click_phone")}>
                <Icon name="Phone" size={15} /> +7 (988) 152-16-98 (МТС)
              </a>
              <a href="tel:+79787120353" className="footer-link" onClick={() => ymGoal("click_phone")}>
                <Icon name="Phone" size={15} /> +7 (978) 712-03-53 (Волна)
              </a>
              <div className="footer-hours">
                <Icon name="Clock" size={15} /> Пн–Пт: 8:00–18:00
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ДДЦ «Рыбка Долли»</span>
            <span>ИП Савченко И.И. · ОГРНИП 318911200074795</span>
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline", fontSize: 12 }}>
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}