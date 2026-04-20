import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.4 + 0.1,
}));

export default function Index() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      ref={containerRef}
      className="landing-root"
      style={{
        background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, #1a0a2e 0%, #0a0a0f 60%, #000 100%)`,
      }}
    >
      <div className="grain-overlay" />

      <div className="particles-layer" aria-hidden>
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="diagonal-line" aria-hidden />
      <div className="diagonal-line-2" aria-hidden />

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-tag animate-in-tag">
            <span className="tag-dot" />
            <span>Принимаем заявки</span>
          </div>

          <h1 className="hero-title animate-in-title">
            <span className="title-serif">Создаём</span>
            <br />
            <span className="title-accent">нечто</span>
            <span className="title-serif title-italic"> особенное</span>
          </h1>

          <p className="hero-sub animate-in-sub">
            Каждый проект — это отдельная вселенная.<br />
            Расскажи нам о своей.
          </p>
        </section>

        <section className="form-section animate-in-form">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-grid">
                <div className={`field-wrap ${focused === "name" ? "field-focused" : ""}`}>
                  <label className="field-label">Как тебя зовут</label>
                  <input
                    className="field-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Имя или компания"
                    autoComplete="off"
                  />
                  <div className="field-line" />
                </div>

                <div className={`field-wrap ${focused === "contact" ? "field-focused" : ""}`}>
                  <label className="field-label">Как с тобой связаться</label>
                  <input
                    className="field-input"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onFocus={() => setFocused("contact")}
                    onBlur={() => setFocused(null)}
                    placeholder="Телефон, email или Telegram"
                    autoComplete="off"
                  />
                  <div className="field-line" />
                </div>
              </div>

              <div className={`field-wrap field-full ${focused === "message" ? "field-focused" : ""}`}>
                <label className="field-label">Расскажи о проекте</label>
                <textarea
                  className="field-input field-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Несколько слов о том, что ты хочешь создать..."
                  rows={3}
                />
                <div className="field-line" />
              </div>

              <div className="form-footer">
                <button
                  type="submit"
                  className={`submit-btn ${name && contact ? "submit-btn-ready" : ""}`}
                >
                  <span className="btn-text">Отправить заявку</span>
                  <span className="btn-icon">
                    <Icon name="ArrowRight" size={18} />
                  </span>
                  <div className="btn-glow" />
                </button>

                <p className="form-note">
                  <Icon name="Lock" size={12} />
                  Данные в безопасности
                </p>
              </div>
            </form>
          ) : (
            <div className="success-block">
              <div className="success-icon">
                <Icon name="CheckCircle" size={36} />
              </div>
              <h2 className="success-title">Заявка получена</h2>
              <p className="success-text">
                Мы свяжемся с тобой в ближайшее время.<br />
                Готовься — будет интересно.
              </p>
            </div>
          )}
        </section>

        <div className="corner-deco" aria-hidden>
          <span className="corner-num">01</span>
          <span className="corner-label">Studio</span>
        </div>
      </main>
    </div>
  );
}
