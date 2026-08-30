import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { IMG_HERO } from "./constants";
import { ymGoal } from "@/lib/ym";

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed) return;
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
              <label className="privacy-checkbox-label">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                <span>Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a></span>
              </label>
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={loading || !agreed}>
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
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed) return;
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
    <form id="booking-form" className="hform" onSubmit={submit}>
      <input className="hform-input" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
      <input className="hform-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />
      <input className="hform-input" placeholder="Возраст ребёнка" value={age} onChange={e => setAge(e.target.value)} />
      <label className="privacy-checkbox-label privacy-checkbox-label--light">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
        <span>Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a></span>
      </label>
      <button type="submit" className="cta-btn cta-btn-primary hform-btn" disabled={loading || !agreed}>
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
    <section className="hero-wrap" style={{ position: 'relative' }}>
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
          {(() => {
            const now = new Date();
            const y = now.getFullYear();
            const mo = now.getMonth() + 1;
            const d = now.getDate();
            const show = y === 2026 && mo === 5 && d >= 9 && d <= 11;
            return show ? (
              <div style={{
                background: 'linear-gradient(90deg, #d32f2f, #f57c00, #fdd835, #388e3c, #1976d2, #7b1fa2, #d32f2f)',
                backgroundSize: '300% 100%',
                animation: 'may9gradient 3s linear infinite',
                borderRadius: 12,
                padding: '10px 18px',
                marginBottom: 10,
                textAlign: 'center',
                fontWeight: 800,
                fontSize: 18,
                color: '#fff',
                letterSpacing: 1,
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>
                ⭐ С Днём Победы! · 9 мая · 81 год 🕊️
              </div>
            ) : null;
          })()}
          <figure className="hero-photo-figure">
            <img
              src={IMG_HERO}
              alt="Занятие с детьми старшей группы в частном детском садике Рыбка Долли в Керчи"
              className="hero-photo-main"
            />
            <figcaption className="hero-photo-caption">Педагог Рыбки Долли на занятии с детьми</figcaption>
          </figure>
          {/* Плашка выгоды под фото */}
          <div style={{
            marginTop: 24,
            background: 'linear-gradient(90deg, #FF4500 0%, #FF6B35 25%, #FF8C42 50%, #FF6B35 75%, #FF4500 100%)',
            backgroundSize: '300% 100%',
            animation: 'coralShimmer 3s ease-in-out infinite',
            borderRadius: 12,
            padding: '11px 18px',
            border: '2px solid rgba(255,120,60,0.6)',
            boxShadow: '0 4px 18px rgba(255,80,30,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            textAlign: 'center' as const,
            fontWeight: 800,
            fontSize: 15,
            color: '#fff',
            letterSpacing: 0.2,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            🎁 Выгодно. Качественно. С заботой о каждом
          </div>
        </div>

        {/* Правая колонка — текст + форма */}
        <div id="form" className="hero-form-col" style={{ position: 'relative' }}>
          {/* Бирка-ценник */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'rotate(4deg)',
            zIndex: 2,
            userSelect: 'none' as const,
            animation: 'priceBadgeBounce 3.5s ease-in-out infinite',
          }}>
            {/* Верёвочка */}
            <svg width="3" height="28" viewBox="0 0 3 28" style={{ display: 'block' }}>
              <line x1="1.5" y1="0" x2="1.5" y2="28" stroke="#b07a3a" strokeWidth="1.8" strokeDasharray="4 3" />
            </svg>
            {/* Сама бирка */}
            <div style={{
              background: 'linear-gradient(150deg, #fff8ee 0%, #fff3e0 100%)',
              border: '2.5px solid #FF6B35',
              borderRadius: 14,
              padding: '18px 20px 16px',
              boxShadow: '4px 5px 18px rgba(255,107,53,0.28), 0 2px 4px rgba(0,0,0,0.12)',
              position: 'relative',
              minWidth: 150,
              textAlign: 'center' as const,
            }}>
              {/* Дырочка */}
              <div style={{
                position: 'absolute',
                top: -9,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff8ee',
                border: '2.5px solid #FF6B35',
              }} />
              <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 8 }}>💎</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#FF6B35', lineHeight: 1.1 }}>от 20 000 ₽</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FF6B35', marginBottom: 8 }}>в месяц</div>
              <div style={{ width: '70%', height: 1.5, background: '#FFD0B0', margin: '0 auto 8px' }} />
              <div style={{ fontSize: 12, color: '#b07a3a', fontWeight: 700, lineHeight: 1.3 }}>невысокая цена —<br />премиум качество</div>
            </div>
          </div>

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
            <li><Icon name="Check" size={16} /><span>Проходим проверку санитарного соответствия 2 раза в год</span></li>
          </ul>

          <div className="hero-cta-buttons">
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_hero_cta'); onOpenModal(); }} style={{
              background: 'linear-gradient(90deg, #FF4500 0%, #FF6B35 25%, #FF8C42 50%, #FF6B35 75%, #FF4500 100%)',
              backgroundSize: '300% 100%',
              animation: 'coralShimmer 3s ease-in-out infinite',
              border: '2px solid rgba(255,120,60,0.5)',
              boxShadow: '0 4px 18px rgba(255,80,30,0.4)',
            }}>
              Записаться с выгодой
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="hero-bottom-bar">
        <span className="hero-urgency">
          <Icon name="CalendarCheck" size={16} />
          Ведём осенний набор в группу. Успейте забронировать место. Занятия начинаются с 5 сентября.
        </span>
      </div>
    </section>
  );
}