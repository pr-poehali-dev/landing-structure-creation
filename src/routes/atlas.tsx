import { createFileRoute } from "@tanstack/react-router";
import Atlas from "@/pages/Atlas";

const TITLE = "Атлас достижений — инновационная экосистема развития ребёнка в ДДЦ «Рыбка Долли», Керчь";
const DESC = "Первый в Керчи детский центр с цифровой экосистемой «Атлас достижений»: фотоотчёты, ежемесячные отчёты о навыках и «Книга успеха» ребёнка. Запишитесь на бесплатную экскурсию.";

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://ribkadollilend.ru/atlas" }],
  }),
  component: Atlas,
});
