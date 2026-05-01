import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

const SHIFTS = [
  { id: 1, label: "Дино-смена",                 sub: "Путешествие по миру динозавров",                              dates: "1 июня — 12 июня",        month: "июнь",   icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/26ba9f35-f120-4fab-81d6-87696d2ba8e8.png", anim: "anim-wag",     color: "rgba(194, 154, 90, 0.65)" },
  { id: 2, label: "Школа юных волшебников",      sub: "Кто сказал, что волшебство не существует?",                  dates: "15 июня — 26 июня",       month: "июнь",   icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/5dd9e415-1665-4d9a-bd21-6a622d7fa13d.png", anim: "anim-sparkle", color: "rgba(156, 39, 176, 0.55)" },
  { id: 3, label: "Подводное царство русалочки", sub: "Волшебство не только на земле, но и под водой",              dates: "29 июня — 10 июля",       month: "июль",   icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/d94ffc2e-2922-4350-be51-5e8a925ddfba.png", anim: "anim-float",   color: "rgba(3, 169, 244, 0.55)" },
  { id: 4, label: "Космические приключения",     sub: "Спасаем галактику",                                          dates: "13 июля — 24 июля",       month: "июль",   icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/bc668c2a-66b1-4213-b571-7a926f005346.png", anim: "anim-hover",   color: "rgba(33, 33, 130, 0.65)" },
  { id: 5, label: "Радужная страна красок",      sub: "Творчества не бывает много — и ещё... оно бывает необычным", dates: "27 июля — 7 августа",     month: "август", icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/0c827943-e3af-493c-9cc7-483012ea348f.png", anim: "anim-rainbow", color: "rgba(255, 87, 34, 0.5)"  },
  { id: 6, label: "Остров пиратов",              sub: "На абордаж! Сокровища ждут нас",                             dates: "10 августа — 21 августа", month: "август", icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/c1b58838-a88e-498d-ac72-e95dbe8fd2fe.png", anim: "anim-rock",    color: "rgba(121, 85, 72, 0.6)"  },
  { id: 7, label: "Театр волшебных историй",     sub: "Погружение в закулисье",                                     dates: "24 августа — 28 августа", month: "август", icon: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/aa4f9bb3-615b-450a-b231-d069a4024460.png", anim: "anim-pulse",   color: "rgba(198, 40, 40, 0.55)" },
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
              <p className="modal-sub">Выберите смену — мы перезвоним и подтвердим место</p>
            </div>
            <form onSubmit={submit} className="modal-form">
              <input className="modal-input" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
              <input className="modal-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />
              <select className="modal-input modal-select" value={shift} onChange={e => setShift(e.target.value)} required>
                <option value="">Выберите смену</option>
                {SHIFTS.map(s => (
                  <option key={s.id} value={String(s.id)}>{s.emoji} {s.label} ({s.dates})</option>
                ))}
              </select>
              <div className="summer-duration-group">
                <div className={`summer-duration-card ${duration === "1" ? "active" : ""}`} onClick={() => setDuration("1")}>
                  <div className="summer-dur-title">1 неделя</div>
                  <div className="summer-dur-price">7 000 ₽</div>
                </div>
                <div className={`summer-duration-card ${duration === "2" ? "active" : ""}`} onClick={() => setDuration("2")}>
                  <div className="summer-dur-title">2 недели</div>
                  <div className="summer-dur-price">13 000 ₽</div>
                  <div className="summer-dur-badge">выгоднее</div>
                </div>
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
  const deadline = new Date("2026-05-15");
  const showDiscount = today <= deadline;

  return (
    <>
      <SummerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="summer-section">
        {/* Декоративные элементы */}
        <div className="summer-deco summer-deco-sun">☀️</div>
        <div className="summer-deco summer-deco-cloud">⛅</div>
        <div className="summer-deco summer-deco-flower">🌻</div>
        <div className="summer-deco summer-deco-balloon">🎈</div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="summer-inner">

            <div className="summer-badge-row">
              <span className="summer-badge">☀️ Только летом</span>
              {showDiscount && (
                <span className="summer-discount-badge">🎁 Скидка 10% до 15 мая</span>
              )}
            </div>

            <h2 className="summer-h2">Летний клуб<br />для дошкольников</h2>
            <p className="summer-sub">
              С июня старшая группа работает в <strong>развлекательном формате</strong> —
              творчество, игры, прогулки и лёгкие занятия. Для детей <strong>4–7 лет</strong>.
            </p>

            {/* Карточки */}
            <div className="summer-cards">
              <div className="summer-card">
                <div className="summer-card-icon">🎨</div>
                <div className="summer-card-title">Развлекательный формат</div>
                <div className="summer-card-desc">Творческие мастерские, игры на свежем воздухе, без учебной нагрузки</div>
              </div>
              <div className="summer-card summer-card-highlight">
                <div className="summer-card-icon">💰</div>
                <div className="summer-card-title">Гибкие абонементы</div>
                <div className="summer-card-desc">
                  <span className="summer-price-row"><b>1 неделя</b> — 7 000 ₽</span>
                  <span className="summer-price-row"><b>2 недели</b> — 13 000 ₽</span>
                  <span className="summer-price-note">Обычный абонемент в садик — от 20 000 ₽/мес</span>
                </div>
              </div>
              <div className="summer-card">
                <div className="summer-card-icon">👧</div>
                <div className="summer-card-title">Возраст 4–7 лет</div>
                <div className="summer-card-desc">Небольшие группы, знакомые воспитатели, домашняя атмосфера</div>
              </div>
            </div>

            {/* Таблица смен */}
            <div className="summer-table-wrap">
              <div className="summer-table-title">📋 Расписание смен — лето 2026 (7 смен)</div>
              <div className="summer-table">
                <div className="summer-table-head">
                  <span>Тема смены</span>
                  <span>Даты</span>
                  <span>Месяц</span>
                </div>
                {SHIFTS.map((s, i) => (
                  <div
                    key={s.id}
                    className="summer-table-row"
                    style={{ background: s.color }}
                    onClick={() => setModalOpen(true)}
                  >
                    <span className="summer-table-name">
                      <img src={s.icon} alt={s.label} className={`summer-table-icon ${s.anim}`} />
                      <span>
                        <span className="summer-table-label">{s.label}</span>
                        <span className="summer-table-sub">{s.sub}</span>
                      </span>
                    </span>
                    <span className="summer-table-dates">{s.dates}</span>
                    <span className="summer-table-month">{s.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Пометка */}
            <div className="summer-notice">
              <Icon name="Info" size={16} />
              <span>Летний клуб — временный формат только на лето. Постоянные группы садика работают <b>круглый год</b> по обычному расписанию.</span>
            </div>

            <button
              className="summer-main-btn"
              onClick={() => { ymGoal("click_summer_cta"); setModalOpen(true); }}
            >
              <span>Выбрать смену и записаться</span>
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}