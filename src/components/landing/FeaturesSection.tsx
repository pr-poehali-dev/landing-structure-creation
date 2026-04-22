import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";

const FEATURES = [
  {
    id: "adaptation",
    emoji: "🤗",
    emojiClass: "feat-emoji-wrap-blue",
    title: "Быстрая адаптация — без слёз и стресса",
    subtitle: "Ваш малыш полюбит садик с первых дней",
    items: [
      "Специальная программа мягкой адаптации для яслей (от 1,5 лет)",
      "Воспитатель на связи с вами весь день: фото, видео, отчёты",
    ],
    result: "9 из 10 детей привыкают за 1–2 недели",
    review: "Сын перестал плакать на третий день. Теперь сам тянет меня в садик!",
    reviewer: "Мама Артёма, 2 года",
  },
  {
    id: "school",
    emoji: "📚",
    emojiClass: "feat-emoji-wrap-green",
    title: "Подготовка к школе — реальная, а не для галочки",
    subtitle: "К первому классу ваш ребёнок будет готов на 100%",
    items: [
      "Читают, пишут, считают — программа по ФГОС",
      "Развитая речь, логика, память",
      "Психологическая готовность: умеют слушать, работать в группе, не бояться ошибок",
      "Уникальная методика: ребёнок начинает читать за пару месяцев",
    ],
    result: null,
    review: "Дочка пошла в 1 класс и сразу стала лучшей в чтении. Учительница спрашивала, где мы так подготовились!",
    reviewer: "Мама Алины, 7 лет",
  },
  {
    id: "english",
    emoji: "🌍",
    emojiClass: "feat-emoji-wrap-purple",
    title: "Английский с удовольствием — играя и говоря",
    subtitle: "Английский без зубрёжки — через игры и живое общение",
    items: [
      "Полное погружение в языковую среду",
      "Дети говорят, спорят, договариваются — на английском",
      "Запоминают слова в контексте, а не списком",
    ],
    result: "Ребёнок не боится говорить и понимает речь на слух",
    review: "Сын учился во втором классе. Жутко боялся этот предмет. Тут сняли все зажимы, ребёнок счастлив — мы тоже.",
    reviewer: "Мама Максима, 8 лет",
  },
  {
    id: "care",
    emoji: "💙",
    emojiClass: "feat-emoji-wrap-heart",
    title: "Домашняя атмосфера и индивидуальный подход",
    subtitle: "Мы любим детей, как своих — это чувствуется",
    items: [
      "Кто не ест лук — готовим без лука",
      "Кто боится громких звуков — предупреждаем заранее",
      "Кто сегодня грустит — обнимаем и поддерживаем",
      "Питание с учётом особенностей: безлактозное и безглютеновое",
      "Ежедневные отчёты, фото и видео из жизни садика",
    ],
    result: "Группы до 12 человек — воспитатель знает каждого",
    review: "Это не садик — это вторая семья. Воспитатели любят детей по-настоящему, это видно.",
    reviewer: "Мама Сони, 4 года",
  },
];

export default function FeaturesSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="feat-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Наши программы</span>
          <h2 className="section-h2">Всё для развития<br />и счастья вашего ребёнка</h2>
        </div>

        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div key={i} id={f.id} className="feat-card">
              <div className={`feat-emoji-wrap ${f.emojiClass}`}>{f.emoji}</div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-subtitle">{f.subtitle}</p>
              <ul className="feat-list">
                {f.items.map((item, j) => (
                  <li key={j}>
                    <Icon name="Check" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {f.result && (
                <div className="feat-result">
                  <Icon name="TrendingUp" size={14} />
                  {f.result}
                </div>
              )}
              <div className="feat-review">
                <p className="feat-review-text">«{f.review}»</p>
                <span className="feat-review-author">— {f.reviewer}</span>
              </div>
            </div>
          ))}

          {/* Летний клуб — широкая карточка */}
          <div id="summer" className="feat-card feat-card-summer">
            <div className="feat-left">
              <div className="feat-emoji-wrap feat-emoji-wrap-sun">☀️</div>
              <h3 className="feat-title" style={{ marginTop: 12 }}>Летний клуб — лучшее лето в жизни вашего ребёнка</h3>
              <p className="feat-subtitle">Пока вы работаете, ваш ребёнок проживает приключение</p>
              <ul className="feat-list" style={{ marginTop: 8 }}>
                <li><Icon name="Check" size={14} /><span>Мастер-классы: гончарка, роспись, кулинария, эксперименты</span></li>
                <li><Icon name="Check" size={14} /><span>Поездки на море, прогулки, походы</span></li>
                <li><Icon name="Check" size={14} /><span>Квесты, тематические игры, вечерние костры</span></li>
                <li><Icon name="Check" size={14} /><span>Смены для детей 4–14 лет: малыши, школьники, подростки</span></li>
              </ul>
              <div className="feat-review" style={{ marginTop: 12 }}>
                <p className="feat-review-text">«Это было ЛУЧШЕЕ лето! Можно ещё раз?»</p>
                <span className="feat-review-author">— Ваня, 10 лет</span>
              </div>
            </div>
            <div className="feat-right">
              <div className="feat-badge">⏰ Первая смена стартует 1 июня. Успейте приобрести со скидкой.</div>
              <button className="cta-btn cta-btn-primary" style={{ width: "100%" }} onClick={() => { ymGoal('click_summer_club'); onOpenModal(); }}>
                Записаться в летний клуб
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_features_cta'); onOpenModal(); }}>
            Записаться на экскурсию в садик
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>

        {/* SEO-текст — скрыт визуально, индексируется поисковиками */}
        <div className="seo-text">
          <h2>Частный детский сад в Керчи «Рыбка Долли» — ясли от 1 года</h2>
          <p>Частный детский сад «Рыбка Долли» в Керчи на улице Циолковского принимает детей с 1 года. Домашний детский сад с маленькими группами до 12 человек, питанием, мягкой адаптацией и индивидуальным подходом. Частный детский сад Керчь — цены от 18 000 ₽/мес. Читайте отзывы родителей и записывайтесь на экскурсию.</p>

          <h2>Летний лагерь Керчь 2025 — летний клуб для детей</h2>
          <p>Летний лагерь в Керчи для детей 4–14 лет. Детский лагерь Керчь 2025 — поездки на море, мастер-классы, квесты, тематические смены. Куда отдать ребёнка на лето в Керчи? Летний клуб для детей «Рыбка Долли» — лучший выбор. Летний лагерь Керчь цены — уточняйте при записи.</p>

          <h2>Подготовка к школе в Керчи — курсы для дошкольников</h2>
          <p>Курсы подготовки к школе в Керчи по ФГОС: чтение, письмо, счёт, логика, развитие речи и памяти. Подготовка к школе Керчь — цены доступные, группы небольшие. Ребёнок будет готов к первому классу на 100%.</p>

          <h2>Продлёнка в Керчи для школьников</h2>
          <p>Продлёнка в Керчи — группа продлённого дня с помощью в уроках, английским языком и развивающими занятиями. Продлёнка для школьников Керчь: безопасно, удобно, с питанием.</p>

          <h2>Английский для детей в Керчи — разговорный курс</h2>
          <p>Английский для дошкольников и школьников в Керчи. Разговорный английский для детей через игры и живое общение. Ребёнок начинает говорить, понимать речь на слух и не боится иностранного языка.</p>
        </div>
      </div>
    </section>
  );
}