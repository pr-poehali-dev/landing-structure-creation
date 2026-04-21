import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/files/9de06b64-cb5a-49ac-8363-00d1dab61f1e.jpg";
const IMG_TEAM = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/files/99b154c6-e8b8-4f6f-b0a7-29aaef4149c6.jpg";
const IMG_LUNCH = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/files/254342fe-c7a7-4128-ab9d-1fabaca2f7da.jpg";

const GALLERY = [IMG_HERO, IMG_TEAM, IMG_LUNCH, IMG_HERO, IMG_TEAM, IMG_LUNCH];

const ADVANTAGES = [
  { icon: "Shield", title: "Безопасность", text: "Закрытая территория, видеонаблюдение 24/7, пропускной режим" },
  { icon: "Heart", title: "Забота и тепло", text: "Каждый ребёнок — особенный. Индивидуальный подход к каждому" },
  { icon: "Star", title: "Развитие", text: "Английский, рисование, музыка, логика — с 2 лет" },
  { icon: "Utensils", title: "5-разовое питание", text: "Собственная кухня, только свежие продукты, меню педиатра" },
];

const SCHEDULE = [
  { time: "7:30", title: "Приём детей", desc: "Утренняя гимнастика, свободная игра" },
  { time: "9:00", title: "Завтрак", desc: "Горячая каша, фрукты, напиток" },
  { time: "9:30", title: "Занятия", desc: "Развивающие уроки по возрасту" },
  { time: "12:00", title: "Прогулка", desc: "Свежий воздух, подвижные игры" },
  { time: "13:00", title: "Обед", desc: "Полноценный горячий обед" },
  { time: "13:30", title: "Тихий час", desc: "Дневной сон в уютных кроватках" },
  { time: "15:30", title: "Полдник", desc: "Лёгкий перекус" },
  { time: "16:00", title: "Творчество", desc: "Рисование, лепка, музыка" },
  { time: "18:00", title: "Ужин и уход", desc: "Тёплый ужин, прогулка до прихода родителей" },
];

const REVIEWS = [
  { name: "Анна К.", age: "Сыну 3 года", text: "Отдала ребёнка со слезами — забираю со слезами (его!). Не хочет уходить. Воспитатели просто золотые, всё объясняют, фотки в чат кидают.", stars: 5 },
  { name: "Дмитрий П.", age: "Дочке 4 года", text: "Искали долго. Зашли на экскурсию — и сразу поняли: вот оно. Чисто, светло, дети счастливые. Три месяца — никаких претензий.", stars: 5 },
  { name: "Марина С.", age: "Двойняшки 2,5 года", text: "Взяли сразу двоих. Думали — сложно. Оказалось наоборот, здесь умеют работать даже с близнецами. Рекомендую всем подругам.", stars: 5 },
];

const FAQ_LIST = [
  { q: "С какого возраста принимаете?", a: "Принимаем детей от 1,5 лет. Группы раннего развития — от 1,5 до 3 лет, дошкольные группы — от 3 до 7 лет." },
  { q: "Как проходит адаптация?", a: "Первые 2 недели — бесплатный адаптационный период. Начинаем с 2 часов, постепенно увеличиваем время. Воспитатель ведёт дневник наблюдений." },
  { q: "Что нужно с собой?", a: "Сменная одежда (2 комплекта), сменная обувь, постельное бельё. Полный список выдаём при оформлении." },
  { q: "Можно ли забирать раньше или позже?", a: "Да, работаем с 7:30 до 19:00. Можно забрать в любое удобное время, просто предупредите воспитателя." },
  { q: "Как кормите детей?", a: "5-разовое питание: завтрак, второй завтрак, обед, полдник, ужин. Меню разработано педиатром, готовим на собственной кухне из свежих продуктов." },
  { q: "Есть ли видеонаблюдение?", a: "Да, видеокамеры установлены во всех групповых комнатах, коридорах и на территории. Родители могут посмотреть запись по запросу." },
];

const TEAM = [
  { name: "Ольга Викторовна", role: "Старший воспитатель", exp: "18 лет опыта", img: IMG_TEAM },
  { name: "Наталья Игоревна", role: "Педагог-психолог", exp: "12 лет опыта", img: IMG_LUNCH },
  { name: "Светлана Петровна", role: "Воспитатель", exp: "9 лет опыта", img: IMG_HERO },
];

