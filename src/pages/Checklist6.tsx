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
    title: "Маркер 1: Тест на «пассивный словарь» (понимание)",
    bad: "«Он не говорит, значит, ничего не понимает и отстает в развитии».",
    good: "Ребенок выполняет сложные инструкции («Принеси красный мячик и положи на стул»), показывает части тела или предметы по просьбе, хотя сам молчит.",
    why: "Понимание речи всегда опережает говорение. Если пассивный словарь богат, «речевой взрыв» случится просто чуть позже. Это вариант нормы, а не патология.",
  },
  {
    title: "Маркер 2: Невербальная коммуникация (жесты и взгляд)",
    bad: "Ребенок не смотрит в глаза, не указывает пальцем на желаемое, а просто плачет или тянет взрослого за руку как инструмент.",
    good: "Ребенок активно использует указательный жест, кивает, мотает головой, устанавливает зрительный контакт и «зовет» взглядом, чтобы разделить эмоцию.",
    why: "Жест и взгляд — это фундамент речи. Если эта база есть, слова обязательно появятся. Мы в саду поощряем и озвучиваем эти жесты («А, ты хочешь эту машинку!»).",
  },
  {
    title: "Маркер 3: Сила окружения (эффект «снежного кома»)",
    bad: "Ребенок находится дома один или только со взрослыми, и ему просто не с кого брать пример живой детской речи.",
    good: "В нашей группе уже есть говорящие дети. Их игровой азарт, песни и общение естественным образом стимулируют «молчунов» заговорить. В коллективе речь «заразна» в самом лучшем смысле.",
    why: "Подражание сверстникам — мощнейший двигатель развития. Там, где один ребенок стесняется говорить с взрослым, он может повторить слово за другом в игре.",
  },
  {
    title: "Маркер 4: Системный подход и спец. оборудование",
    bad: "Развитие речи пускается на самотек или проводится только по отдельному запросу родителей за доп. плату.",
    good: "У нас ежедневные групповые занятия по развитию речи. Мы оснащены специальными современными тренажерами для говорения и активно используем их, делая запуск речи увлекательной игрой, а не скучной обязанностью.",
    why: "Регулярность и правильные инструменты решают всё. Мы не ждем чуда, мы создаем условия для его возникновения каждый день.",
  },
  {
    title: "Маркер 5: Метод «выбора без давления»",
    bad: "Педагог или родитель давит: «Скажи! Ну скажи слово! Повтори за мной!», вызывая у ребенка речевой негативизм и страх.",
    good: "Мы создаем ситуации, где ребенку выгодно заговорить. «Ты хочешь яблоко или банан?». Мы терпеливо ждем ответа, не подменяя его своими догадками.",
    why: "Давление блокирует речевые центры из-за стресса. Мотивация и интерес — лучшие стимуляторы речи.",
  },
  {
    title: "Маркер 6: Правило «речевого эха» (расширение фразы)",
    bad: "Взрослый игнорирует лепет ребенка или говорит с ним на его же «тарабарском» языке, не давая правильного образца.",
    good: "Если ребенок говорит «ба-ба», педагог тепло отвечает: «Да, это кукла! Большая красивая кукла». Мы мягко даем правильную речевую модель, не критикуя.",
    why: "Ребенок учится говорить, слыша правильную, эмоционально окрашенную речь взрослых, а не через исправление его ошибок.",
  },
  {
    title: "Маркер 7: Красные флаги (когда ждать уже нельзя)",
    bad: "Игнорирование тревожных сигналов: «Само пройдет», «Мальчики начинают говорить позже».",
    good: "Мы обращаем внимание родителей, если к 1,5–2 годам нет: реакции на имя, указательного жеста, лепета, подражания звукам или простым действиям.",
    why: "Честность и раннее выявление особенностей позволяют начать коррекцию вовремя. Мы не пугаем, но и не закрываем глаза, аккуратно рекомендуя специалистов при необходимости.",
  },
];

export default function Checklist6() {
  useSeo(
    "Говорит или молчит? — чек-лист для родителей | «Рыбка Долли»",
    "7 неочевидных признаков речевой нормы в 2–3 года. Чек-лист от детского центра «Рыбка Долли»."
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
          ГОВОРИТ ИЛИ МОЛЧИТ? 7 неочевидных признаков речевой нормы в 2–3
          года
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
          И когда пора бить тревогу, а когда — просто подождать и создать
          правильную среду
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
            💡 Главный секрет: Речь не развивается по команде «Раз, два, три,
            заговори!». Она расцветает в среде, где ребенка слышат, не
            торопят, где есть правильные инструменты и говорящие друзья. Если
            в «Рыбке Долли» ваш молчун постепенно начинает приносить вам
            «секреты» в виде новых слов — мы на верном пути.
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