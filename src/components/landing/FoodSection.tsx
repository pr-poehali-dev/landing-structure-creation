import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";

// ── FoodSection (блок «Питание») ───────────────────────────────────────────

const MENU_DAYS = [
  {
    day: "Понедельник",
    meals: [
      {
        time: "8:30",
        name: "Завтрак",
        dishes: ["Каша манная молочная", "Бутерброд с маслом и сыром", "Чай"],
      },
      {
        time: "10:30",
        name: "Второй завтрак",
        dishes: ["Запечённое яблоко с сахарной пудрой"],
      },
      {
        time: "12:30",
        name: "Обед",
        dishes: ["Борщ на говяжьем бульоне со сметаной", "Каша булгур с мясной подливой из курицы", "Салат из тёртой моркови", "Напиток из шиповника"],
      },
      {
        time: "15:30",
        name: "Полдник",
        dishes: ["Булочка со штрейзельной крошкой", "Чай с молоком"],
      },
    ],
  },
  {
    day: "Среда",
    meals: [
      {
        time: "8:30",
        name: "Завтрак",
        dishes: ["Каша молочная овсяная", "Запеканка из творога", "Чай"],
      },
      {
        time: "10:30",
        name: "Второй завтрак",
        dishes: ["Сок яблочный"],
      },
      {
        time: "12:30",
        name: "Обед",
        dishes: ["Суп овощной", "Плов с мясом индейки", "Салат из отварной свёклы", "Компот из сухофруктов"],
      },
      {
        time: "15:30",
        name: "Полдник",
        dishes: ["Пирожок с повидлом", "Чай"],
      },
    ],
  },
  {
    day: "Пятница",
    meals: [
      {
        time: "8:30",
        name: "Завтрак",
        dishes: ["Макароны с тёртым сыром", "Отварное яйцо", "Хлеб с маслом", "Чай"],
      },
      {
        time: "12:30",
        name: "Обед",
        dishes: ["Суп вермишелевый на курином бульоне", "Картофельное пюре с тефтелями", "Свежий огурец", "Чай с лимоном"],
      },
      {
        time: "15:30",
        name: "Полдник",
        dishes: ["Блины со сливочным маслом", "Чай с молоком"],
      },
    ],
  },
];

const NORMS = [
  { icon: "Salad", label: "Соответствие СанПиН 2.3/2.4.3590-20", desc: "Меню разработано по нормам питания для дошкольников" },
  { icon: "Scale", label: "Контроль калорийности", desc: "1400–1700 ккал в день в соответствии с возрастом 3–7 лет" },
  { icon: "Wheat", label: "Витамины и микроэлементы", desc: "Разнообразное меню обеспечивает суточную норму белков, жиров и углеводов" },
  { icon: "Droplets", label: "Питьевой режим", desc: "Вода без ограничений, соки и морсы по расписанию" },
];

export default function FoodSection() {
  const [activeDay, setActiveDay] = useState(0);
  const day = MENU_DAYS[activeDay];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <Section id="food" className="bg-cream">
      <div className="container">

        {/* Заголовок */}
        <div className="section-header">
          <span className="section-tag">Питание</span>
          <h2 className="section-h2">Вкусно, полезно<br />и по всем нормам</h2>
          <p className="food-subtitle">
            Арендуем производственную линию у проверенного комбината питания —<br />
            блюда готовятся строго по нашему утверждённому меню и доставляются свежими каждый день.
          </p>
        </div>

        {/* Меню + Видео */}
        <div className="food-top">

          {/* Меню */}
          <div className="food-menu">
            <div className="food-menu-title">
              <Icon name="UtensilsCrossed" size={18} />
              Примерное меню (3 дня)
            </div>
            <div className="food-day-tabs">
              {MENU_DAYS.map((d, i) => (
                <button
                  key={i}
                  className={`food-day-tab ${activeDay === i ? "food-day-active" : ""}`}
                  onClick={() => setActiveDay(i)}
                >
                  {d.day}
                </button>
              ))}
            </div>
            <div className="food-meals">
              {day.meals.map((meal, i) => (
                <div key={i} className="food-meal">
                  <div className="food-meal-time">{meal.time}</div>
                  <div className="food-meal-body">
                    <div className="food-meal-name">{meal.name}</div>
                    <ul className="food-meal-list">
                      {meal.dishes.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Видео */}
          <div className="food-video-block">
            <div className="food-video-title">
              <Icon name="Play" size={18} />
              Посмотрите, как дети едят
            </div>
            <div className="food-video-wrap">
              <video
                ref={videoRef}
                src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/f1745ec5-c958-41e6-b901-140e9cd705dc.mp4"
                controls
                muted
                playsInline
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* Бракеражная комиссия */}
            <div className="food-brakerage">
              <div className="food-brakerage-icon">
                <Icon name="ShieldCheck" size={28} />
              </div>
              <div>
                <div className="food-brakerage-title">Бракеражная комиссия</div>
                <div className="food-brakerage-text">
                  В состав комиссии входят 3 человека — они снимают пробу с каждого блюда
                  <strong> за 1 час до выдачи детям</strong>. Еда поступает к детям только после проверки качества и температуры.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нормы */}
        <div className="food-norms">
          {NORMS.map((n, i) => (
            <div key={i} className="food-norm-card">
              <div className="food-norm-icon">
                <Icon name={n.icon} size={22} />
              </div>
              <div className="food-norm-label">{n.label}</div>
              <div className="food-norm-desc">{n.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
}