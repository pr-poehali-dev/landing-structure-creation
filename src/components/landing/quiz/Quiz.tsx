import { useState } from "react";
import QuizCard from "./QuizCard";
import QuizModal from "./QuizModal";
import type { QuizConfig } from "./types";

// ── Quiz — точка входа: карточка на странице + модалка квиза ───────────────
interface QuizProps {
  config: QuizConfig;
}

export default function Quiz({ config }: QuizProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <QuizCard config={config} onStart={() => setOpen(true)} />
      <QuizModal config={config} open={open} onClose={() => setOpen(false)} />
    </>
  );
}