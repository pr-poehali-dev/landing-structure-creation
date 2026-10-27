import { createFileRoute } from "@tanstack/react-router";
import PhotoPolicy from "@/pages/PhotoPolicy";

export const Route = createFileRoute("/photo-policy")({
  head: () => ({
    meta: [
      { title: "Как мы снимаем и публикуем детей — ДДЦ «Рыбка Долли»" },
      { name: "description", content: "Памятка для родителей: правила фото- и видеосъёмки детей в ДДЦ «Рыбка Долли». Публикация только с письменного согласия родителей." },
      { property: "og:title", content: "Как мы снимаем и публикуем детей — ДДЦ «Рыбка Долли»" },
      { property: "og:description", content: "Памятка для родителей: правила фото- и видеосъёмки детей в ДДЦ «Рыбка Долли». Публикация только с письменного согласия родителей." },
    ],
  }),
  component: PhotoPolicy,
});
