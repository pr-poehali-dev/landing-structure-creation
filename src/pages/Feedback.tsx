import { useState } from "react";
import { useSeo } from "@/lib/useSeo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { formatPhoneInput, isPhoneComplete, normalizePhoneForCrm } from "@/lib/phone";

const SEND_FEEDBACK_URL = "https://functions.poehali.dev/8d437c2a-0615-4525-9ca4-0eda4e314c84";
const LOGO_URL = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png";

const REASON_OPTIONS = [
  "Просто присматриваемся, нужно время подумать",
  "Не совсем подошел график или дни посещения",
  "Финансовый вопрос (стоимость абонемента)",
  "Ребенок пока не готов / нужно больше времени на адаптацию",
  "Другое (напишите, нам правда важно знать)",
];

const RATING_OPTIONS = [
  {
    value: "⭐⭐⭐ Всё было великолепно! Было очень радушно, вежливо и ответили на все вопросы.",
    stars: "⭐⭐⭐",
    text: "Всё было великолепно! Было очень радушно, вежливо и ответили на все вопросы.",
  },
  {
    value: "⭐ Было неплохо, но не хватило немного внимания или подробностей.",
    stars: "⭐",
    text: "Было неплохо, но не хватило немного внимания или подробностей.",
  },
  {
    value: "⭐ Было некомфортно / остались вопросы, на которые не получили ответа.",
    stars: "⭐",
    text: "Было некомфортно / остались вопросы, на которые не получили ответа.",
  },
];

