import { createFileRoute } from "@tanstack/react-router";
import Checklist6 from "@/pages/Checklist6";

export const Route = createFileRoute("/checklist-6")({
  head: () => ({
    meta: [
      { title: "Говорит или молчит? — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "7 неочевидных признаков речевой нормы в 2–3 года. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Говорит или молчит? — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "7 неочевидных признаков речевой нормы в 2–3 года. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist6,
});
