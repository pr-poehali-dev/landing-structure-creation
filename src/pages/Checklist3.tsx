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
    title: "Маркер 1: Тест на «зону ближайшего развития» (сложность программы)",
    bad: "«Мы даем программу 2 класса, чтобы ваш ребенок был лучшим».",
    good: "«Мы идем от простого к сложному, опираясь на уровень каждого ребенка. Если не получается — не ругаем, а объясняем по-другому».",
    why: "Программа «на вырост» ломает психику и отбивает желание учиться. Хорошая подготовка — это не гонка, а уверенный рост без стресса.",
  },
  {
    title: "Маркер 2: Правило «трех навыков важнее прописей»",
    bad: "«Мы пишем прописи по 2 часа в день, ребенок должен уметь читать к 1 сентября».",
    good: "«Мы учимся слушать учителя, удерживать внимание 20 минут и не бояться задавать вопросы. Буквы и цифры — это следствие, а не цель».",
    why: "Учитель в 1 классе ценит не скорость чтения, а умение сидеть на уроке, слышать инструкцию и не бояться ошибаться. Это и есть настоящая готовность к школе.",
  },
  {
    title: "Маркер 3: Математика выгорания (когда начинать)",
    bad: "«Приходите в мае, за лето всё выучите».",
    good: "«Начинать нужно в сентябре. За 9 месяцев ребенок спокойно освоит программу без рывков и слез. 2 месяца — это путь к неврозу».",
    why: "Мозг дошкольника не способен «выучить всё за лето». Равномерная нагрузка в течение года дает устойчивый результат, а спринт перед школой — выгорание к ноябрю.",
  },
  {
    title: "Маркер 4: Тест на «осознанную дисциплину» (порядок без палки)",
    bad: "«У нас строгая дисциплина, как в школе. Сиди смирно, не разговаривай».",
    good: "«Мы учим детей понимать, зачем нужны правила. Не через страх, а через интерес и уважение к процессу».",
    why: "«Палочная дисциплина» работает, пока учитель смотрит. Осознанная дисциплина — когда ребенок сам понимает, зачем сидеть тихо — остается с ним навсегда и лучше готовит к реальной школе.",
  },
  {
    title: "Маркер 5: Признак «живого интереса» (как понять, что ребенку не скучно и не слишком сложно)",
    bad: "Ребенок приходит домой молчаливый, говорит «не знаю, что делали», отказывается делать домашку.",
    good: "Ребенок рассказывает, что нового узнал, показывает поделки, сам просит почитать или порисовать.",
    why: "Если подготовка к школе вызывает сопротивление — значит, она идет против природы ребенка. Хорошая программа зажигает, а не гасит любопытство.",
  },
];

export default function Checklist3() {
  useSeo(
    "Школа без невроза — чек-лист для родителей | «Рыбка Долли»",
    "Как выбрать подготовку к школе, которая не отобьет желание учиться. Чек-лист от детского центра «Рыбка Долли»."
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
          ШКОЛА БЕЗ НЕВРОЗА: как выбрать подготовку, которая не отобьет
          желание учиться
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
          И почему начинать за 2 месяца до школы — это ошибка, которая стоит
          вам детских слез в октябре
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
            💡 Главный секрет: Подготовка к школе — это не про «научить
            читать и писать». Это про то, чтобы ребенок шел в 1 класс с
            горящими глазами, а не со страхом. Если после занятий ваш ребенок
            спрашивает «а завтра снова пойдем?» — вы выбрали правильное
            место.
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