import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { IMG_HERO } from "./constants";
import { ymGoal } from "@/lib/ym";

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    await sendLead(name, phone, '', 'Модальное окно');
    ymGoal('form_modal_submit');
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="X" size={20} /></button>
        {!done ? (
          <>
            <div className="modal-header">
              <span className="modal-emoji">🌟</span>
              <h3 className="modal-title">Запишитесь на экскурсию</h3>
              <p className="modal-sub">Бесплатно. Без обязательств. Просто посмотрите.</p>
            </div>
            <form onSubmit={submit} className="modal-form">
              <input className="modal-input" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
              <input className="modal-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={loading}>
                {loading ? 'Отправляем...' : 'Хочу на экскурсию'}
                {!loading && <Icon name="ArrowRight" size={18} />}
              </button>
              <p className="modal-privacy"><Icon name="Lock" size={11} /> Данные не передаём третьим лицам</p>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <span className="success-big-emoji">🎉</span>
            <h3 className="modal-title">Отлично!</h3>
            <p className="modal-sub">Мы позвоним вам в течение 30 минут и договоримся об удобном времени.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CountdownTimer ─────────────────────────────────────────────────────────
function CountdownTimer() {
  const [sec, setSec] = useState(4 * 24 * 3600 + 12 * 3600);
  useEffect(() => {
    const t = setInterval(() => setSec(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return <>{d}д {String(h).padStart(2, "0")}ч {String(m).padStart(2, "0")}м {String(s).padStart(2, "0")}с</>;
}

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

async function sendLead(name: string, phone: string, age: string, source: string) {
  await fetch(SEND_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, age, source }),
  });
}

// ── HeroInlineForm ─────────────────────────────────────────────────────────
function HeroInlineForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    await sendLead(name, phone, age, 'Форма в герое');
    ymGoal('form_hero_submit');
    setLoading(false);
    setDone(true);
    onSuccess();
  };

  if (done) return (
    <div className="hform-success">
      <span>🎉</span> Спасибо! Перезвоним в течение 30 минут.
    </div>
  );

  return (
    <form className="hform" onSubmit={submit}>
      <input className="hform-input" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
      <input className="hform-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />
      <input className="hform-input" placeholder="Возраст ребёнка" value={age} onChange={e => setAge(e.target.value)} />
      <button type="submit" className="cta-btn cta-btn-primary hform-btn" disabled={loading}>
        {loading ? 'Отправляем...' : 'Записаться'}
        {!loading && <Icon name="ArrowRight" size={16} />}
      </button>
    </form>
  );
}

// ── HeroSection ────────────────────────────────────────────────────────────
interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="hero-wrap">
      {/* Шапка */}
      <div className="hero-navbar">
        <div className="hero-logo">
          <img
            src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png"
            alt="Рыбка Долли"
            className="hero-logo-img"
          />
        </div>
        <div id="phones" className="hero-phones">
          <a href="https://vk.com/rybka_dolli" target="_blank" rel="noopener noreferrer" className="hero-phone-btn hero-vk-btn" onClick={() => ymGoal('click_vk')}>
            <Icon name="Users" size={16} />
            ВКонтакте
          </a>
          <a href="tel:+79881521698" className="hero-phone-btn" onClick={() => ymGoal('click_phone')}>
            <Icon name="Phone" size={16} />
            +7 (988) 152-16-98 МТС
          </a>
          <a href="tel:+79787120353" className="hero-phone-btn hero-phone-btn-alt" onClick={() => ymGoal('click_phone')}>
            <Icon name="Phone" size={16} />
            +7 (978) 712-03-53 Волна
          </a>
        </div>
      </div>

      {/* Двухколоночный контент */}
      <div className="hero-split">
        {/* Левая колонка — фото */}
        <div className="hero-photo-col">
          <figure className="hero-photo-figure">
            <img
              src={IMG_HERO}
              alt="Занятие с детьми старшей группы в частном детском садике Рыбка Долли в Керчи"
              className="hero-photo-main"
            />
            <figcaption className="hero-photo-caption">Педагог Рыбки Долли на занятии с детьми</figcaption>
          </figure>
        </div>

        {/* Правая колонка — текст + форма */}
        <div id="form" className="hero-form-col">
          <h1 className="hero-h1">
            Частный детский сад<br />
            <span className="h1-accent">«Рыбка Долли»</span>
          </h1>
          <p className="hero-address">
            <Icon name="MapPin" size={14} />
            Керчь, ул. Циолковского, 12
          </p>
          <p className="hero-desc">Домашняя атмосфера для детей 1,5–6 лет — от 16 000 ₽</p>

          <ul className="hero-checklist">
            <li><Icon name="Check" size={16} /><span>Группы до 12 детей</span></li>
            <li><Icon name="Check" size={16} /><span>Вкусное питание</span></li>
            <li><Icon name="Check" size={16} /><span>Педагоги с профильным высшим образованием</span></li>
            <li><Icon name="Check" size={16} /><span>Безопасность на высшем уровне</span></li>
            <li><Icon name="Check" size={16} /><span>Имеем лицензию и сертификат соответствия СЭС</span></li>
          </ul>

          <div className="hero-cta-buttons">
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_hero_cta'); onOpenModal(); }}>
              Записаться на экскурсию
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="hero-bottom-bar">
        <span className="hero-urgency">
          <Icon name="Clock" size={16} />
          Осталось <strong>3 места</strong>
        </span>
        <span className="hero-urgency-sep">|</span>
        <span className="hero-urgency">
          До конца акции: <strong><CountdownTimer /></strong>
        </span>
      </div>
    </section>
  );
}