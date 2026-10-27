import { createFileRoute } from "@tanstack/react-router";
import Checklist2 from "@/pages/Checklist2";

export const Route = createFileRoute("/checklist-2")({
  head: () => ({
    meta: [
      { title: "Детектор лжи для мамы — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "5 скрытых признаков, что в группе безопасно, а педагоги не кричат. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Детектор лжи для мамы — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "5 скрытых признаков, что в группе безопасно, а педагоги не кричат. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist2,
});