async function sendFeedback(payload: {
  reason: string;
  reasonOther: string;
  rating: string;
  missing: string;
  phone: string;
}) {
  await fetch(SEND_FEEDBACK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default function Feedback() {
  useSeo(
    "Анкета обратной связи — ДДЦ «Рыбка Долли»",
    "Поделитесь впечатлением о визите в детский центр «Рыбка Долли». Это займёт 1 минуту."
  );

  const [reason, setReason] = useState("");
  const [reasonOther, setReasonOther] = useState("");
  const [rating, setRating] = useState("");
  const [missing, setMissing] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isOtherSelected = reason === REASON_OPTIONS[4];
  const phoneValid = isPhoneComplete(phone);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!phoneValid) return;

    setLoading(true);
    await sendFeedback({
      reason,
      reasonOther: isOtherSelected ? reasonOther : "",
      rating,
      missing,
      phone: normalizePhoneForCrm(phone),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <div
      className="min-h-screen w-full p-5 md:p-10 print:bg-white print:p-4"
      style={{
        backgroundColor: "#FDF5E6",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.6,
        color: "#1A2A3A",
      }}
    >
      <div className="mx-auto w-full max-w-[640px]">
        {/* Двойная рамка вокруг всего контента */}
        <div
          className="print:border-none print:p-0"
          style={{ border: "2px solid #006D77", borderRadius: 20, padding: 6 }}
        >
          <div
            className="print:border-none"
            style={{ border: "1px solid #E85D04", borderRadius: 14, padding: "24px 20px" }}
          >
            <div className="flex justify-center mb-3 print:mb-3">
              <img
                src={LOGO_URL}
                alt="Рыбка Долли"
                style={{ height: 80, width: 80, objectFit: "contain" }}
                className="print:h-16 print:w-16"
              />
            </div>

            {!done ? (
              <>
                <h1
                  className="text-center px-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 32,
                    color: "#006D77",
                    lineHeight: 1.25,
                  }}
                >
                  Ваше мнение помогает нам становиться лучше 🌱
                </h1>
                <p
                  className="text-center flex items-center justify-center gap-2"
                  style={{
                    color: "#006D77",
                    fontSize: 21,
                    fontStyle: "italic",
                    fontWeight: 600,
                    margin: "16px 0",
                  }}
                >
                  <span aria-hidden="true">🐠〜</span>
                  Благодарим вас за визит в детский центр «Рыбка Долли»
                  <span aria-hidden="true">〜🐠</span>
                </p>

                <div
                  className="mb-5 print:text-[110%]"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: "#1A2A3A",
                    background: "#FAF3E8",
                    border: "1px solid rgba(0,109,119,0.18)",
                    borderRadius: 12,
                    padding: 24,
                  }}
                >
                  <div className="text-center mb-2" style={{ fontSize: 24 }}>💌</div>
                  <p className="mb-3">
                    Добрый день! Благодарим вас за визит в детский центр «Рыбка Долли». Нам было{" "}
                    <strong style={{ color: "#E85D04" }}>очень приятно познакомиться</strong> с
                    вами и вашим ребенком.
                  </p>
                  <hr style={{ border: "none", borderTop: "2px solid #006D77", width: 40, margin: "12px auto" }} />
                  <p>
                    Мы постоянно совершенствуем наши программы и сервис, чтобы пространство центра
                    было максимально комфортным и развивающим для детей. Эта анкета попадает{" "}
                    <strong style={{ color: "#E85D04" }}>напрямую к руководству центра</strong>, и мы{" "}
                    <strong style={{ color: "#E85D04" }}>внимательно читаем каждый ответ</strong>.
                    Для нас нет неважных деталей. Если что-то смутило, не понравилось или вы просто
                    сомневаетесь — напишите об этом честно.{" "}
                    <strong style={{ color: "#E85D04" }}>Мы ценим вашу открытость!</strong>
                  </p>
                  <hr style={{ border: "none", borderTop: "2px solid #006D77", width: 40, margin: "12px auto" }} />
                  <p>
                    Это займет{" "}
                    <strong style={{ color: "#E85D04" }}>ровно 1 минуту</strong>. А в благодарность
                    за уделенное время команда «Рыбки Долли»{" "}
                    <strong style={{ color: "#E85D04" }}>лично отправит вам</strong> один из наших
                    чек-листов, авторами которых являемся мы, созданных на основе многолетнего
                    опыта работы.
                  </p>
                  <p
                    className="text-center mt-4"
                    style={{ color: "#006D77", fontStyle: "italic", fontWeight: 600 }}
                  >
                    С заботой, команда «Рыбки Долли» 🐠
                  </p>
                </div>

                <form
                  onSubmit={submit}
                  className="bg-white print:shadow-none print:border print:border-gray-300"
                  style={{
                    width: "100%",
                    padding: 28,
                    borderRadius: 16,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Вопрос 1 */}
                  <div className="mb-6">
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#006D77",
                      }}
                      className="mb-3"
                    >
                      Что стало основным фактором в вашем решении пока не оформлять абонемент?
                    </h2>
                    <RadioGroup value={reason} onValueChange={setReason} className="gap-3">
                      {REASON_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-start gap-3 cursor-pointer"
                          style={{ fontSize: 15, color: "#1A2A3A" }}
                        >
                          <RadioGroupItem
                            value={opt}
                            className="mt-1 shrink-0"
                            style={{ borderColor: "#E85D04", color: "#E85D04" }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </RadioGroup>
                    {isOtherSelected && (
                      <Textarea
                        value={reasonOther}
                        onChange={(e) => setReasonOther(e.target.value)}
                        placeholder="Напишите вашу причину..."
                        className="mt-3"
                        style={{ borderColor: "#E85D04", minHeight: 70 }}
                      />
                    )}
                  </div>

                  {/* Вопрос 2 */}
                  <div className="mb-6">
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#006D77",
                      }}
                      className="mb-1"
                    >
                      Оцените сотрудника, который проводил для вас экскурсию
                    </h2>
                    <p className="text-sm mb-3" style={{ color: "#5a6b78" }}>
                      Нам важно знать, было ли вам комфортно и тепло во время знакомства с центром.
                    </p>
                    <RadioGroup value={rating} onValueChange={setRating} className="gap-3">
                      {RATING_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-start gap-3 cursor-pointer"
                          style={{ fontSize: 15, color: "#1A2A3A" }}
                        >
                          <RadioGroupItem
                            value={opt.value}
                            className="mt-1 shrink-0"
                            style={{ borderColor: "#E85D04", color: "#E85D04" }}
                          />
                          <span>
                            <span style={{ color: "#F4A261", fontSize: 17 }}>{opt.stars}</span>{" "}
                            {opt.text}
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Вопрос 3 */}
                  <div className="mb-6">
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#006D77",
                      }}
                      className="mb-1"
                    >
                      Чего вам не хватило во время визита, чтобы принять решение сразу?
                    </h2>
                    <p className="text-sm mb-3" style={{ color: "#5a6b78" }}>
                      Любая деталь: от атмосферы в группе до конкретного ответа на ваш вопрос. Мы
                      ценим любую честность!
                    </p>
                    <Textarea
                      value={missing}
                      onChange={(e) => setMissing(e.target.value)}
                      style={{ minHeight: 120, borderColor: "#006D77" }}
                    />
                  </div>

                  {/* Вопрос 4 */}
                  <div className="mb-6 print:hidden">
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#006D77",
                      }}
                      className="mb-1"
                    >
                      Ваш номер телефона (MAX/WhatsApp/Telegram)
                    </h2>
                    <p className="text-sm mb-3" style={{ color: "#5a6b78" }}>
                      Чтобы мы могли лично отправить вам обещанный чек-лист и персональное предложение
                      от центра
                    </p>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                      style={{
                        borderColor: submitAttempted && !phoneValid ? "#E85D04" : "#006D77",
                        fontSize: 16,
                        color: "#1A2A3A",
                      }}
                    />
                    {submitAttempted && !phoneValid && (
                      <p className="text-sm mt-1" style={{ color: "#E85D04" }}>
                        Допишите номер телефона целиком
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full print:hidden transition-opacity hover:opacity-90 disabled:opacity-70"
                    style={{
                      backgroundColor: "#E85D04",
                      color: "#FFFFFF",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      height: 56,
                      borderRadius: 10,
                      fontSize: 15,
                      letterSpacing: 0.5,
                    }}
                  >
                    {loading ? "Отправляем..." : "Отправить и получить подарок"}
                  </button>
                </form>

                <div
                  className="mt-5 text-center"
                  style={{
                    backgroundColor: "#006D77",
                    color: "#FFFFFF",
                    borderRadius: 16,
                    padding: "20px 24px",
                    fontSize: 15,
                  }}
                >
                  🎁 В благодарность за уделенное время команда «Рыбки Долли» лично отправит вам один
                  из наших чек-листов, авторами которых являемся мы, созданных на основе
                  многолетнего опыта работы.
                </div>
              </>
            ) : (
              <div
                className="bg-white text-center"
                style={{
                  width: "100%",
                  padding: 40,
                  borderRadius: 16,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  className="mx-auto mb-4 flex items-center justify-center rounded-full"
                  style={{ width: 72, height: 72, backgroundColor: "#2E8B57" }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: 36 }}>✓</span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#006D77",
                  }}
                  className="mb-3"
                >
                  Спасибо за вашу искренность!
                </h2>
                <p style={{ fontSize: 16, color: "#1A2A3A" }}>
                  Ваш ответ получен и передан руководству центра. В течение 24 часов мы лично
                  отправим вам обещанный чек-лист на указанный номер телефона.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}