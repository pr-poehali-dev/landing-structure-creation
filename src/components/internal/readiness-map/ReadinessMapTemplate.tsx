import Icon from "@/components/ui/icon";
import qrBlog from "@/assets/readiness-map-qr.png";
import {
  READINESS_PARAMS,
  VERDICTS,
  MAX_TOTAL_SCORE,
  calcTotalScore,
  type ReadinessMapData,
} from "./types";

const LOGO_URL =
  "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png";

// ── ReadinessMapTemplate — печатный шаблон «Карта готовности» (А4, 2 листа) ─
// Заполненная версия: передать data. Пустой бланк: data = EMPTY_READINESS_MAP.
interface ReadinessMapTemplateProps {
  data: ReadinessMapData;
}

export default function ReadinessMapTemplate({ data }: ReadinessMapTemplateProps) {
  const total = calcTotalScore(data.scores);

  return (
    <div className="rm-doc">
      {/* ═══════════════════ ЛИСТ 1 ═══════════════════ */}
      <section className="rm-page">
        <header className="rm-header">
          <img src={LOGO_URL} alt="Рыбка Долли" className="rm-logo" />
          <div className="rm-header-text">
            <span className="rm-overline">диагностика в центре «Рыбка Долли»</span>
            <h1 className="rm-title">Карта готовности</h1>
          </div>
        </header>

        <div className="rm-anketa">
          <div className="rm-anketa-field">
            <span className="rm-anketa-label">Ребёнок</span>
            <span className="rm-anketa-value">{data.childName || "\u00A0"}</span>
          </div>
          <div className="rm-anketa-field rm-anketa-field-sm">
            <span className="rm-anketa-label">Возраст</span>
            <span className="rm-anketa-value">{data.childAge || "\u00A0"}</span>
          </div>
          <div className="rm-anketa-field rm-anketa-field-sm">
            <span className="rm-anketa-label">Дата</span>
            <span className="rm-anketa-value">{data.date || "\u00A0"}</span>
          </div>
          <div className="rm-anketa-field">
            <span className="rm-anketa-label">Провела</span>
            <span className="rm-anketa-value">Ирина Павловна, учитель начальных классов</span>
          </div>
        </div>

        <div className="rm-card rm-card-shines">
          <h2 className="rm-card-title">
            <Icon name="Sparkles" size={18} />
            Что уже сияет
          </h2>
          <div className="rm-shine-line">
            <span className="rm-shine-num">1</span>
            <span className="rm-shine-text">{data.strengths[0] || "\u00A0"}</span>
          </div>
          <div className="rm-shine-line">
            <span className="rm-shine-num">2</span>
            <span className="rm-shine-text">{data.strengths[1] || "\u00A0"}</span>
          </div>
        </div>

        <div className="rm-params">
          {READINESS_PARAMS.map((p) => (
            <div key={p.id} className="rm-param">
              <div className="rm-param-head">
                <span className="rm-param-num">{p.number}</span>
                <div className="rm-param-titles">
                  <span className="rm-param-title">{p.title}</span>
                  {p.hint && <span className="rm-param-hint">{p.hint}</span>}
                </div>
                <div className="rm-param-scale" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`rm-scale-dot ${data.scores[p.id] === n ? "rm-scale-dot-filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className="rm-param-comment">
                <span className="rm-comment-label">Комментарий:</span>
                <span className="rm-comment-line">{data.comments[p.id] || "\u00A0"}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="rm-page-num">1 / 2</p>
      </section>

      {/* ═══════════════════ ЛИСТ 2 ═══════════════════ */}
      <section className="rm-page">
        <div className="rm-card rm-card-verdict">
          <h2 className="rm-card-title">
            <Icon name="Target" size={18} />
            Вывод
          </h2>
          <div className="rm-verdict-row">
            <div className="rm-total-circle">
              <span className="rm-total-num">{total || "__"}</span>
              <span className="rm-total-of">из {MAX_TOTAL_SCORE}</span>
            </div>
            <div className="rm-verdict-checks">
              {VERDICTS.map((v) => (
                <label key={v.key} className="rm-check-row">
                  <span className={`rm-checkbox ${data.verdict === v.key ? "rm-checkbox-checked" : ""}`}>
                    {data.verdict === v.key && <Icon name="Check" size={13} />}
                  </span>
                  {v.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rm-tracks-row">
          <div className="rm-card rm-card-track">
            <h3 className="rm-track-title">Дорожка</h3>
            <label className="rm-check-row">
              <span className={`rm-checkbox ${data.track === "foundation-4-5" ? "rm-checkbox-checked" : ""}`}>
                {data.track === "foundation-4-5" && <Icon name="Check" size={13} />}
              </span>
              Фундамент 4-5
            </label>
            <label className="rm-check-row">
              <span className={`rm-checkbox ${data.track === "preschool-5-7" ? "rm-checkbox-checked" : ""}`}>
                {data.track === "preschool-5-7" && <Icon name="Check" size={13} />}
              </span>
              Предшкольная 5-7
            </label>
          </div>
          <div className="rm-card rm-card-track">
            <h3 className="rm-track-title">Формат</h3>
            <label className="rm-check-row">
              <span className={`rm-checkbox ${data.format === "group" ? "rm-checkbox-checked" : ""}`}>
                {data.format === "group" && <Icon name="Check" size={13} />}
              </span>
              Группа
            </label>
            <label className="rm-check-row">
              <span className={`rm-checkbox ${data.format === "individual" ? "rm-checkbox-checked" : ""}`}>
                {data.format === "individual" && <Icon name="Check" size={13} />}
              </span>
              Индивидуально
            </label>
          </div>
        </div>

        <div className="rm-card rm-card-plan">
          <h2 className="rm-card-title">
            <Icon name="CalendarDays" size={18} />
            План по месяцам
          </h2>
          {data.monthlyPlan.map((line, i) => (
            <div key={i} className="rm-plan-line">
              <span className="rm-plan-num">{i + 1}</span>
              <span className="rm-plan-text">{line || "\u00A0"}</span>
            </div>
          ))}
        </div>

        <div className="rm-card rm-card-home">
          <h2 className="rm-card-title">
            <Icon name="Home" size={18} />
            Что делать дома
          </h2>
          <p className="rm-home-text">{data.homeActivities || "\u00A0"}</p>
        </div>

        <div className="rm-signature-row">
          <div className="rm-signature-block">
            {data.signatureImage ? (
              <img src={data.signatureImage} alt="Подпись" className="rm-signature-img" />
            ) : (
              <span className="rm-signature-line" />
            )}
            <span className="rm-signature-caption">Ирина Павловна, учитель начальных классов</span>
          </div>
        </div>

        <div className="rm-footer">
          <div className="rm-footer-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
              <path d="M0,20 C150,40 350,0 600,16 C850,32 1050,4 1200,18 L1200,40 L0,40 Z" fill="#E8985F" />
            </svg>
          </div>
          <div className="rm-footer-inner">
            <div className="rm-footer-contacts">
              <span>ДДЦ «Рыбка Долли»</span>
              <span>+7 (988) 152-16-98</span>
              <span>ул. Циолковского, 12, Керчь</span>
            </div>
            <div className="rm-footer-qr">
              <img src={qrBlog} alt="QR-код на блог" />
              <span className="rm-footer-qr-caption">а вот ещё советы вам на неделю</span>
            </div>
          </div>
          <p className="rm-footer-method">
            Методическая основа: программа дошкольной подготовки Н. А. Федосовой, Е. В. Колесниковой;
            диагностика опирается на понятие зоны ближайшего развития Л. С. Выготского.
          </p>
        </div>

        <p className="rm-page-num">2 / 2</p>
      </section>
    </div>
  );
}
