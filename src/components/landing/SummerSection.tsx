import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

const SHIFTS = [
  { id: 1, label: "Смена 1",  dates: "2 июня — 13 июня" },
  { id: 2, label: "Смена 2",  dates: "16 июня — 27 июня" },
  { id: 3, label: "Смена 3",  dates: "30 июня — 11 июля" },
  { id: 4, label: "Смена 4",  dates: "14 июля — 25 июля" },
  { id: 5, label: "Смена 5",  dates: "28 июля — 8 августа" },
  { id: 6, label: "Смена 6",  dates: "11 августа — 22 августа" },
  { id: 7, label: "Смена 7",  dates: "25 августа — 5 сентября" },
  { id: 8, label: "Смена 8",  dates: "8 сентября — 19 сентября" },
];

function SummerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shift, setShift] = useState("");
  const [duration, setDuration] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !shift || !duration) return;
    setLoading(true);
    const shiftObj = SHIFTS.find(s => String(s.id) === shift);
    const source = `Летний клуб — ${shiftObj?.label} (${shiftObj?.dates}), ${duration === "1" ? "1 неделя — 7 000 ₽" : "2 недели — 13 000 ₽"}`;
    await fetch(SEND_LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, age: "4–7 лет", source }),
    });
    ymGoal("summer_form_submit");
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box summer-modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="X" size={20} /></button>
        {!done ? (
          <>
            <div className="modal-header">
              <span className="modal-emoji">☀️</span>
              <h3 className="modal-title">Записаться в летний клуб</h3>
              <p className="modal-sub">Выберите смену и мы перезвоним вам для подтверждения</p>
            </div>
            <form onSubmit={submit} className="modal-form">
              <input className="modal-input" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
              <input className="modal-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />

              <select className="modal-input modal-select" value={shift} onChange={e => setShift(e.target.value)} required>
                <option value="">Выберите смену</option>
                {SHIFTS.map(s => (
                  <option key={s.id} value={String(s.id)}>{s.label} — {s.dates}</option>
                ))}
              </select>

              <div className="summer-duration-group">
                <label className={`summer-duration-card ${duration === "1" ? "active" : ""}`} onClick={() => setDuration("1")}>
                  <div className="summer-dur-title">1 неделя</div>
                  <div className="summer-dur-price">7 000 ₽</div>
                </label>
                <label className={`summer-duration-card ${duration === "2" ? "active" : ""}`} onClick={() => setDuration("2")}>
                  <div className="summer-dur-title">2 недели</div>
                  <div className="summer-dur-price">13 000 ₽</div>
                  <div className="summer-dur-badge">выгоднее</div>
                </label>
              </div>

              <button type="submit" className="cta-btn cta-btn-primary" disabled={loading || !shift || !duration}>
                {loading ? "Отправляем..." : "Оставить заявку"}
                {!loading && <Icon name="ArrowRight" size={18} />}
              </button>
              <p className="modal-privacy"><Icon name="Lock" size={11} /> Данные не передаём третьим лицам</p>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <span className="success-big-emoji">🎉</span>
            <h3 className="modal-title">Заявка принята!</h3>
            <p className="modal-sub">Мы перезвоним вам в течение 30 минут и подтвердим место.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SummerSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const today = new Date();
  const deadline = new Date("2025-05-15");
  const showDiscount = today <= deadline;

  return (
    <>
      <SummerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="summer-section">
        <div className="container">
          <div className="summer-inner">

            <div className="summer-badge-row">
              <span className="summer-badge">☀️ Только летом</span>
              {showDiscount && (
                <span className="summer-discount-badge">🎁 Скидка 10% до 15 мая</span>
              )}
            </div>

            <h2 className="summer-h2">Летний клуб для дошкольников</h2>
            <p className="summer-sub">
              С июня по август старшая группа работает в развлекательном формате —<br className="summer-br" />
              творчество, игры, прогулки, занятия. Для детей <strong>4–7 лет</strong>.
            </p>

            <div className="summer-cards">
              <div className="summer-card">
                <div className="summer-card-icon">📅</div>
                <div className="summer-card-title">8 смен за лето</div>
                <div className="summer-card-desc">Каждая смена — 2 недели (10 рабочих дней), с июня по сентябрь</div>
              </div>
              <div className="summer-card">
                <div className="summer-card-icon">💰</div>
                <div className="summer-card-title">Гибкие абонементы</div>
                <div className="summer-card-desc">
                  <span className="summer-price-row"><b>1 неделя</b> — 7 000 ₽</span>
                  <span className="summer-price-row"><b>2 недели</b> — 13 000 ₽</span>
                  <span className="summer-price-note">Постоянный абонемент в садик — от 20 000 ₽/мес</span>
                </div>
              </div>
              <div className="summer-card">
                <div className="summer-card-icon">🎨</div>
                <div className="summer-card-title">Развлекательный формат</div>
                <div className="summer-card-desc">Творческие мастерские, игры, прогулки и лёгкие занятия без учебной нагрузки</div>
              </div>
            </div>

            <div className="summer-notice">
              <Icon name="Info" size={16} />
              <span>Летний клуб — это временный формат только на лето. Постоянные группы садика работают <b>круглый год</b> по обычному расписанию.</span>
            </div>

            <button
              className="cta-btn cta-btn-primary summer-cta-btn"
              onClick={() => { ymGoal("click_summer_cta"); setModalOpen(true); }}
            >
              Выбрать смену и записаться
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
