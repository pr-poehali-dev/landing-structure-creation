import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_LIST, TEAM, GALLERY } from "./constants";
import { Section } from "./InfoSections";

// ── CalculatorFaqTeam (блоки 6–9) ─────────────────────────────────────────
interface CalculatorFaqTeamProps {
  onOpenModal: () => void;
}

export default function CalculatorFaqTeam({ onOpenModal }: CalculatorFaqTeamProps) {
  const [calcDays, setCalcDays] = useState("full");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTeam, setOpenTeam] = useState<number | null>(null);

  const formatLabels: Record<string, { title: string; desc: string }> = {
    full:    { title: "Полный абонемент", desc: "20 рабочих дней · 8:00–18:00 · оставшиеся дни месяца в подарок" },
    short:   { title: "Короткий абонемент", desc: "20 рабочих дней · 8:00–13:00 · оставшиеся дни месяца в подарок" },
    days:    { title: "Несколько дней", desc: "Любые дни · полный или короткий · цена зависит от количества дней" },
  };

  const selected = formatLabels[calcDays];

  return (
    <>
      {/* ── БЛОК 6: Калькулятор ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Калькулятор</span>
            <h2 className="section-h2">Рассчитайте<br />стоимость за минуту</h2>
          </div>
          <div className="calc-wrap">
            <div className="calc-controls">
              <div className="calc-row">
                <label className="calc-label">Выберите формат посещения</label>
                <div className="calc-types">
                  <button
                    className={`calc-type-btn ${calcDays === "full" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcDays("full")}
                  >
                    Полный абонемент
                  </button>
                  <button
                    className={`calc-type-btn ${calcDays === "short" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcDays("short")}
                  >
                    Короткий абонемент
                  </button>
                  <button
                    className={`calc-type-btn ${calcDays === "days" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcDays("days")}
                  >
                    Несколько дней
                  </button>
                </div>
              </div>
            </div>
            <div className="calc-result">
              <div className="calc-result-label">{selected.title}</div>
              <div className="calc-result-desc">{selected.desc}</div>
              {calcDays !== "days" && (
                <div className="calc-bonus">
                  <Icon name="Gift" size={16} />
                  Оставшиеся дни месяца — в подарок при покупке абонемента!
                </div>
              )}
              <div className="calc-result-note">Включает питание, занятия, прогулки и мероприятия</div>
              <button className="cta-btn cta-btn-primary" onClick={onOpenModal}>
                Узнать точную стоимость
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 7: FAQ ── */}
      <Section className="bg-white">
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
            <a href="https://vk.com/app6379730_-179759189#l=6" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-primary">
              Узнать о нас больше
              <Icon name="ArrowRight" size={18} />
            </a>
          </div>
        </div>
      </Section>

      {/* ── БЛОК 8: Команда ── */}
      <Section className="bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Наша команда</span>
            <h2 className="section-h2">Люди, которым<br />доверяют детей</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
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
        </div>
      </Section>

      {/* ── БЛОК 9: Галерея ── */}
      <Section className="bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Фотогалерея</span>
            <h2 className="section-h2">Загляните<br />к нам</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img} alt={`Фото ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}