const CHECKLIST = [
  "Список документов для поступления",
  "Чек-лист первого дня в садике",
  "10 вопросов, которые надо задать при выборе сада",
  "Советы педагога по адаптации ребёнка",
];

const PRICES = [
  { name: "Полный день", hours: "7:30–19:00", price: "18 500", old: "22 000", badge: "Популярный" },
  { name: "Короткий день", hours: "7:30–13:00", price: "12 500", old: null, badge: null },
  { name: "Гибкое посещение", hours: "По часам", price: "от 300 ₽/ч", old: null, badge: null },
];

function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) setDone(true);
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
              <input className="modal-input" placeholder="Телефон или Telegram" value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary">
                Хочу на экскурсию
                <Icon name="ArrowRight" size={18} />
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
  return <>{d}д {String(h).padStart(2,"0")}ч {String(m).padStart(2,"0")}м {String(s).padStart(2,"0")}с</>;
}

function HeroInlineForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) { setDone(true); onSuccess(); }
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
      <button type="submit" className="cta-btn cta-btn-primary hform-btn">
        Записаться
        <Icon name="ArrowRight" size={16} />
      </button>
    </form>
  );
}

function useInView(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null!);
  const visible = useInView(ref);
  return (
    <section ref={ref} className={`section-block ${visible ? "section-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [calcDays, setCalcDays] = useState(5);
  const [calcHours, setCalcHours] = useState("full");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timerSec, setTimerSec] = useState(23 * 60 + 47);

  useEffect(() => {
    const t = setInterval(() => setTimerSec(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(timerSec / 60)).padStart(2, "0");
  const ss = String(timerSec % 60).padStart(2, "0");

  const calcPrice = () => {
    const base = calcHours === "full" ? 18500 : 12500;
    return Math.round(base * (calcDays / 5));
  };

  return (
    <div className="ld">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Плавающая кнопка */}
      <button className="float-btn" onClick={() => setModalOpen(true)}>
        <Icon name="Calendar" size={20} />
        <span>Записаться</span>
      </button>

      {/* ── БЛОК 1: Герой ── */}
      <section className="hero-wrap">
        {/* Шапка */}
        <div className="hero-navbar">
          <div className="hero-logo">
            <div className="hero-logo-icon">🐟</div>
            <div>
              <div className="hero-logo-name">Рыбка Долли</div>
              <div className="hero-logo-sub">Дети наше всё!</div>
            </div>
          </div>
          <a href="tel:+79782345678" className="hero-phone-btn">
            <Icon name="Phone" size={16} />
            +7 (978) 234-56-78
          </a>
        </div>

        {/* Двухколоночный контент */}
        <div className="hero-split">
          {/* Левая колонка — фото */}
          <div className="hero-photo-col">
            <img src={IMG_HERO} alt="Дети в детском саду" className="hero-photo-main" />
          </div>

          {/* Правая колонка — текст + форма */}
          <div className="hero-form-col">
            <h1 className="hero-h1">
              Частный детский сад<br />
              <span className="h1-accent">«Рыбка Долли»</span>
            </h1>
            <p className="hero-address">
              <Icon name="MapPin" size={14} />
              Керчь, ул. Циолковского, 12
            </p>
            <p className="hero-desc">Домашняя атмосфера для детей 1,5–6 лет</p>

            <ul className="hero-checklist">
              <li><Icon name="Check" size={16} /><span>Группы до 10 детей</span></li>
              <li><Icon name="Check" size={16} /><span>Вкусное питание</span></li>
              <li><Icon name="Check" size={16} /><span>Педагоги-профессионалы</span></li>
            </ul>

            {/* Мини-форма */}
            <div className="hero-inline-form">
              <HeroInlineForm onSuccess={() => setModalOpen(false)} />
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

      {/* ── БЛОК 2: Преимущества ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Почему выбирают нас</span>
            <h2 className="section-h2">Всё, что важно<br />для вашего ребёнка</h2>
          </div>
          <div className="adv-grid">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="adv-card">
                <div className="adv-icon">
                  <Icon name={a.icon as "Shield"} size={28} />
                </div>
                <h3 className="adv-title">{a.title}</h3>
                <p className="adv-text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── БЛОК 3: День в садике ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">Каждая минута<br />наполнена смыслом</h2>
          </div>
          <div className="schedule-wrap">
            <div className="schedule-list">
              {SCHEDULE.map((s, i) => (
                <div key={i} className="schedule-item">
                  <div className="schedule-time">{s.time}</div>
                  <div className="schedule-dot" />
                  <div className="schedule-info">
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="schedule-photo">
              <img src={IMG_LUNCH} alt="Обед в садике" />
              <div className="schedule-photo-badge">
                <Icon name="Utensils" size={16} />
                5-разовое питание каждый день
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 4: Отзывы ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Отзывы родителей</span>
            <h2 className="section-h2">Что говорят<br />наши семьи</h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                <p className="review-text">«{r.text}»</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-cta">
            <button className="cta-btn cta-btn-primary" onClick={() => setModalOpen(true)}>
              Хочу так же — записаться
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 5: Цены ── */}
      <Section className="bg-dark">
        <div className="container">
          <div className="section-header section-header-light">
            <span className="section-tag section-tag-light">Прозрачные цены</span>
            <h2 className="section-h2 clr-white">Никаких скрытых<br />доплат</h2>
          </div>
          <div className="timer-banner">
            <Icon name="Clock" size={18} />
            <span>Акция «Раннее бронирование» заканчивается через: <strong>{mm}:{ss}</strong></span>
          </div>
          <div className="prices-grid">
            {PRICES.map((p) => (
              <div key={p.name} className={`price-card ${p.badge ? "price-card-popular" : ""}`}>
                {p.badge && <div className="price-badge">{p.badge}</div>}
                <h3 className="price-name">{p.name}</h3>
                <div className="price-hours">{p.hours}</div>
                <div className="price-amount">
                  {p.old && <span className="price-old">{p.old} ₽</span>}
                  <span className="price-current">{p.price}{" "}₽/мес</span>
                </div>
                <button className="cta-btn cta-btn-price" onClick={() => setModalOpen(true)}>
                  Выбрать <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="prices-note">В стоимость входит: питание, все занятия, постельное бельё, страховка</p>
        </div>
      </Section>

      {/* ── БЛОК 6: Калькулятор ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Калькулятор</span>
            <h2 className="section-h2">Рассчитайте<br />стоимость за минуту</h2>
          </div>
          <div className="calc-wrap">
            <div className="calc-controls">
              <div className="calc-row">
                <label className="calc-label">Дней в неделю</label>
                <div className="calc-days">
                  {[1, 2, 3, 4, 5].map(d => (
                    <button
                      key={d}
                      className={`calc-day-btn ${calcDays === d ? "calc-day-active" : ""}`}
                      onClick={() => setCalcDays(d)}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div className="calc-row">
                <label className="calc-label">Время пребывания</label>
                <div className="calc-types">
                  <button
                    className={`calc-type-btn ${calcHours === "full" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcHours("full")}
                  >
                    Полный день (7:30–19:00)
                  </button>
                  <button
                    className={`calc-type-btn ${calcHours === "short" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcHours("short")}
                  >
                    Короткий (до 13:00)
                  </button>
                </div>
              </div>
            </div>
            <div className="calc-result">
              <div className="calc-result-label">Ваша стоимость в месяц</div>
              <div className="calc-result-price">{calcPrice().toLocaleString("ru-RU")} ₽</div>
              <div className="calc-result-note">Включает питание и все занятия</div>
              <button className="cta-btn cta-btn-primary" onClick={() => setModalOpen(true)}>
                Записаться по этой цене
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 7: FAQ ── */}
      <Section className="bg-white">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Частые вопросы</span>
            <h2 className="section-h2">Отвечаем честно<br />на всё</h2>
          </div>
          <div className="faq-list">
            {FAQ_LIST.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "faq-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} />
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── БЛОК 8: Команда ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Наша команда</span>
            <h2 className="section-h2">Люди, которым<br />доверяют детей</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} className="team-card">
                <div className="team-photo">
                  <img src={t.img} alt={t.name} />
                </div>
                <h3 className="team-name">{t.name}</h3>
                <div className="team-role">{t.role}</div>
                <div className="team-exp">{t.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── БЛОК 9: Галерея ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Фотогалерея</span>
            <h2 className="section-h2">Загляните<br />к нам</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img} alt={`Фото ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </Section>

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
            <button className="cta-btn cta-btn-white" onClick={() => setModalOpen(true)}>
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
              <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => setModalOpen(true)}>
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
    </div>
  );
}