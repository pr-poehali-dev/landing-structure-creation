import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/useSeo";

const LOGO_URL = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png";

interface Marker {
  title: string;
  bad: string;
  good: string;
  why: ReactNode;
}

const MARKERS: Marker[] = [
  {
    title: "Маркер 1: Честный разговор об «инкубационном периоде»",
    bad: "«У нас в саду дети вообще не болеют!» (Это ложь, которая не готовит вас к реальности).",
    good: "Честное объяснение: «Вирусы невидимы. Бывает, что ребенок приходит в сад абсолютно бодрым и веселым — по всем признакам здоров. Но он уже является носителем вируса в инкубационном периоде. К обеду у него поднимается высокая температура, и мы, конечно, сразу изолируем его и звоним вам. Но за эти несколько часов он уже был в контакте с группой, и другие дети тоже могут заболеть».",
    why: "Мы не создаем иллюзий и не перекладываем вину. Мы объясняем: ребенок не заболел «из-за садика» — он пришел к нам уже с вирусом, просто симптомы проявились позже. Отстранить его утром мы не могли, потому что он был абсолютно здоров. Это нормальная часть иммунной тренировки: знакомство с новыми микробами в контролируемой, чистой среде учит иммунитет ребенка сопротивляться заболеваниям в будущем, делая его крепче.",
  },
  {
    title: "Маркер 2: Невидимая защита (технологии чистоты)",
    bad: "Уборка только «для галочки» или использование едкой хлорки, которая вызывает аллергии.",
    good: "Каждое утро (до прихода детей) комната и игрушки обрабатываются УФ-облучателем. В сезон простуд работают рециркуляторы закрытого типа. Регулярные сквозные проветривания во время прогулок.",
    why: (
      <>
        Мы не просто моем полы, мы создаем безопасную микросреду. Кстати, вы
        можете увидеть этот процесс в нашем видео{" "}
        <Link
          to="/#zakulisie"
          style={{ color: "#E85D04", textDecoration: "underline", fontStyle: "normal" }}
        >
          «Закулисье»
        </Link>{" "}
        на сайте!
      </>
    ),
  },
  {
    title: "Маркер 3: Строгий контроль здоровья команды",
    bad: "Педагоги приходят на работу «как есть», без проверок.",
    good: "Каждый сотрудник перед началом смены проходит строгий ежедневный медицинский контроль: проверка общих признаков заболевания, измерение температуры и давления.",
    why: "Здоровье детей начинается со здоровья взрослых. Мы исключаем любой риск того, что в группу придет человек с недомоганием. Это стандарт безопасности премиум-уровня.",
  },
  {
    title: "Маркер 4: Гигиена через личный пример, а не через принуждение",
    bad: "«Иди мой руки, потому что я так сказала!» или игнорирование правил самими взрослыми.",
    good: "Педагоги моют руки вместе с детьми, весело комментируя процесс. Гигиена прививается как естественная и приятная часть дня, а не как скучная обязанность.",
    why: "Дети копируют поведение взрослых. Когда педагог делает это с удовольствием, ребенок перенимает привычку без стресса и сопротивления.",
  },
  {
    title: "Маркер 5: Прозрачность и ценность (за что вы платите)",
    bad: "Садик обещает «полный перерасчет за каждый пропущенный день», а потом находит причины отказать.",
    good: "Мы честны: абонемент оплачивает работу нашей профессиональной команды, безопасность среды и развитие ребенка. Поэтому перерасчет делается только за питание (при предоставлении медицинской справки).",
    why: "Вы платите не за «койко-место», которое можно заморозить. Вы инвестируете в то, чтобы педагог вашего ребенка был мотивирован, обучен и готов к нему каждый день, независимо от посещаемости. Эта исключительность и качество стоят своих денег.",
  },
];

export default function Checklist4() {
  useSeo(
    "Иммунитет без паники — чек-лист для родителей | «Рыбка Долли»",
    "5 правил «неболеющего» ребенка в саду, о которых часто молчат. Чек-лист от детского центра «Рыбка Долли»."
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
          ИММУНИТЕТ БЕЗ ПАНИКИ: 5 правил «неболеющего» ребенка в саду, о
          которых часто молчат
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
          Почему частые заболевания в начале — это не угроза, а важная
          тренировка организма на будущее
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
            💡 Главный секрет: Наша цель — не создать стерильный вакуум, а
            подготовить иммунитет и психику вашего ребенка к реальной жизни.
            Когда вы видите, что мы честно говорим о болезнях, используем
            УФ-облучатели и ежедневно проверяем здоровье педагогов — вы
            понимаете, что ваш ребенок находится в самых надежных руках.
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