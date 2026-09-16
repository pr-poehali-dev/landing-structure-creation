import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";
import ConsentCheckbox from "../ConsentCheckbox";
import { ymGoal } from "@/lib/ym";
import type { QuizConfig, QuizVerdict, QuizScaleResult } from "./types";
import { computeTotalScore, findVerdict, computeScales, formatProgress, buildQuizResultSummary } from "./utils";

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

async function sendQuizLead(name: string, phone: string, source: string) {
  await fetch(SEND_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, age: "", source }),
  });
}

type QuizStep = "question" | "result" | "lead" | "success";

// ── QuizModal — переиспользуемый движок квиза, читает конфиг, текстов внутри нет ─
interface QuizModalProps {
  config: QuizConfig;
  open: boolean;
  onClose: () => void;
  debugJumpTo?: "result" | "lead";
  debugSelectFirst?: boolean;
}

export default function QuizModal({ config, open, onClose, debugJumpTo, debugSelectFirst }: QuizModalProps) {
  const [step, setStep] = useState<QuizStep>("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [verdict, setVerdict] = useState<QuizVerdict | null>(null);
  const [scales, setScales] = useState<QuizScaleResult[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  const startFired = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && !startFired.current) {
      startFired.current = true;
      ymGoal(config.metrics.started, { quizId: config.metrics.quizIdInEvent });
    }
    if (!open) {
      startFired.current = false;
      setStep("question");
      setCurrentIndex(0);
      setAnswers({});
      setName("");
      setPhone("");
      setAgreed(false);
      setLeadLoading(false);
    }
  }, [open, config]);

  useEffect(() => {
    if (!open || !debugJumpTo) return;
    const allAnswers: Record<number, number> = {};
    config.questions.forEach((q) => { allAnswers[q.id] = 0; });
    const finalScore = computeTotalScore(config, allAnswers);
    const finalVerdict = findVerdict(config, finalScore);
    const finalScales = computeScales(config, allAnswers);
    setAnswers(allAnswers);
    setScore(finalScore);
    setVerdict(finalVerdict);
    setScales(finalScales);
    setStep(debugJumpTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debugJumpTo]);

  useEffect(() => {
    if (open && debugSelectFirst) {
      setAnswers((prev) => ({ ...prev, [config.questions[0].id]: 0 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debugSelectFirst]);

  if (!open) return null;

  const total = config.questions.length;
  const question = config.questions[currentIndex];
  const selectedOption = answers[question.id];

  const selectOption = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optIndex }));
  };

  const goBack = () => {
    if (step === "lead") {
      setStep("result");
      return;
    }
    if (step === "result") {
      setCurrentIndex(total - 1);
      setStep("question");
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const goNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    const finalScore = computeTotalScore(config, answers);
    const finalVerdict = findVerdict(config, finalScore);
    const finalScales = computeScales(config, answers);
    setScore(finalScore);
    setVerdict(finalVerdict);
    setScales(finalScales);
    setStep("result");
    ymGoal(config.metrics.completed, {
      quizId: config.metrics.quizIdInEvent,
      verdict: finalVerdict.title,
      score: finalScore,
    });
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed || !verdict) return;
    setLeadLoading(true);
    const summary = buildQuizResultSummary(config, score, verdict, scales);
    const cta = verdict.cta;
    const source = `Квиз (${cta.formType ?? cta.action}) — ${summary.replace(/\n/g, "; ")}`;
    await sendQuizLead(name, phone, source);
    ymGoal(config.metrics.lead, {
      quizId: config.metrics.quizIdInEvent,
      verdict: verdict.title,
      score,
    });
    setLeadLoading(false);
    setStep("success");
  };

  const showBack = step === "lead" || step === "result" || (step === "question" && currentIndex > 0);

  return createPortal(
    <div className="quiz-modal-overlay" onClick={onClose}>
      <div className="quiz-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-modal-close" onClick={onClose} aria-label="Закрыть квиз">
          <Icon name="X" size={20} />
        </button>

        {step === "question" && (
          <div className="quiz-modal-header">
            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
            <span className="quiz-progress-label">
              {formatProgress(config.ui.progress, currentIndex + 1, total)}
            </span>
          </div>
        )}

        <div className="quiz-modal-body">
          {step === "question" && (
            <div className="quiz-question">
              <h3 className="quiz-question-text">{question.text}</h3>
              <div className="quiz-options">
                {question.options.map((opt, i) => (
                  <button
                    key={opt.label}
                    className={`quiz-option ${selectedOption === i ? "quiz-option-selected" : ""}`}
                    onClick={() => selectOption(i)}
                  >
                    <span className="quiz-option-radio">
                      {selectedOption === i && <Icon name="Check" size={14} />}
                    </span>
                    <span className="quiz-option-label">{opt.label}</span>
                  </button>
                ))}
              </div>
              {selectedOption !== undefined && (
                <div className="quiz-option-line">
                  <Icon name="Sparkles" size={15} fallback="Star" />
                  <span>{question.options[selectedOption].line}</span>
                </div>
              )}
            </div>
          )}

          {step === "result" && verdict && (
            <div className="quiz-result">
              <div className="quiz-result-icon"><Icon name="PartyPopper" size={28} fallback="Star" /></div>
              <h3 className="quiz-result-title">{verdict.title}</h3>
              <p className="quiz-result-text">{verdict.text}</p>

              {scales.length > 0 && (
                <div className="quiz-scales">
                  {scales.map((s) => (
                    <div key={s.label} className="quiz-scale-row">
                      <div className="quiz-scale-top">
                        <span className="quiz-scale-label">{s.label}</span>
                        <span className="quiz-scale-percent">{s.percent}%</span>
                      </div>
                      <div className="quiz-scale-track">
                        <div className="quiz-scale-fill" style={{ width: `${s.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="cta-btn cta-btn-primary cta-btn-lg quiz-cta-btn" onClick={() => setStep("lead")}>
                {verdict.cta.label}
                <Icon name="ArrowRight" size={18} />
              </button>

              <p className="quiz-disclaimer">{config.disclaimer}</p>
            </div>
          )}

          {step === "lead" && verdict && (
            <div className="quiz-lead">
              <h3 className="quiz-result-title" style={{ fontSize: 22 }}>{verdict.cta.label}</h3>
              <p className="quiz-result-text" style={{ marginBottom: 20 }}>
                Оставьте телефон — мы свяжемся и договоримся об удобном времени.
              </p>
              <form onSubmit={submitLead} className="modal-form">
                <input className="modal-input" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="modal-input" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <ConsentCheckbox checked={agreed} onChange={setAgreed} />
                <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={leadLoading || !agreed}>
                  {leadLoading ? "Отправляем..." : "Отправить заявку"}
                  {!leadLoading && <Icon name="ArrowRight" size={18} />}
                </button>
                <p className="modal-privacy"><Icon name="Lock" size={11} /> Данные не передаём третьим лицам</p>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="modal-success">
              <span className="success-big-emoji">🎉</span>
              <h3 className="modal-title">Отлично!</h3>
              <p className="modal-sub">Мы позвоним вам в течение дня, в рабочее время.</p>
            </div>
          )}
        </div>

        {step === "question" && (
          <div className="quiz-modal-footer">
            {showBack ? (
              <button className="quiz-btn-back" onClick={goBack}>
                <Icon name="ArrowLeft" size={16} />
                {config.ui.back}
              </button>
            ) : <span />}
            <button
              className="cta-btn cta-btn-primary quiz-btn-next"
              onClick={goNext}
              disabled={selectedOption === undefined}
            >
              {currentIndex < total - 1 ? config.ui.next : config.ui.result}
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}