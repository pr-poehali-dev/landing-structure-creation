import ProgramPageDraft from "@/components/landing/ProgramPageDraft";

export default function Yasli() {
  return (
    <ProgramPageDraft
      h1="Ясли в Керчи — ДДЦ «Рыбка Долли»"
      intro="Принимаем малышей от 1,5 лет в мини-группы до 12 детей. Мягкая адаптация без слёз и стресса, забота и тепло с первых минут — так, чтобы ваш ребёнок полюбил садик."
      cardTitle="Быстрая адаптация — без слёз и стресса"
      cardItems={[
        "Специальная программа мягкой адаптации для яслей (от 1,5 лет)",
        "Воспитатель на связи с вами весь день: фото, видео, отчёты",
      ]}
      cardResult="9 из 10 детей привыкают за 1–2 недели"
      formSource="Страница яслей"
      formGoal="form_yasli_submit"
    />
  );
}
