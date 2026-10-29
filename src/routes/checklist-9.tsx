import { createFileRoute } from "@tanstack/react-router";
import Checklist9 from "@/pages/Checklist9";

export const Route = createFileRoute("/checklist-9")({
  head: () => ({
    meta: [
      { title: "Чек-лист готовности к первому дню в центре | «Рыбка Долли»" },
      { name: "description", content: "7 шагов к первому дню в центре без слез и стресса. Чек-лист от детского центра «Рыбка Долли»." },
      { property: "og:title", content: "Чек-лист готовности к первому дню в центре | «Рыбка Долли»" },
      { property: "og:description", content: "7 шагов к первому дню в центре без слез и стресса. Чек-лист от детского центра «Рыбка Долли»." },
    ],
  }),
  component: Checklist9,
});
