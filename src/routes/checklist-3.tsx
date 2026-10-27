import { createFileRoute } from "@tanstack/react-router";
import Checklist3 from "@/pages/Checklist3";

export const Route = createFileRoute("/checklist-3")({
  head: () => ({
    meta: [
      { title: "Школа без невроза — чек-лист для родителей | «Рыбка Долли»" },
      { name: "description", content: "Как выбрать подготовку к школе, которая не отобьет желание учиться. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Школа без невроза — чек-лист для родителей | «Рыбка Долли»" },
      { property: "og:description", content: "Как выбрать подготовку к школе, которая не отобьет желание учиться. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist3,
});
