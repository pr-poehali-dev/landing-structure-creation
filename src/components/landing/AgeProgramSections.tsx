import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";
import Quiz from "./quiz/Quiz";
import quizFoundation45Config from "./quiz/configs/quiz-4-5.json";
import type { QuizConfig } from "./quiz/types";
import {
  IMG_FUNDAMENT_4_5,
  IMG_PREDSHKOLA_5_7,
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
      <Section id="4-5" className="bg-white">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">4-5 лет</span>
            <h2 className="age-section-h2">4-5 лет: Фундамент</h2>
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
            <img src={IMG_FUNDAMENT_4_5} alt="Фундамент 4-5 лет: занятие в мини-группе" />
          </figure>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-peach cta-btn-lg" onClick={() => { ymGoal('click_fundament_diagnostics'); onOpenModal('fundament'); }}>
              Записаться на диагностику
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* БЛОК 2б: 5-7 лет — Предшкольная подготовка */}
      <Section id="5-7" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">5-7 лет</span>
            <h2 className="age-section-h2">5-7 лет: Предшкольная подготовка</h2>
            <p className="age-lead">
              С пяти лет начинается настоящая предшкольная подготовка: за два года мы приводим ребёнка к первому классу с беглым чтением, поставленной рукой и спокойной уверенностью
            </p>
          </div>

          <div className="age-points-grid">
            {PREDSHKOLA_5_7_POINTS.map((p) => (
              <div key={p.text} className="age-point-card">
                <div className="age-point-icon"><Icon name={p.icon} size={20} /></div>
                <p className="age-point-text">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="age-extra-block">
            <div className="age-teacher-photo-stub"><Icon name="User" size={26} /></div>
            <p className="age-extra-block-text">
              <strong>Кто ведёт:</strong> Ирину Павловну, учителя начальных классов, ведёт подготовку
            </p>
          </div>

          <figure className="age-photo-wrap">
            <img src={IMG_PREDSHKOLA_5_7} alt="Предшкольная подготовка 5-7 лет: занятие" />
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