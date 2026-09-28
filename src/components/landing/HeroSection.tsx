import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";
import ConsentCheckbox from "./ConsentCheckbox";
import { MODAL_CONTENT, CHILD_AGE_OPTIONS, LEAD_GOAL_BY_TYPE, deriveModalType, type ModalType } from "./modalContent";
import PhoneField from "./PhoneField";
import { isPhoneComplete, normalizePhoneForCrm } from "@/lib/phone";

// ── Modal ──────────────────────────────────────────────────────────────────
// Контекстная модалка заявки: содержимое и цель зависят от type (tour | diagnostics).
// source по-прежнему определяет текст для письма/CRM (откуда конкретно пришла заявка).
export function Modal({
  open,
  onClose,
  source = 'excursion',
  type,
}: {
  open: boolean;
  onClose: () => void;
  source?: string;
  type?: ModalType;
}) {
  const modalType: ModalType = deriveModalType(source, type);
  const content = MODAL_CONTENT[modalType];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setAge("");
      setComment("");
      setAgreed(false);
      setDone(false);
      setLoading(false);
      setSubmitAttempted(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!name) ymGoal('form_error', { field: 'name' });
    if (!isPhoneComplete(phone)) ymGoal('form_error', { field: 'phone' });
    if (!name || !isPhoneComplete(phone) || !agreed) return;
    setLoading(true);
    await sendLead(name, normalizePhoneForCrm(phone), age, `Модальное окно (${source})`, comment, modalType);
    ymGoal(LEAD_GOAL_BY_TYPE[modalType], { application_type: modalType, source });
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="X" size={20} /></button>
        {!done ? (
          <>
            <div className="modal-header">
              <span className="modal-emoji">🌟</span>
              <h3 className="modal-title-playfair">{content.title}</h3>
              <p className="modal-sub">{content.subtitle}</p>
            </div>
            <form onSubmit={submit} className="modal-form">
              <div className="modal-field-group">
                <input
                  className={`modal-input ${submitAttempted && !name ? "modal-input-error" : ""}`}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {submitAttempted && !name && (
                  <p className="modal-field-error"><Icon name="AlertCircle" size={13} /> Укажите имя</p>
                )}
              </div>
              <PhoneField value={phone} onChange={setPhone} submitAttempted={submitAttempted} />
              <select className="modal-input modal-select" value={age} onChange={e => setAge(e.target.value)}>
                <option value="">Возраст ребёнка</option>
                {CHILD_AGE_OPTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <textarea
                className="modal-input modal-textarea"
                placeholder="Комментарий (необязательно)"
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
              />
              <ConsentCheckbox checked={agreed} onChange={setAgreed} />
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={loading || !agreed}>
                {loading ? 'Отправляем...' : content.submitLabel}
                {!loading && <Icon name="ArrowRight" size={18} />}
              </button>
              <p className="modal-privacy"><Icon name="Lock" size={11} /> Данные не передаём третьим лицам</p>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <span className="success-big-emoji">🎉</span>
            <h3 className="modal-title">Отлично!</h3>
            <p className="modal-sub">Мы позвоним вам в течение дня, в рабочее время.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

async function sendLead(name: string, phone: string, age: string, source: string, comment: string, applicationType: ModalType) {
  await fetch(SEND_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, age, source, comment, application_type: applicationType }),
  });
}

// ── HeroSection (БЛОК 2: Первый экран) ──────────────────────────────────────
interface HeroSectionProps {
  onOpenModal: (source?: string) => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="hero-wrap-v3">
      <span className="hero-v3-blob hero-v3-blob-sage" aria-hidden="true" />
      <span className="hero-v3-blob hero-v3-blob-lavender" aria-hidden="true" />

      <div className="container hero-v3-content">
        <h1 className="hero-v3-h1">Частный детский сад «Рыбка Долли» в Керчи</h1>
        <p className="hero-v3-sub">
          Ясли с 1,5 лет и подготовка к школе в мини-группах до 12 детей.
          Лицензия, своя площадка, 4-разовое питание.
        </p>

        {/* Строка доверия */}
        <div className="hero-v3-trust">
          <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('click_yandex_maps')}>
            <Icon name="Star" size={14} /> 4,9 на Яндекс Картах
          </a>
          <span><Icon name="ShieldCheck" size={14} /> Лицензия</span>
          <span><Icon name="MapPin" size={14} /> ул. Циолковского, 12</span>
        </div>

        {/* CTA */}
        <div className="hero-v2-cta-row">
          <button className="cta-btn cta-btn-terracotta cta-btn-lg" onClick={() => { ymGoal('click_hero_cta'); onOpenModal('excursion'); }}>
            Записаться на экскурсию
            <Icon name="ArrowRight" size={18} />
          </button>
          <a
            href="#services"
            className="cta-btn cta-btn-outline-terracotta cta-btn-lg"
            onClick={(e) => {
              e.preventDefault();
              ymGoal('click_hero_programs');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Посмотреть программы
          </a>
        </div>
      </div>
    </section>
  );
}