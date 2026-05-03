import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { CHECKLIST } from "./constants";
import { ymGoal } from "@/lib/ym";

const SEND_CHECKLIST_URL = "https://functions.poehali.dev/34e49ad9-ee73-40be-bb8a-e56d71588fb0";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const timer = setTimeout(() => {
        if (!dismissed) {
          setVisible(true);
          sessionStorage.setItem("exit_popup_shown", "1");
        }
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 10 && !dismissed) {
          setVisible(true);
          sessionStorage.setItem("exit_popup_shown", "1");
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [dismissed]);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;
    setLoading(true);
    await fetch(SEND_CHECKLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    ymGoal('form_exit_popup_submit');
    setLoading(false);
    setDone(true);
  };

  if (!visible) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleClose}>
      <div className="exit-popup" onClick={e => e.stopPropagation()}>
        <button className="exit-popup-close" onClick={handleClose} aria-label="Закрыть">
          <Icon name="X" size={20} />
        </button>

        <div className="exit-popup-emoji">🎁</div>
        <h2 className="exit-popup-title">Подарок для родителей!</h2>
        <p className="exit-popup-sub">Получите три бесплатных чек-листа — пришлём на почту</p>

        <ul className="exit-popup-list">
          {CHECKLIST.map((item, i) => (
            <li key={i}>
              <Icon name="CheckCircle" size={15} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {!done ? (
          <form onSubmit={handleSubmit} className="exit-popup-form">
            <input
              className="exit-popup-input"
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className="exit-popup-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label className="privacy-checkbox-label">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
              <span>Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a></span>
            </label>
            <button type="submit" className="exit-popup-btn" disabled={loading || !agreed}>
              {loading ? "Отправляем..." : "Получить чек-листы бесплатно"}
              {!loading && <Icon name="ArrowRight" size={16} />}
            </button>
            <p className="exit-popup-privacy">
              <Icon name="Lock" size={11} /> Нажимая кнопку, вы соглашаетесь получать материалы блога ribkadolli.ru
            </p>
          </form>
        ) : (
          <div className="exit-popup-success">
            <Icon name="CheckCircle" size={32} />
            <p>Отлично, <strong>{name}</strong>! Чек-листы уже летят к вам на почту.</p>
            <button className="exit-popup-btn" onClick={handleClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}