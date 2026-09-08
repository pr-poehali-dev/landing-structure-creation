import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { FAQ_LIST, TEAM, GALLERY, VIDEO_ZAKULISE_DEN } from "./constants";
import { Section } from "./InfoSections";
import { ymGoal } from "@/lib/ym";

// ── CalculatorFaqTeam (блоки 8б, 13, 10, 11) ───────────────────────────────
interface CalculatorFaqTeamProps {
  onOpenModal: (source?: string) => void;
}

export default function CalculatorFaqTeam({ onOpenModal }: CalculatorFaqTeamProps) {
  const [calcPlan, setCalcPlan] = useState("special");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTeam, setOpenTeam] = useState<number | null>(null);

  const planLabels: Record<string, { title: string; desc: string; price: string }> = {
    current: { title: "Текущий", desc: "Перерасчёт по болезни, мастер-классы включены, летний отпуск 1 месяц", price: "25 000 ₽/мес" },
    special: { title: "Специальный", desc: "Цена зафиксирована от 4 месяцев, без перерасчётов", price: "20 000 ₽/мес" },
  };

  const selected = planLabels[calcPlan];

  return (
    <>
      {/* ── БЛОК 8б: Калькулятор ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Калькулятор</span>
            <h2 className="section-h2">Рассчитайте<br />стоимость за минуту</h2>
          </div>
          <div className="calc-wrap">
            <div className="calc-controls">
              <div className="calc-row">
                <label className="calc-label">Выберите тариф</label>
                <div className="calc-types">
                  <button
                    className={`calc-type-btn ${calcPlan === "current" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcPlan("current")}
                  >
                    Текущий — 25 000 ₽/мес
                  </button>
                  <button
                    className={`calc-type-btn ${calcPlan === "special" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcPlan("special")}
                  >
                    Специальный — 20 000 ₽/мес
                  </button>
                </div>
              </div>
            </div>
            <div className="calc-result">
              <div className="calc-result-label">{selected.title} — {selected.price}</div>
              <div className="calc-result-desc">{selected.desc}</div>
              <div className="calc-result-note">Включает питание, занятия, прогулки и мероприятия</div>
              <button className="cta-btn cta-btn-primary" onClick={() => { ymGoal('click_calculator_cta'); onOpenModal('calculator'); }}>
                Узнать точную стоимость
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="cta-btn cta-btn-outline" onClick={() => { ymGoal('click_calculator_excursion'); onOpenModal('excursion'); }}>
              Записаться на экскурсию
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 13: FAQ ── */}
      <Section id="faq" className="bg-white">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Частые вопросы</span>
            <h2 className="section-h2">Отвечаем честно<br />на всё</h2>
          </div>
          <div className="faq-list">
            {FAQ_LIST.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "faq-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} />
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
          <div className="faq-cta">
            <a
              href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
              onClick={() => ymGoal('click_messenger')}
            >
              Узнать о нас больше в MAX
              <Icon name="ArrowRight" size={18} />
            </a>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 10: Команда (кратко) ── */}
      <Section id="team" className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Наша команда</span>
            <h2 className="section-h2">Люди, которым<br />доверяют детей</h2>
          </div>
          <div className="team-grid">
            {TEAM.filter((t) => t.name !== "Наталья Петровна").map((t, i) => (
              <div key={i} className="team-card">
                <div className="team-photo">
                  <img src={t.img} alt={t.name} />
                </div>
                <h3 className="team-name">{t.name}</h3>
                <div className="team-role">{t.role}</div>
                <div className="team-exp">{t.exp}</div>
                {t.credo && <div className="team-credo">{t.credo}</div>}
                {t.bio && (
                  <>
                    <button
                      className="team-bio-toggle"
                      onClick={() => setOpenTeam(openTeam === i ? null : i)}
                    >
                      {openTeam === i ? "Скрыть" : "Читать подробнее"}
                      <Icon name={openTeam === i ? "ChevronUp" : "ChevronDown"} size={15} />
                    </button>
                    {openTeam === i && (
                      <div className="team-bio">
                        {t.bio.split("\n\n").map((para, j) => (
                          <p key={j}>{para}</p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="team-nanny-note">
            <Icon name="Heart" size={15} /> Нянечка Марина Анатольевна работает с обеими группами
          </p>
          <div className="section-header" style={{ textAlign: "center", marginTop: 40 }}>
            <span className="section-tag">Закулисье</span>
            <h3 className="section-h2" style={{ fontSize: "1.5rem" }}>Посмотрите,<br />как мы работаем</h3>
          </div>
          <div className="tv-frame" style={{ margin: "0 auto" }}>
            <video
              src={VIDEO_ZAKULISE_DEN}
              preload="none"
              controls
              playsInline
              width="100%"
              style={{ display: "block" }}
            />
          </div>
          <div className="team-links-row" style={{ marginTop: 32 }}>
            <Link to="/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli" className="cta-btn cta-btn-outline" onClick={() => ymGoal('click_team_yasli')}>
              Страница яслей <Icon name="ArrowRight" size={15} />
            </Link>
            <Link to="/podgotovka-k-shkole/" className="cta-btn cta-btn-outline" onClick={() => ymGoal('click_team_school')}>
              Страница старшей группы <Icon name="ArrowRight" size={15} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 11: Галерея ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Фотогалерея</span>
            <h2 className="section-h2">Загляните<br />к нам</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}