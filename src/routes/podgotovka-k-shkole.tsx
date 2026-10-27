import { createFileRoute } from "@tanstack/react-router";
import PodgotovkaKShkole from "@/pages/PodgotovkaKShkole";

export const Route = createFileRoute("/podgotovka-k-shkole")({
  head: () => ({
    meta: [
      { title: "Подготовка к школе в Керчи — ДДЦ «Рыбка Долли» | Чтение, письмо, математика, английский" },
      { name: "description", content: "Старшая группа и подготовка к школе в Керчи на Циолковского, 12. Мини-группы до 12 детей, занятия по возрасту, логопед и английский. Свободно 4 места. Запишитесь на пробное занятие!" },
      { property: "og:title", content: "Подготовка к школе в Керчи — ДДЦ «Рыбка Долли» | Чтение, письмо, математика, английский" },
      { property: "og:description", content: "Старшая группа и подготовка к школе в Керчи на Циолковского, 12. Мини-группы до 12 детей, занятия по возрасту, логопед и английский. Свободно 4 места. Запишитесь на пробное занятие!" },
    ],
  }),
  component: PodgotovkaKShkole,
});
