import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ReadinessMapTemplate from "@/components/internal/readiness-map/ReadinessMapTemplate";
import { buildReadinessMapPdf } from "@/components/internal/readiness-map/buildPdf";
import {
  READINESS_PARAMS,
  VERDICTS,
  EMPTY_READINESS_MAP,
  calcTotalScore,
  MAX_TOTAL_SCORE,
  type ReadinessMapData,
  type VerdictKey,
  type TrackKey,
  type FormatKey,
} from "@/components/internal/readiness-map/types";

const DEMO_DATA: ReadinessMapData = {
  childName: "Мария И.",
  childAge: "6 лет",
  date: "16.09.2026",
  strengths: ["Быстро запоминает новые слова и любит рассказывать истории", "С удовольствием доводит начатую игру до конца"],
  scores: { reading: 4, writing: 3, math: 4, attention: 3, speech: 5, motor: 3, social: 5 },
  comments: {
    reading: "Читает по слогам, понимает прочитанное",
    writing: "Нужно закрепить захват карандаша",
    math: "Считает до 20, начинает решать простые задачи",
    attention: "Удерживает внимание 20-25 минут",
    speech: "Богатый словарный запас, связный пересказ",
    motor: "Рука готова, нужна практика штриховки",
    social: "Легко включается в занятие, соблюдает правила",
  },
  verdict: "in-progress",
  track: "preschool-5-7",
  format: "group",
  monthlyPlan: [
    "Закрепляем технику чтения, вводим слитное чтение слов",
    "Отрабатываем захват пера, штриховка и обводка",
    "Решаем задачи в одно действие, готовимся к контрольному срезу",
  ],
  homeActivities: "10 минут чтения вслух каждый день, игры с карточками на счёт, лепка и раскраски для руки.",
};

