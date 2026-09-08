import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHECKLIST } from "./constants";
import { Section } from "./InfoSections";
import WaveDivider from "./WaveDivider";
import { ymGoal } from "@/lib/ym";

const SEND_CHECKLIST_URL = "https://functions.poehali.dev/34e49ad9-ee73-40be-bb8a-e56d71588fb0";

const UTM_PRODLENKA = "?utm_source=ribkadollilend&utm_medium=footer&utm_content=prodlenka";
const UTM_LETO = "?utm_source=ribkadollilend&utm_medium=footer&utm_content=leto";
const UTM_BLOG = "?utm_source=ribkadollilend&utm_medium=footer&utm_content=blog";

// ── FooterSections (блоки 12–15) ────────────────────────────────────────────
interface FooterSectionsProps {
  onOpenModal: (source?: string) => void;
  checklist?: string[];
  leadmagTitle?: string;
  leadmagSubtitle?: string;
  deficitNode?: React.ReactNode;
}

export default function FooterSections({
  onOpenModal,
  checklist = CHECKLIST,
  leadmagTitle = "Получите бесплатно",
  leadmagSubtitle = "Три полезных чек-листа для родителей — пришлём на почту",
  deficitNode,
}: FooterSectionsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;
    setLoading(true);
    await fetch(SEND_CHECKLIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    ymGoal('form_checklist_submit');
    setLoading(false);
    setDone(true);
  };

  return (
    <>
      <WaveDivider bg="var(--cream)" color="#e87c1e" />
      {/* ── БЛОК 12: Лид-магнит ── */}
      <Section className="bg-teal">
        <div className="container container-narrow">
          <div className="leadmag-wrap">
            <div className="leadmag-emoji">🎁</div>
            <h2 className="leadmag-title">{leadmagTitle}</h2>
            <p className="leadmag-sub">{leadmagSubtitle}</p>
            <ul className="leadmag-list">
              {checklist.map((item, i) => (
                <li key={i}><Icon name="CheckCircle" size={16} />{item}</li>
              ))}
            </ul>
            {!done ? (
              <form onSubmit={submitChecklist} className="leadmag-form">
                <input
                  className="leadmag-input"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  className="leadmag-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <label className="privacy-checkbox-label privacy-checkbox-label--light">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                  <span>Согласен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a></span>
                </label>
                <button type="submit" className="cta-btn cta-btn-white" disabled={loading || !agreed}>
                  {loading ? 'Отправляем...' : 'Получить чек-листы бесплатно'}
                  {!loading && <Icon name="ArrowRight" size={18} />}
                </button>
                <p className="leadmag-privacy">
                  <Icon name="Lock" size={11} /> Отправляя форму, вы соглашаетесь получать материалы блога blogribkadolli.ru
                </p>
              </form>
            ) : (
              <div className="leadmag-success">
                <Icon name="CheckCircle" size={32} />
                <p>Отлично, <strong>{name}</strong>! Чек-листы уже летят к вам на почту.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
      <WaveDivider bg="var(--teal)" color="#1b3a5c" />

      {/* ── БЛОК 14: Финальный CTA + мини-карта ── */}
      <Section id="footer" className="bg-dark">
        <div className="container container-narrow">
          <div className="final-cta">
            <div className="final-emoji">🌊</div>
            {deficitNode ?? (
              <h2 className="final-title">Свободных мест<br />осталось: ясли — <span className="clr-teal">2</span>, старшая — <span className="clr-teal">4</span></h2>
            )}
            <p className="final-sub">
              Не откладывайте — запишитесь на бесплатную экскурсию
              и убедитесь сами, что это именно тот садик, который вам нужен.
            </p>
            <div className="final-actions">
              <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_final_cta'); onOpenModal('excursion'); }}>
                Записаться на экскурсию
                <Icon name="ArrowRight" size={20} />
              </button>
              <a href="tel:+79881521698" className="cta-btn cta-btn-outline-light cta-btn-lg" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={18} />
                +7 (988) 152-16-98
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-outline-light cta-btn-lg"
                onClick={() => ymGoal('click_messenger')}
              >
                <Icon name="MessageCircle" size={18} />
                Спросить в MAX
              </a>
            </div>
          </div>
          <div className="map-wrap">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=120578628138"
              width="100%"
              height="280"
              frameBorder="0"
              allowFullScreen
              title="Детский сад Рыбка Долли на карте"
              style={{ borderRadius: "16px", display: "block" }}
            />
          </div>
        </div>
      </Section>

      {/* ── БЛОК 15: Футер ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">🌊 ДДЦ «Рыбка Долли»</div>
              <p>Частный детский сад в Керчи</p>
              <p>г. Керчь, ул. Циолковского, 12</p>
            </div>
            <div className="footer-links-col">
              <a
                href={`https://schooldolli.ru/${UTM_PRODLENKA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                onClick={() => ymGoal('click_footer_prodlenka')}
              >
                <Icon name="BookOpenCheck" size={15} /> Продлёнка
              </a>
              <a
                href={`https://dolliklub.ru/${UTM_LETO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                onClick={() => ymGoal('click_footer_summer')}
              >
                <Icon name="Sun" size={15} /> Летний клуб
              </a>
              <a
                href={`https://blogribkadolli.ru/${UTM_BLOG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                onClick={() => ymGoal('click_footer_blog')}
              >
                <Icon name="BookOpen" size={15} /> Блог
              </a>
              <a href="/privacy" className="footer-link">
                <Icon name="ShieldCheck" size={15} /> Политика конфиденциальности
              </a>
            </div>
            <div className="footer-contacts">
              <a href="tel:+79881521698" className="footer-link" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={15} /> +7 (988) 152-16-98 (МТС)
              </a>
              <a href="tel:+79787120353" className="footer-link" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={15} /> +7 (978) 712-03-53 (Волна)
              </a>
              <div className="footer-hours">
                <Icon name="Clock" size={15} /> Пн–Пт: 8:00–18:00
              </div>
              <div className="footer-messengers">
                <a
                  href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-messenger-btn footer-messenger-max"
                  aria-label="Написать в MAX"
                  onClick={() => ymGoal('click_messenger')}
                >
                  <Icon name="MessageCircle" size={18} />
                  <span>Написать в MAX</span>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ДДЦ «Рыбка Долли»</span>
            <span>ИП Савченко И.И. · ОГРНИП 318911200074795</span>
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline", fontSize: 12 }}>Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </>
  );
}