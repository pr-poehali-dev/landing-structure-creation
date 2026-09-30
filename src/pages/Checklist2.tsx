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
    title: "Маркер 1: Тест на «эмоциональный вечер»",
    bad: "Вы спрашиваете «Что ты ел?» или «С кем играл?», а ребенок молчит или говорит «не знаю».",
    good: "Вы спрашиваете «Что тебя сегодня рассмешило?» или «Кто сегодня был самым грустным?», и ребенок охотно делится деталями.",
    why: "Вопросы про еду вызывают стресс и ассоциации с отчетом. Вопросы про эмоции открывают диалог. Если ребенок делится чувствами — значит, в саду его учат их распознавать и не подавляют.",
  },
  {
    title: "Маркер 2: Правило «мягкого входа» в коллектив",
    bad: "«Пусть сам разбирается, он должен научиться дружить».",
    good: "Педагог (или психолог) мягко «подводит» новенького к играм, сам предлагает детям познакомиться и помогает разрешить первые споры.",
    why: "Дети 3-5 лет еще не умеют экологично вливаться в коллектив. Без помощи взрослого «новенький» может замкнуться или стать изгоем.",
  },
  {
    title: "Маркер 3: Маркер «невидимых границ» (Решение конфликтов)",
    bad: "«Кто первый начал? Оба в угол!», «Мальчики, не деритесь!».",
    good: "Педагог опускается на уровень глаз, разводит детей и говорит: «Я вижу, вы оба злитесь. Давайте скажем друг другу словами, что не так».",
    why: "Крик и наказания учат детей бояться, а не понимать свои эмоции. Медиация конфликтов — это навык, который останется с ребенком на всю жизнь.",
  },
  {
    title: "Маркер 4: Тест на «вторую добавку без уговоров»",
    bad: "«Пока не съешь суп, из-за стола не выйдешь», «Ложечку за маму, ложечку за папу».",
    good: "«Не хочешь суп? Хорошо. Тогда съешь котлету с хлебом или яблоко. Главное — чтобы ты не был голодным».",
    why: "Давление за столом формирует расстройства пищевого поведения. Уважение к чувству сытости ребенка — маркер современного и безопасного садика.",
  },
  {
    title: "Маркер 5: Признак «психологической безопасности» (Истерики и слезы)",
    bad: "«Прекрати немедленно!», «Мальчики не плачут», «Сейчас как дам, сразу перестанешь».",
    good: "Педагог обнимает или просто находится рядом: «Я вижу, тебе очень грустно/обидно. Я побуду с тобой, пока ты не успокоишься».",
    why: "Запрет на слезы ломает психику. «Контейнирование» эмоций (когда взрослый спокойно принимает детские слезы) учит ребенка справляться со стрессом самостоятельно в будущем.",
  },
];

export default function Checklist2() {
  useSeo(
    "Детектор лжи для мамы — чек-лист для родителей | «Рыбка Долли»",
    "5 скрытых признаков, что в группе безопасно, а педагоги не кричат. Чек-лист от детского центра «Рыбка Долли»."
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
          ДЕТЕКТОР ЛЖИ ДЛЯ МАМЫ: 5 скрытых признаков, что в группе безопасно,
          а педагоги не кричат
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
          И как понять, что ваш ребенок в надежных руках, даже когда вас нет
          рядом
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
            💡 Главный секрет: Безопасность в садике — это не только мягкие
            уголки на стенах и видеонаблюдение. Это то, как взрослые говорят с
            детьми, когда никто не смотрит. Если педагоги умеют слушать, не
            кричат и решают конфликты словами — ваш ребенок будет ходить туда
            с радостью.
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
