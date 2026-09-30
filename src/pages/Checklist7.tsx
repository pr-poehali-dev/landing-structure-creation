import { useSeo } from "@/lib/useSeo";

const LOGO_URL = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png";

interface Marker {
  title: string;
  bad: string;
  good: string;
  why: string;
}

const MARKERS: Marker[] = [
  {
    title: "Маркер 1: Система вместо хаоса",
    bad: "«Чем бы занять детей», отсутствие четкого расписания, спонтанные активности.",
    good: "У нас есть продуманная сетка ежедневных развивающих занятий: лепка, рисование, музыка, конструирование и развитие речи.",
    why: "Режим и предсказуемость дают ребенку чувство безопасности, а регулярность занятий гарантирует реальный прогресс, а не просто «убийство времени».",
  },
  {
    title: "Маркер 2: ФЭМП и логика с самых ранних лет",
    bad: "Математике учат только за партой в школе, считая это «скучным» для малышей.",
    good: "Мы формируем элементарные математические представления (ФЭМП) и логику в игре. Мы сравниваем понятия «один-много», «верх-низ», «право-лево», находим пары «мама-детеныш» и множество другого.",
    why: "Мозг ребенка впитывает эту информацию как губка, когда она подается через яркие, осязаемые предметы, а не через абстрактные прописи.",
  },
  {
    title: "Маркер 3: Фундамент правильной речи (даже для ясель)",
    bad: "Игнорирование техники речи, надежда на то, что «само наговорится».",
    good: "Мы регулярно работаем над речевым выдохом и слоговой структурой слова. Даже с малышами мы в игровой форме «прохлопываем» слоги, чтобы заложить правильный ритм речи.",
    why: "Умение правильно выдыхать и чувствовать ритм слова — это база, которая предотвращает множество логопедических проблем в будущем.",
  },
  {
    title: "Маркер 4: Специальное оборудование и дидактика",
    bad: "Использование только бытовых предметов или дешевых, быстро ломающихся игрушек.",
    good: "Мы оснащены специальными современными тренажерами для развития речи и качественными дидактическими пособиями, которые активно используем на занятиях.",
    why: "Правильные инструменты экономят время и делают процесс обучения увлекательным. То, что дома сделать сложно, у нас становится любимой игрой.",
  },
  {
    title: "Маркер 5: Социализация как важнейший навык",
    bad: "Ребенок умеет заниматься только один на один с мамой или репетитором.",
    good: "В группе ребенок учится слушать инструкцию педагога, ждать своей очереди, работать в команде и радоваться успехам других.",
    why: "Этот «мягкий навык» (soft skill) невозможно прокачать дома. Именно он становится главным залогом успешной и бесстрессовой адаптации к школе в будущем.",
  },
];

export default function Checklist7() {
  useSeo(
    "Не просто игры — чек-лист для родителей | «Рыбка Долли»",
    "5 причин, почему наша ежедневная программа заменяет кружки. Чек-лист от детского центра «Рыбка Долли»."
  );

  return (
    <div
      className="checklist-page min-h-screen w-full px-4 py-8 md:py-12 print:bg-white print:py-2"
      style={{
        backgroundColor: "#FDF5E6",
        fontFamily: "'Open Sans', sans-serif",
        color: "#1A2A3A",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 800 }}>
        <div className="flex justify-center mb-4 print:hidden">
          <img
            src={LOGO_URL}
            alt="Рыбка Долли"
            style={{ height: 100, width: 100, objectFit: "contain" }}
          />
        </div>

        <h1
          className="text-center px-1"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 5vw, 32px)",
            color: "#006D77",
            lineHeight: 1.3,
          }}
        >
          НЕ ПРОСТО ИГРЫ: 5 причин, почему наша ежедневная программа заменяет
          кружки
        </h1>

        <p
          className="text-center mt-3"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "#4A5568",
          }}
        >
          И как мы мягко, через игру, закладываем прочный фундамент для
          успешного развития
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "3px solid #E85D04",
            width: 60,
            margin: "20px auto 32px",
          }}
        />

        <div className="flex flex-col gap-5 md:gap-6 checklist-list">
          {MARKERS.map((m) => (
            <div
              key={m.title}
              className="bg-white print:shadow-none print:border print:border-gray-300 checklist-marker"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
                padding: "20px 16px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#E85D04",
                }}
                className="mb-3"
              >
                {m.title}
              </h2>

              <div className="flex flex-col gap-3">
                <div
                  className="flex items-start gap-2 checklist-bad"
                  style={{
                    background: "#FADBD8",
                    color: "#922B21",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  <span className="shrink-0">❌</span>
                  <span>{m.bad}</span>
                </div>
                <div
                  className="flex items-start gap-2 checklist-good"
                  style={{
                    background: "#D5F5E3",
                    color: "#1E8449",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  <span className="shrink-0">✅</span>
                  <span>{m.good}</span>
                </div>
              </div>

              <p
                className="mt-3"
                style={{
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "#4A5568",
                  borderLeft: "3px solid #E85D04",
                  paddingLeft: 12,
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ fontStyle: "normal", color: "#1A2A3A" }}>
                  Почему это важно:
                </strong>{" "}
                {m.why}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 print:mt-4 checklist-secret"
          style={{
            backgroundColor: "#006D77",
            color: "#FFFFFF",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            💡 Главный секрет: Мы не «учим через не хочу». Мы внедряем знания
            в естественную среду: учим цвета, сортируя кубики, и учим счет,
            накрывая на стол для кукол. Ребенок думает, что он просто играет,
            а на самом деле он получает мощную развивающую базу.
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            🌐 Хотите узнать больше?
            <br />
            На нашем сайте{" "}
            <a
              href="https://ribkadollilend.ru/"
              style={{ color: "#FFFFFF", textDecoration: "underline" }}
            >
              ribkadollilend.ru
            </a>{" "}
            мы подробно и с любовью рассказываем о жизни центра, наших
            педагогах и ежедневной программе. Заглядывайте в гости!
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            С любовью и заботой,
            <br />
            Команда «Рыбка Долли» 🐠
          </p>
        </div>

        <div className="flex justify-center mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#E85D04",
              color: "#FFFFFF",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: 15,
              padding: "16px 32px",
              borderRadius: 10,
            }}
          >
            Сохранить в PDF / Распечатать
          </button>
        </div>
      </div>
    </div>
  );
}
