import { createFileRoute } from "@tanstack/react-router";
import Feedback from "@/pages/Feedback";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Анкета обратной связи — ДДЦ «Рыбка Долли»" },
      { name: "description", content: "Поделитесь впечатлением о визите в детский центр «Рыбка Долли». Это займёт 1 минуту." },
      { property: "og:title", content: "Анкета обратной связи — ДДЦ «Рыбка Долли»" },
      { property: "og:description", content: "Поделитесь впечатлением о визите в детский центр «Рыбка Долли». Это займёт 1 минуту." },
    ],
  }),
  component: Feedback,
});
