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
    title: "Маркер 1: Плавный сдвиг режима (без боли)",
    bad: "Резко будить ребенка на час раньше за 2 дня до сада. Это гарантированный стресс и капризы.",
    good: "За неделю до старта сдвигаем подъем и отбой всего на 10-15 минут в день. К первому дню в саду организм уже будет жить по новому графику.",
    why: "Сонный ребенок не способен адаптироваться. Выспавшийся малыш гораздо легче переживает любые перемены.",
  },
  {
    title: "Маркер 2: Ритуал прощания (Правильные слова)",
    bad: "«Я сейчас приду», «Не плачь, я заберу», или убегать тайком, пока ребенок отвлекся.",
    good: "Четкая, уверенная фраза: «Я заберу тебя после обеда. Пока-пока, я тебя люблю!» — и быстрый уход без долгих объятий у двери.",
    why: "Дети считывают тревогу. Если мама мнется и плачет, ребенок понимает: «Здесь опасно!». Уверенное прощание дает чувство безопасности.",
  },
  {
    title: "Маркер 3: «Якорь» из дома (Тайная поддержка)",
    bad: "Запрещать брать в сад любимую игрушку «чтобы не потерял» или не отвлекал.",
    good: "Положить в шкафчик любимую маленькую игрушку (машинку, мягкого зверька) или платочек с маминым запахом.",
    why: "Этот «якорь» дает ребенку опору в моменты грусти. Он может достать его и почувствовать связь с домом, даже когда мамы нет рядом.",
  },
  {
    title: "Маркер 4: Настройка мамы (Дети считывают всё)",
    bad: "Стоять у двери группы, подсматривать в окно, звонить воспитателю каждые 15 минут.",
    good: "Уверенная улыбка, спокойный голос, доверие к педагогам. Мама занимается своими делами и ждет времени забирать ребенка.",
    why: "Ваше спокойствие — главный фундамент его адаптации. Если вы доверяете саду, ребенок тоже начнет доверять.",
  },
  {
    title: "Маркер 5: Позитивный якорь на сад (Разведка боем)",
    bad: "Пугать садом («Вот пойдешь в сад, там тебя научат порядку!») или обещать золотые горы.",
    good: "Читать дома книжки про садик, играть в «садик» с игрушками, рассказывать, как вы сами ходили в сад и как это было интересно.",
    why: "Садик должен ассоциироваться с увлекательным приключением, а не с наказанием или неизвестностью.",
  },
  {
    title: "Маркер 6: Бытовая самостоятельность (Фундамент уверенности)",
    bad: "Делать всё за ребенка дома, чтобы «было быстрее и чище».",
    good: "Учимся сами держать ложку, пить из чашки, натягивать простые штаны и сообщать взрослым о своих потребностях («Я хочу в туалет»).",
    why: "Когда ребенок умеет сам себя обслужить, он чувствует себя в группе уверенно и независимо. Это колоссально снижает стресс.",
  },
  {
    title: "Маркер 7: Правило мягкой адаптации",
    bad: "В первый же день оставить ребенка на полный день «пусть сразу привыкает».",
    good: "Первые дни ребенок остается на полдня (до 12:00): он участвует в играх, гуляет, обедает вместе со всеми и уходит домой спать. Постепенно мы увеличиваем время пребывания.",
    why: "Психика малыша не готова к резкой сепарации на 8-10 часов. Постепенность и предсказуемость — залог того, что он полюбит сад, а не возненавидит его.",
  },
];

export default function Checklist9() {
  useSeo(
    "Чек-лист готовности к первому дню в саду | «Рыбка Долли»",
    "7 шагов к первому дню в саду без слез и стресса. Чек-лист от детского центра «Рыбка Долли»."
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
          ЧЕК-ЛИСТ ГОТОВНОСТИ: 7 шагов к первому дню в саду без слез и стресса
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
          Что нужно сделать за неделю до старта (и почему это важнее покупки
          новой формы)
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
            💡 Главный секрет: Идеальная готовность к саду — это не
            безупречная самостоятельность малыша и не знание всех правил. Это
            спокойная мама, выспавшийся ребенок и ваше искреннее доверие к
            педагогам. Если вы выполнили эти шаги, вы уже сделали всё, чтобы
            первый день стал началом большого и счастливого пути!
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
            методиках и педагогах. Заглядывайте в гости!
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
