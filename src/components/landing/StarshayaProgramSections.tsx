import Icon from "@/components/ui/icon";
import { Section } from "./InfoSections";
import FoodSection from "./FoodSection";
import SafetySection from "./SafetySection";
import { ymGoal } from "@/lib/ym";
import {
  VIDEO_STARSHAYA_DEN,
  IMG_POSTER_STARSHAYA_DEN,
  IMG_STARSHAYA_EMOTIONS,
  IMG_KOMANDA_GRUPPOVOE,
  IMG_SVETLANA_VLADIMIROVNA,
  IMG_MARINA_ANATOLIEVNA,
  IMG_NATALIA_PETROVNA,
  IMG_VIKTORIA_ANATOLIEVNA,
  VIDEO_STARSHAYA_FOOD,
  IMG_POSTER_STARSHAYA_FOOD,
  STARSHAYA_SKILLS,
  STARSHAYA_SCHEDULE,
} from "./constants";

// ── StarshayaProgramSections (БЛОКИ 3–10: видео дня, готовность, распорядок, ─
// питание, безопасность, команда, английский, логопед) ─────────────────────
interface StarshayaProgramSectionsProps {
  onOpenModal: (source?: string) => void;
}

export default function StarshayaProgramSections({ onOpenModal }: StarshayaProgramSectionsProps) {
  return (
    <>
      {/* БЛОК 3: Видео "Один день в старшей группе" */}
      <Section className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">Один день в старшей группе</span>
            <h2 className="section-h2">Посмотрите, как проходит<br />день в старшей группе</h2>
          </div>
          <div className="tv-frame" style={{ margin: "0 auto" }}>
            <video
              src={VIDEO_STARSHAYA_DEN}
              poster={IMG_POSTER_STARSHAYA_DEN}
              preload="none"
              controls
              playsInline
              width="100%"
              style={{ display: "block" }}
            />
          </div>
          <p className="schedule-note">
            В кадре: приём и зарядка, занятия по возрасту, прогулка, обед, тихий час, полдник, игры и прогулка домой.
          </p>
        </div>
      </Section>

      {/* БЛОК 4: Что ребёнок освоит к школе */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Готовность к школе</span>
            <h2 className="section-h2">Что ребёнок<br />освоит к школе</h2>
          </div>
          <div className="adaptation-layout">
            <div className="facts-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {STARSHAYA_SKILLS.map((s) => (
                <div key={s.title} className="fear-card">
                  <div className="fear-icon"><Icon name={s.icon} size={24} /></div>
                  <h3 className="fear-q">{s.title}</h3>
                  <p className="fear-a">{s.text}</p>
                  {s.anchor && (
                    <a href={s.anchor} className="fear-anchor-link">
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <figure className="adaptation-photo">
              <img src={IMG_STARSHAYA_EMOTIONS} alt="Подготовка к школе в Керчи: игра «Какие эмоции во мне сейчас»" />
              <figcaption>Игра «Какие эмоции во мне сейчас»: дети учатся распознавать и называть свои чувства</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* БЛОК 5: Распорядок дня */}
      <Section id="schedule" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Распорядок дня</span>
            <h2 className="section-h2">День в старшей<br />группе</h2>
            <p className="food-subtitle">Распорядок общий с яслями, занятия — по возрасту.</p>
          </div>
          <div className="schedule-timeline">
            {STARSHAYA_SCHEDULE.map((s) => (
              <div key={s.time} className={`schedule-slot ${s.img ? "schedule-slot-photo" : "schedule-slot-text"}`}>
                {s.img && <img src={s.img} alt={s.alt} loading="lazy" />}
                <div className="schedule-slot-info">
                  <span className="schedule-slot-time">{s.time}</span>
                  <strong>{s.title}</strong>
                  {s.caption && <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>{s.caption}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* БЛОК 6: Питание */}
      <FoodSection
        videoSrc={VIDEO_STARSHAYA_FOOD}
        videoPoster={IMG_POSTER_STARSHAYA_FOOD}
        videoCaption="Завтрак, обед и полдник в старшей группе"
      />

      {/* БЛОК 7: Безопасность */}
      <SafetySection id="safety" />

      {/* БЛОК 8: Команда старшей группы */}
      <Section id="team" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Команда старшей группы</span>
            <h2 className="section-h2">Люди, которым<br />доверяют подготовку к школе</h2>
          </div>
          <figure className="komanda-group-photo">
            <img src={IMG_KOMANDA_GRUPPOVOE} alt="Подготовка к школе в Керчи: команда центра «Рыбка Долли»" />
            <figcaption>Ирина Васильевна, Светлана Владимировна, Ирина Павловна, Наталья Петровна — команда центра</figcaption>
          </figure>
          <div className="team-grid team-grid-2">
            <div className="team-card">
              <div className="team-photo">
                <img src={IMG_SVETLANA_VLADIMIROVNA} alt="Светлана Владимировна — педагог старшей группы" />
              </div>
              <h3 className="team-name">Светлана Владимировна</h3>
              <div className="team-role">Педагог старшей группы</div>
              <div className="team-exp">Работает в центре 1 год</div>
              <div className="team-credo">«Никогда не останавливаться на достигнутом, делиться не задумываясь, учить — обучаясь самой»</div>
            </div>
            <div className="team-card">
              <div className="team-photo">
                <img src={IMG_MARINA_ANATOLIEVNA} alt="Марина Анатольевна — нянечка старшей группы" />
              </div>
              <h3 className="team-name">Марина Анатольевна</h3>
              <div className="team-role">Нянечка обеих групп</div>
              <div className="team-credo">Забота и тепло каждый день</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_team_excursion'); onOpenModal('excursion'); }}>
              Познакомиться лично — на пробном занятии
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* БЛОК 9: Английский язык */}
      <Section id="english" className="bg-white">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Английский язык</span>
            <h2 className="section-h2">Английский — играя<br />и говоря, без зубрёжки</h2>
          </div>
          <div className="adaptation-layout adaptation-layout-photo-left">
            <figure className="adaptation-photo">
              <img src={IMG_NATALIA_PETROVNA} alt="Наталья Петровна — педагог английского языка" />
              <figcaption>Наталья Петровна — педагог английского языка</figcaption>
            </figure>
            <div>
              <p className="fear-a" style={{ fontSize: 15, marginBottom: 16 }}>
                Абонемент — 4 000 ₽/мес.
              </p>
              <ul className="check-list" style={{ marginBottom: 16 }}>
                <li><Icon name="Check" size={16} /><span>Полное погружение в языковую среду</span></li>
                <li><Icon name="Check" size={16} /><span>Дети говорят и договариваются на английском</span></li>
                <li><Icon name="Check" size={16} /><span>Слова запоминаются в контексте, а не списком</span></li>
              </ul>
              <div className="feat-result" style={{ marginBottom: 20 }}>
                <Icon name="TrendingUp" size={14} />
                Ребёнок не боится говорить и понимает речь на слух
              </div>
              <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_english_cta'); onOpenModal('english'); }}>
                Записаться на английский
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* БЛОК 10: Логопед */}
      <Section id="logoped" className="bg-cream">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Логопед</span>
            <h2 className="section-h2">Чистая речь —<br />уверенный старт в школе</h2>
          </div>
          <div className="adaptation-layout adaptation-layout-photo-left">
            <figure className="adaptation-photo">
              <img src={IMG_VIKTORIA_ANATOLIEVNA} alt="Виктория Анатольевна — логопед" />
              <figcaption>Виктория Анатольевна, логопед</figcaption>
            </figure>
            <div>
              <p className="fear-a" style={{ fontSize: 15, marginBottom: 16 }}>
                Коррекция звукопроизношения, развитие речи, подготовка к школе.
              </p>
              <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_logoped_cta'); onOpenModal('logoped'); }}>
                Записаться на консультацию
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
