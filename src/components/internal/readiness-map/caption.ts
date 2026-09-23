import type { ReadinessMapData, VerdictKey } from "./types";

// ── buildDefaultCaption — готовый текст для сопровождения картинки карты
// готовности при пересылке маме в мессенджер (WhatsApp/Telegram) ───────────
const VERDICT_LINE: Record<VerdictKey, string> = {
  ready: "Малыш уже готов — в карте отметили сильные стороны и что поддержать напоследок.",
  "in-progress": "Мы в пути к готовности — в карте показали, на чём сфокусироваться в ближайший месяц.",
  starting: "Начинаем путь к готовности — в карте расписали первые шаги по месяцам.",
};

export function buildDefaultCaption(data: ReadinessMapData): string {
  const name = data.childName?.trim() || "вашего ребёнка";
  const verdictLine = data.verdict ? VERDICT_LINE[data.verdict] : "";
  const lines = [
    `Карта готовности ${name} к школе — во вложении 🎒`,
    verdictLine,
    "Посмотрите, пожалуйста: баллы по 7 направлениям, план на месяц и что делать дома.",
    "Будем рады обсудить подробнее на встрече!",
  ].filter(Boolean);
  return lines.join("\n");
}
