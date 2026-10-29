import { createFileRoute } from "@tanstack/react-router";
import PodgotovkaKShkole2x from "@/pages/PodgotovkaKShkole2x";

export const Route = createFileRoute("/podgotovka-k-shkole-2")({
  head: () => ({
    meta: [
      { title: "Подготовка к школе 2 раза в неделю в Керчи — ДДЦ «Рыбка Долли» | Без полного дня в саду" },
      { name: "description", content: "Занятия подготовки к школе для детей 5-7 лет в Керчи: чтение, письмо, математика. Только уроки 2 раза в неделю, без пребывания в детском центре. Запишитесь на пробное занятие!" },
      { property: "og:title", content: "Подготовка к школе 2 раза в неделю в Керчи — ДДЦ «Рыбка Долли» | Без полного дня в саду" },
      { property: "og:description", content: "Занятия подготовки к школе для детей 5-7 лет в Керчи: чтение, письмо, математика. Только уроки 2 раза в неделю, без пребывания в детском центре. Запишитесь на пробное занятие!" },
    ],
    links: [{ rel: "canonical", href: "https://ribkadollilend.ru/podgotovka-k-shkole-2/" }],
  }),
  component: PodgotovkaKShkole2x,
});
