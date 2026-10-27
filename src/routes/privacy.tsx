import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — ДДЦ «Рыбка Долли»" },
      { name: "description", content: "Политика конфиденциальности и обработки персональных данных ИП Савченко Ирина Игоревна (ДДЦ «Рыбка Долли»)." },
      { property: "og:title", content: "Политика конфиденциальности — ДДЦ «Рыбка Долли»" },
      { property: "og:description", content: "Политика конфиденциальности и обработки персональных данных ИП Савченко Ирина Игоревна (ДДЦ «Рыбка Долли»)." },
    ],
  }),
  component: Privacy,
});
