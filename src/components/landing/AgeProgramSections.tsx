import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";
import Quiz from "./quiz/Quiz";
import quizFoundation45Config from "./quiz/configs/quiz-4-5.json";
import quizSchoolReadiness57Config from "./quiz/configs/quiz-5-7.json";
import type { QuizConfig } from "./quiz/types";
import irinaPavlovnaPortrait from "@/assets/irina-pavlovna-portrait.jpg";
import DiagnosticsVideoBlock from "./DiagnosticsVideoBlock";
import {
  IMG_FUNDAMENT_4_5_MAIN,
  IMG_PREDSHKOLA_5_7_MAIN,
  FUNDAMENT_4_5_POINTS,
  PREDSHKOLA_5_7_POINTS,
} from "./constants";

const PRODLENKA_URL = "https://schooldolli.ru/?utm_source=site&utm_medium=cta&utm_campaign=site_to_prodlenka";

// ── AgeProgramSections (БЛОК 2а/2б: секции «4-5 лет» и «5-7 лет») ──────────
interface AgeProgramSectionsProps {
  onOpenModal: (source?: string) => void;
}

export default function AgeProgramSections({ onOpenModal }: AgeProgramSectionsProps) {
  return (
    <>
      {/* БЛОК 2а: 4-5 лет — Фундамент */}
      <Section id="4-5" className="age-section age-section-milk">
        <span className="age-section-watermark" aria-hidden="true">4-5</span>
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">4-5 лет</span>
            <span className="age-overline">дорожка фундамента</span>
            <h2 className="age-section-h2">4-5 лет: Фундамент</h2>
            <span className="age-underline" aria-hidden="true" />
            <p className="age-lead">
              В 4-5 мы ещё не учим — мы строим фундамент, на котором встанет учёба: внимание, речь, рука и любовь к занятиям
            </p>
          </div>

          <Quiz config={quizFoundation45Config as QuizConfig} />

          <div className="age-points-grid">
            {FUNDAMENT_4_5_POINTS.map((p) => (
              <div key={p.text} className="age-point-card">
                <div className="age-point-icon"><Icon name={p.icon} size={20} /></div>
                <p className="age-point-text">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="age-extra-block">
            <div className="age-extra-block-icon"><Icon name="Clock" size={20} /></div>
            <p className="age-extra-block-text">
              <strong>Как проходит занятие:</strong> 25-30 минут, игровой формат, мини-группа до 6 человек
            </p>
          </div>

          <figure className="age-photo-wrap">
            <img src={IMG_FUNDAMENT_4_5_MAIN} alt="Фундамент 4-5 лет: россыпь развивающих пособий" />
          </figure>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-peach cta-btn-lg" onClick={() => { ymGoal('click_fundament_diagnostics'); onOpenModal('fundament'); }}>
              Записаться на диагностику
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* Разделитель между секциями */}
      <div className="age-section-divider" aria-hidden="true">
        <Icon name="Star" size={14} />
        <Icon name="Star" size={14} />
        <Icon name="Star" size={14} />
      </div>

      {/* БЛОК 2б: 5-7 лет — Предшкольная подготовка */}
      <Section id="5-7" className="age-section age-section-white">
        <span className="age-section-watermark" aria-hidden="true">5-7</span>
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">5-7 лет</span>
            <span className="age-overline">предшкольная дорожка</span>
            <h2 className="age-section-h2">5-7 лет: Предшкольная подготовка</h2>
            <span className="age-underline" aria-hidden="true" />
            <p className="age-lead">
              С пяти лет начинается настоящая предшкольная подготовка: за два года мы приводим ребёнка к первому классу с беглым чтением, поставленной рукой и спокойной уверенностью
            </p>
          </div>

          <Quiz config={quizSchoolReadiness57Config as QuizConfig} />

          <div className="age-points-grid">
            {PREDSHKOLA_5_7_POINTS.map((p) => (
              <div key={p.text} className="age-point-card age-point-card-milk">
                <div className="age-point-icon"><Icon name={p.icon} size={20} /></div>
                <p className="age-point-text">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="age-extra-block">
            <div className="age-teacher-photo">
              <img src={irinaPavlovnaPortrait} alt="Ирина Павловна — учитель начальных классов" />
            </div>
            <p className="age-extra-block-text">
              <strong>Кто ведёт:</strong> Ирина Павловна, учитель начальных классов.
            </p>
          </div>

          <DiagnosticsVideoBlock />

          <figure className="age-photo-wrap">
            <img src={IMG_PREDSHKOLA_5_7_MAIN} alt="Ирина Павловна с карточкой у зелёного стола: предшкольная подготовка" />
          </figure>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-peach cta-btn-lg" onClick={() => { ymGoal('click_predshkola_diagnostics'); onOpenModal('predshkola'); }}>
              Записаться на диагностику
              <Icon name="ArrowRight" size={18} />
            </button>
            <p className="age-prodlenka-note">
              А в сентябре не бросим: у центра своя{" "}
              <a href={PRODLENKA_URL} target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('click_footer_prodlenka')}>
                продлёнка
              </a>{" "}
              с домашкой и английским
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}