// ── ReadinessMapAdmin — служебная форма заполнения «Карты готовности» ──────
// Непубличная страница: не в навигации, meta robots noindex (см. ReadinessMapAdminPage).
// ?preview=empty или ?preview=demo в URL — быстрый просмотр бланка без клика (для QA/скриншотов).
export default function ReadinessMapAdmin() {
  const params = new URLSearchParams(window.location.search);
  const previewParam = params.get("preview");

  const [data, setData] = useState<ReadinessMapData>(
    previewParam === "demo" ? DEMO_DATA : EMPTY_READINESS_MAP
  );
  const [showPreview, setShowPreview] = useState(previewParam === "empty" || previewParam === "demo");
  const [pdfLoading, setPdfLoading] = useState(false);
  const docRef = useRef<HTMLDivElement>(null);

  const total = calcTotalScore(data.scores);

  const setScore = (id: string, score: number) => {
    setData((d) => ({ ...d, scores: { ...d.scores, [id]: score } }));
  };
  const setComment = (id: string, text: string) => {
    setData((d) => ({ ...d, comments: { ...d.comments, [id]: text } }));
  };
  const setStrength = (i: 0 | 1, text: string) => {
    setData((d) => {
      const s: [string, string] = [...d.strengths];
      s[i] = text;
      return { ...d, strengths: s };
    });
  };
  const setPlanLine = (i: 0 | 1 | 2, text: string) => {
    setData((d) => {
      const p: [string, string, string] = [...d.monthlyPlan];
      p[i] = text;
      return { ...d, monthlyPlan: p };
    });
  };

  const handleBuildPdf = () => {
    setShowPreview(true);
    setTimeout(() => window.print(), 200);
  };

  const handleDownloadPdf = async () => {
    if (!docRef.current || pdfLoading) return;
    setPdfLoading(true);
    try {
      const namePart = data.childName ? data.childName.replace(/[^\p{L}\p{N}]+/gu, "_") : "karta-gotovnosti";
      await buildReadinessMapPdf(docRef.current, `Карта_готовности_${namePart}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div>
        <div className="rm-preview-toolbar no-print">
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            <Icon name="ArrowLeft" size={16} />
            Назад к форме
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Icon name="Printer" size={16} />
            Печать
          </Button>
          <Button onClick={handleDownloadPdf} disabled={pdfLoading}>
            <Icon name={pdfLoading ? "Loader2" : "FileDown"} size={16} className={pdfLoading ? "rm-spin" : undefined} />
            {pdfLoading ? "Готовим файл..." : "Скачать PDF"}
          </Button>
        </div>
        <div ref={docRef}>
          <ReadinessMapTemplate data={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="rm-admin no-print">
      <div className="rm-admin-header">
        <h1>Карта готовности — служебная форма</h1>
        <p>Заполните данные диагностики, затем нажмите «Собрать PDF» — откроется печатная версия.</p>
      </div>

      <div className="rm-admin-grid">
        <section className="rm-admin-section">
          <h2>Анкета</h2>
          <div className="rm-admin-row">
            <div className="rm-admin-field">
              <Label>Имя ребёнка</Label>
              <Input value={data.childName} onChange={(e) => setData((d) => ({ ...d, childName: e.target.value }))} placeholder="Мария И." />
            </div>
            <div className="rm-admin-field rm-admin-field-sm">
              <Label>Возраст</Label>
              <Input value={data.childAge} onChange={(e) => setData((d) => ({ ...d, childAge: e.target.value }))} placeholder="6 лет" />
            </div>
            <div className="rm-admin-field rm-admin-field-sm">
              <Label>Дата</Label>
              <Input type="date" value={data.date} onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))} />
            </div>
          </div>
        </section>

        <section className="rm-admin-section">
          <h2>Что уже сияет (две сильные стороны)</h2>
          <div className="rm-admin-row">
            <div className="rm-admin-field">
              <Label>Сторона 1</Label>
              <Input value={data.strengths[0]} onChange={(e) => setStrength(0, e.target.value)} />
            </div>
            <div className="rm-admin-field">
              <Label>Сторона 2</Label>
              <Input value={data.strengths[1]} onChange={(e) => setStrength(1, e.target.value)} />
            </div>
          </div>
        </section>

        <section className="rm-admin-section">
          <h2>Семь параметров</h2>
          {READINESS_PARAMS.map((p) => (
            <div key={p.id} className="rm-admin-param">
              <div className="rm-admin-param-head">
                <span className="rm-admin-param-title">{p.number}. {p.title}</span>
                <div className="rm-admin-scale">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`rm-admin-dot ${data.scores[p.id] === n ? "rm-admin-dot-active" : ""}`}
                      onClick={() => setScore(p.id, n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                value={data.comments[p.id] || ""}
                onChange={(e) => setComment(p.id, e.target.value)}
                placeholder="Комментарий..."
              />
            </div>
          ))}
          <p className="rm-admin-total">Сумма: {total} из {MAX_TOTAL_SCORE}</p>
        </section>

        <section className="rm-admin-section">
          <h2>Вывод</h2>
          <div className="rm-admin-radio-row">
            {VERDICTS.map((v) => (
              <button
                key={v.key}
                type="button"
                className={`rm-admin-chip ${data.verdict === v.key ? "rm-admin-chip-active" : ""}`}
                onClick={() => setData((d) => ({ ...d, verdict: v.key as VerdictKey }))}
              >
                {v.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rm-admin-section">
          <h2>Дорожка и формат</h2>
          <div className="rm-admin-radio-row">
            <button type="button" className={`rm-admin-chip ${data.track === "foundation-4-5" ? "rm-admin-chip-active" : ""}`} onClick={() => setData((d) => ({ ...d, track: "foundation-4-5" as TrackKey }))}>Фундамент 4-5</button>
            <button type="button" className={`rm-admin-chip ${data.track === "preschool-5-7" ? "rm-admin-chip-active" : ""}`} onClick={() => setData((d) => ({ ...d, track: "preschool-5-7" as TrackKey }))}>Предшкольная 5-7</button>
          </div>
          <div className="rm-admin-radio-row">
            <button type="button" className={`rm-admin-chip ${data.format === "group" ? "rm-admin-chip-active" : ""}`} onClick={() => setData((d) => ({ ...d, format: "group" as FormatKey }))}>Группа</button>
            <button type="button" className={`rm-admin-chip ${data.format === "individual" ? "rm-admin-chip-active" : ""}`} onClick={() => setData((d) => ({ ...d, format: "individual" as FormatKey }))}>Индивидуально</button>
          </div>
        </section>

        <section className="rm-admin-section">
          <h2>План по месяцам</h2>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rm-admin-field">
              <Label>Месяц {i + 1}</Label>
              <Input value={data.monthlyPlan[i as 0 | 1 | 2]} onChange={(e) => setPlanLine(i as 0 | 1 | 2, e.target.value)} />
            </div>
          ))}
        </section>

        <section className="rm-admin-section">
          <h2>Что делать дома</h2>
          <Textarea
            value={data.homeActivities}
            onChange={(e) => setData((d) => ({ ...d, homeActivities: e.target.value }))}
            placeholder="Игры и занятия для дома..."
            rows={4}
          />
        </section>
      </div>

      <div className="rm-admin-footer">
        <Button size="lg" onClick={handleBuildPdf}>
          <Icon name="FileDown" size={18} />
          Собрать PDF
        </Button>
      </div>
    </div>
  );
}