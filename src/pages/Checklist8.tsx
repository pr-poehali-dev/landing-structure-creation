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
    title: "Маркер 1: Метод «контейнирования» вместо запретов",
    bad: "«Прекрати немедленно!», «Мальчики не плачут», «Сейчас как дам, сразу перестанешь».",
    good: "Педагог опускается на уровень глаз и спокойно говорит: «Я вижу, тебе очень обидно/грустно. Я побуду с тобой, пока ты не успокоишься».",
    why: "Запрет на слезы ломает психику. «Контейнирование» (когда взрослый спокойно принимает детские эмоции) учит ребенка тому, что его чувства важны, и помогает справиться со стрессом.",
  },
  {
    title: "Маркер 2: Сказкотерапия как мягкий инструмент",
    bad: "Сухие нотации, чтение морали или игнорирование эмоциональных проблем ребенка.",
    good: "Мы активно используем сказкотерапию. Через истории и метафоры ребенок безопасно проживает сложные ситуации (страх, гнев, ревность), находя решения вместе с героями сказки.",
    why: "Дети не воспринимают прямые нравоучения, но отлично усваивают уроки через сказку. Это самый экологичный способ проработки внутренних конфликтов.",
  },
  {
    title: "Маркер 3: Игры на эмоциональный интеллект (для детей 4–6 лет)",
    bad: "Эмоции считаются «детскими капризами», с которыми не работают целенаправленно.",
    good: "С детьми 4–6 лет мы проводим специальные игры, где в безопасном формате они учатся распознавать свои чувства (гнев, радость, страх) и экологично их выражать, не разрушая всё вокруг.",
    why: "Умение назвать свою эмоцию («я злюсь», а не кидать кубик) — это первый шаг к самоконтролю. Мы даем детям этот мощный инструмент для жизни.",
  },
  {
    title: "Маркер 4: Разрешение конфликтов через диалог",
    bad: "«Кто первый начал? Оба в угол!» или «Мальчики, не деритесь!».",
    good: "Педагог выступает миротворцем: «Я вижу, вы оба злитесь. Давайте скажем друг другу словами, что не так, и придумаем, как помириться».",
    why: "Крик и наказания учат детей бояться, а не понимать свои эмоции. Медиация конфликтов — это навык, который останется с ребенком на всю жизнь.",
  },
  {
    title: "Маркер 5: Партнерство с родителями",
    bad: "Садик скрывает истерики или обвиняет родителей в «испорченности» ребенка.",
    good: "Мы честно рассказываем, как прошел день, и даем мягкие рекомендации, как реагировать на эмоции дома, чтобы не закреплять негативные сценарии.",
    why: "Мы работаем в одной команде с семьей. Единая стратегия поведения дома и в саду дает самый быстрый и устойчивый результат.",
  },
];

export default function Checklist8() {
  useSeo(
    "Истерика как запрос — чек-лист для родителей | «Рыбка Долли»",
    "5 признаков того, что в саду умеют работать с эмоциями, а не подавлять их. Чек-лист от детского центра «Рыбка Долли»."
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
          ИСТЕРИКА КАК ЗАПРОС: 5 признаков того, что в саду умеют работать с
          эмоциями, а не подавлять их
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
          И как наши педагоги превращают «не хочу!» в «я справлюсь!» с
          помощью сказкотерапии и игры
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
            💡 Главный секрет: Истерика — это не манипуляция, а крик о помощи
            или неумение выразить чувство словами. Если вы видите, что
            педагоги не боятся детских слез, не кричат в ответ, а помогают
            прожить эмоцию через сказку или игру — ваш ребенок находится в
            самых надежных и любящих руках.
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
