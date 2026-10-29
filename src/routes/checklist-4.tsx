import { createFileRoute } from "@tanstack/react-router";
import Checklist4 from "@/pages/Checklist4";

export const Route = createFileRoute("/checklist-4")({
  head: () => ({
    meta: [
      { title: "Иммунитет без паники — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "5 правил «неболеющего» ребенка в центре, о которых часто молчат. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Иммунитет без паники — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "5 правил «неболеющего» ребенка в центре, о которых часто молчат. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist4,
});
