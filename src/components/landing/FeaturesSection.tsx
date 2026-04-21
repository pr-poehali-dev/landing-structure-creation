import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";

const FEATURES = [
  {
    emoji: "🤗",
    tag: "Карточка 1",
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
    emoji: "📚",
    tag: "Карточка 2",
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
    emoji: "🌍",
    tag: "Карточка 3",
    title: "Английский с удовольствием — играя и говоря",
    subtitle: "Английский без зубрёжки — через игры и живое общение",
    items: [
      "Полное погружение в языковую среду",
      "Дети говорят, спорят, договариваются — на английском",
      "Запоминают слова в контексте, а не списком",
    ],
    result: "Ребёнок не боится говорить и понимает речь на слух",
    review: "Сын учится во втором классе. Жутко боялся этот предмет. Тут сняли все зажимы, ребёнок счастлив — мы тоже.",
    reviewer: "Мама Максима, 8 лет",
  },
  {
    emoji: "☀️",
    tag: "Карточка 4",
    title: "Летний клуб — лучшее лето в жизни вашего ребёнка",
    subtitle: "Пока вы работаете, ваш ребёнок проживает приключение",
    items: [
      "Мастер-классы: гончарка, роспись, кулинария, эксперименты",
      "Поездки на море, прогулки, походы",
      "Квесты, тематические игры, вечерние костры",
      "Смены для детей 4–14 лет: малыши, школьники, подростки",
    ],
    result: null,
    review: "Это было ЛУЧШЕЕ лето! Можно ещё раз?",
    reviewer: "Ваня, 10 лет",
    badge: "⏰ Первая смена стартует 1 июня. Успейте приобрести со скидкой.",
  },
  {
    emoji: "💙",
    tag: "Карточка 5",
    title: "Домашняя атмосфера и индивидуальный подход",
    subtitle: "Мы любим детей, как своих — это чувствуется",
    items: [
      "Кто не ест лук — готовим без лука",
      "Кто боится громких звуков — предупреждаем заранее",
      "Кто сегодня грустит — обнимаем и поддерживаем",
      "Вкусное питание: безлактозное и безглютеновое по запросу",
      "Ежедневные отчёты, фото и видео из жизни садика",
    ],
    result: "Группы до 12 человек — воспитатель знает каждого",
    review: "Это не садик — это вторая семья. Воспитатели любят детей по-настоящему, это видно.",
    reviewer: "Мама Сони, 4 года",
    badge: null,
  },
];

export default function FeaturesSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <Section className="bg-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Наши программы</span>
          <h2 className="section-h2">Всё для развития<br />и счастья вашего ребёнка</h2>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feat-card">
              <div className="feat-emoji">{f.emoji}</div>
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
              {f.badge && (
                <div className="feat-badge">{f.badge}</div>
              )}
            </div>
          ))}
        </div>
        <div className="reviews-cta">
          <button className="cta-btn cta-btn-primary" onClick={onOpenModal}>
            Записаться на экскурсию
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}