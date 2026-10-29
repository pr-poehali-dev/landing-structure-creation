import { createFileRoute } from "@tanstack/react-router";
import Checklist8 from "@/pages/Checklist8";

export const Route = createFileRoute("/checklist-8")({
  head: () => ({
    meta: [
      { title: "Истерика как запрос — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "5 признаков того, что в центре умеют работать с эмоциями, а не подавлять их. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Истерика как запрос — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "5 признаков того, что в центре умеют работать с эмоциями, а не подавлять их. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist8,
});
