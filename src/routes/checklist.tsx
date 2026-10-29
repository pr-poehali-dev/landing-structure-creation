import { createFileRoute } from "@tanstack/react-router";
import Checklist from "@/pages/Checklist";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Тайная анатомия цены — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "7 неочевидных маркеров того, что частный центр действительно стоит своих денег. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Тайная анатомия цены — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "7 неочевидных маркеров того, что частный центр действительно стоит своих денег. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist,
});
