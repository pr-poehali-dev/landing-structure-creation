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
    title: "Маркер 1: Скука как начало настоящего творчества",
    bad: "При первых признаках скуки ребенку сразу включают мультики или дают планшет, чтобы он «не мешал».",
    good: "Педагог экологично сопровождает момент скуки: «Я вижу, ты не знаешь, чем заняться. Давай посмотрим, что у нас есть в этой коробке?». Скука — это искра, из которой рождается самостоятельная игра.",
    why: "Гаджет убивает способность развлекать себя самостоятельно. Мы учим ребенка опираться на собственную фантазию, а не на готовый контент из интернета.",
  },
  {
    title: "Маркер 2: Разрушаем миф о «развивающих мультиках»",
    bad: "Вера в то, что «развивающие мультики» учат ребенка лучше, чем живое общение, и использование обучающих приложений на экране.",
    good: "Сказки о развивающих мультфильмах — это абсолютный миф. Приоритет отдается настоящим дидактическим материалам. Только через руки, ощупывая фактуру и вес предмета, ребенок действительно запоминает и развивает нейронные связи.",
    why: "Мозг дошкольника не может полноценно развиваться через плоский стеклянный экран. Тактильность и живое взаимодействие с миром — фундамент интеллекта.",
  },
  {
    title: "Маркер 3: Социальный интеллект вживую, а не в чате",
    bad: "Дети играют рядом, но каждый в своем устройстве, не взаимодействуя друг с другом.",
    good: "Мы создаем ситуации, где детям нужно договориться: распределить роли в сюжетной игре, поделиться материалом, вместе построить башню.",
    why: "Эмпатия, умение читать эмоции по лицу и разрешать конфликты словами формируются только в живом общении со сверстниками и взрослыми.",
  },
  {
    title: "Маркер 4: Строгий запрет на «телевизор вместо няни»",
    bad: "Даже в государственных садах детям часто включают мультфильмы на час и больше, просто чтобы воспитатель мог отдохнуть от большой группы.",
    good: "У нас это строго запрещено! Проектор используется исключительно в обучающих целях и только дозированно. Наши педагоги владеют набором авторских игр, многие из которых мы разработали сами и которые увлекают детей сильнее любого YouTube.",
    why: "Живая игра дает здоровый дофамин от преодоления и успеха. Мы никогда не используем экран как способ «отвязаться» от детей.",
  },
  {
    title: "Маркер 5: Помощь родителям в экологичном переходе",
    bad: "Садик никак не комментирует тему гаджетов, оставляя родителей один на один с истериками из-за отобранного телефона.",
    good: "Мы делимся с родителями простыми ритуалами: как заменить вечерний мультик на совместную игру, как создать дома «зону без экранов» и как мягко сокращать время у гаджетов без слез.",
    why: "Мы работаем в партнерстве с семьей. Наша цель — не осудить за использование телефона, а дать работающие инструменты для здорового цифрового баланса дома.",
  },
];

export default function Checklist5() {
  useSeo(
    "Цифровой детокс — чек-лист для родителей | «Рыбка Долли»",
    "Как мы возвращаем детям вкус к реальной игре. Чек-лист от детского центра «Рыбка Долли»."
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
          ЦИФРОВОЙ ДЕТОКС: как мы возвращаем детям вкус к реальной игре
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
          И почему в «Рыбке Долли» нет экранов вместо воспитания, но есть
          настоящий восторг и развитие
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
            💡 Главный секрет: Гаджеты дают быстрое развлечение, но не
            развивают мозг. Настоящее развитие происходит через руки, глаза и
            живое общение. Если после сада ваш ребенок увлеченно строит башню
            из кубиков или придумывает историю с игрушками, а не сразу
            требует телефон — значит, мы всё делаем правильно.
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
