import { useState } from "react";
import QuizCard from "./QuizCard";
import QuizModal from "./QuizModal";
import type { QuizConfig } from "./types";

// ── Quiz — точка входа: карточка на странице + модалка квиза ───────────────
interface QuizProps {
  config: QuizConfig;
}

export default function Quiz({ config }: QuizProps) {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const debugAutoOpen = params?.get("debug_quiz_open") === "1";
  const debugStepRaw = params?.get("debug_quiz_step");
  const debugStep = debugStepRaw === "result" || debugStepRaw === "lead" ? debugStepRaw : undefined;
  const debugSelectFirst = params?.get("debug_quiz_select") === "1";
  const [open, setOpen] = useState(debugAutoOpen);

  return (
    <>
      <QuizCard config={config} onStart={() => setOpen(true)} />
      <QuizModal config={config} open={open} onClose={() => setOpen(false)} debugJumpTo={debugStep} debugSelectFirst={debugSelectFirst} />
    </>
  );
}