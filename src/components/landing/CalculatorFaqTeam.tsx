import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_LIST, TEAM, GALLERY } from "./constants";
import { Section } from "./InfoSections";

// ── CalculatorFaqTeam (блоки 6–9) ─────────────────────────────────────────
interface CalculatorFaqTeamProps {
  onOpenModal: () => void;
}

export default function CalculatorFaqTeam({ onOpenModal }: CalculatorFaqTeamProps) {
  const [calcDays, setCalcDays] = useState(5);
  const [calcHours, setCalcHours] = useState("full");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calcPrice = () => {
    const base = calcHours === "full" ? 18500 : 12500;
    return Math.round(base * (calcDays / 5));
  };

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
                <label className="calc-label">Дней в неделю</label>
                <div className="calc-days">
                  {[1, 2, 3, 4, 5].map(d => (
                    <button
                      key={d}
                      className={`calc-day-btn ${calcDays === d ? "calc-day-active" : ""}`}
                      onClick={() => setCalcDays(d)}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div className="calc-row">
                <label className="calc-label">Время пребывания</label>
                <div className="calc-types">
                  <button
                    className={`calc-type-btn ${calcHours === "full" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcHours("full")}
                  >
                    Полный день (7:30–19:00)
                  </button>
                  <button
                    className={`calc-type-btn ${calcHours === "short" ? "calc-type-active" : ""}`}
                    onClick={() => setCalcHours("short")}
                  >
                    Короткий (до 13:00)
                  </button>
                </div>
              </div>
            </div>
            <div className="calc-result">
              <div className="calc-result-label">Ваша стоимость в месяц</div>
              <div className="calc-result-price">{calcPrice().toLocaleString("ru-RU")} ₽</div>
              <div className="calc-result-note">Включает питание и все занятия</div>
              <button className="cta-btn cta-btn-primary" onClick={onOpenModal}>
                Записаться по этой цене
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
