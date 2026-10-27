import { createFileRoute } from "@tanstack/react-router";
import Sveden from "@/pages/Sveden";

export const Route = createFileRoute("/sveden")({
  head: () => ({
    meta: [
      { title: "Сведения об образовательной организации — ДДЦ «Рыбка Долли»" },
      { name: "description", content: "Сведения об образовательной организации ДДЦ «Рыбка Долли» (ИП Савченко Ирина Игоревна)." },
      { property: "og:title", content: "Сведения об образовательной организации — ДДЦ «Рыбка Долли»" },
      { property: "og:description", content: "Сведения об образовательной организации ДДЦ «Рыбка Долли» (ИП Савченко Ирина Игоревна)." },
    ],
  }),
  component: Sveden,
});
