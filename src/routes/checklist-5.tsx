import { createFileRoute } from "@tanstack/react-router";
import Checklist5 from "@/pages/Checklist5";

export const Route = createFileRoute("/checklist-5")({
  head: () => ({
    meta: [
      { title: "Цифровой детокс — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "Как мы возвращаем детям вкус к реальной игре. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Цифровой детокс — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "Как мы возвращаем детям вкус к реальной игре. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist5,
});
