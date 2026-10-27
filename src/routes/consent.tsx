import { createFileRoute } from "@tanstack/react-router";
import Consent from "@/pages/Consent";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Согласие на обработку персональных данных — ДДЦ «Рыбка Долли»" },
      { name: "description", content: "Согласие на обработку персональных данных ИП Савченко Ирина Игоревна (ДДЦ «Рыбка Долли») в соответствии с ФЗ № 152-ФЗ." },
      { property: "og:title", content: "Согласие на обработку персональных данных — ДДЦ «Рыбка Долли»" },
      { property: "og:description", content: "Согласие на обработку персональных данных ИП Савченко Ирина Игоревна (ДДЦ «Рыбка Долли») в соответствии с ФЗ № 152-ФЗ." },
    ],
  }),
  component: Consent,
});
