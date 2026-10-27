import { createFileRoute } from "@tanstack/react-router";
import Checklist7 from "@/pages/Checklist7";

export const Route = createFileRoute("/checklist-7")({
  head: () => ({
    meta: [
      { title: "Не просто игры — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "5 причин, почему наша ежедневная программа заменяет кружки. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Не просто игры — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "5 причин, почему наша ежедневная программа заменяет кружки. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist7,
});
