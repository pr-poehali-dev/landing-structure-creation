import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { IMG_HERO, IMG_YASLI_HERO, IMG_FUNDAMENT_4_5, IMG_PREDSHKOLA_5_7, IMG_PODGOTOVKA_2X } from "./constants";
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
    <section className="hero-wrap-v2">
      <div className="hero-v2-bg">
        <img src={IMG_HERO} alt="Занятие с детьми старшей группы в частном детском садике Рыбка Долли в Керчи" />
        <div className="hero-v2-overlay" />
      </div>

      <div className="container hero-v2-content">
        <h1 className="hero-v2-h1">Частный детский сад «Рыбка Долли» в Керчи</h1>
        <p className="hero-v2-sub">
          Ясли с 1,5 лет и подготовка к школе в мини-группах до 12 детей.
          Лицензия, своя площадка, 4-разовое питание.
        </p>

        {/* Развилка */}
        <div className="hero-v2-fork hero-v2-fork-4">
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_YASLI_HERO})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-peach" />
            <div className="hero-fork-card-body">
              <div className="hero-fork-deficit">Свободно 2 места</div>
              <h3>Моему ребёнку 1,5-3 года</h3>
              <span className="hero-fork-format">Группа полного дня</span>
              <p>Мягкая адаптация и первые открытия</p>
              <Link to="/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli" className="cta-btn cta-btn-primary" onClick={() => ymGoal('click_fork_yasli')}>
                Страница яслей
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_FUNDAMENT_4_5})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-honey" />
            <div className="hero-fork-card-body">
              <div className="hero-fork-deficit">Свободно 1 место</div>
              <h3>Моему ребёнку 4-5 лет</h3>
              <span className="hero-fork-format">Группа полного дня</span>
              <p>Фундамент: учимся учиться через игру</p>
              <Link to="/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_fundament#4-5" className="cta-btn cta-btn-primary" onClick={() => ymGoal('click_fork_fundament')}>
                Программа 4-5
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_PREDSHKOLA_5_7})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-honey" />
            <div className="hero-fork-card-body">
              <div className="hero-fork-deficit">Свободно 2 места</div>
              <h3>Моему ребёнку 5-7 лет</h3>
              <span className="hero-fork-format">Группа полного дня</span>
              <p>Предшкольная подготовка: чтение, письмо, счёт и пробный урок</p>
              <Link to="/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_predshkola#5-7" className="cta-btn cta-btn-primary" onClick={() => ymGoal('click_fork_predshkola')}>
                Программа 5-7
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_PODGOTOVKA_2X})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-blue" />
            <div className="hero-fork-card-body">
              <h3>Подготовка к школе</h3>
              <span className="hero-fork-format">Занятия 2 раза в неделю</span>
              <p>Чтение, письмо, математика. Без полного пребывания</p>
              <Link to="/podgotovka-k-shkole-2-raza-v-nedelyu/?utm_source=main&utm_medium=internal&utm_campaign=hub_podgotovka2x" className="cta-btn cta-btn-blue" onClick={() => ymGoal('click_fork_podgotovka2x')}>
                Программа подготовки
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Промо-полоса акции «Скоро в школу» */}
        <div className="promo-strip">
          <Icon name="Star" size={22} className="promo-strip-star" />
          <div className="promo-strip-body">
            <span className="promo-strip-overline">акция до 31 октября</span>
            <h3 className="promo-strip-title">Бесплатная диагностика готовности к школе</h3>
            <p className="promo-strip-sub">
              40 минут игры с Ириной Павловной — и вы уносите карту готовности и план по месяцам.
              При записи в группу — скидка 1000 ₽ на первый месяц
            </p>
          </div>
          <Link
            to="/podgotovka-k-shkole/#5-7"
            className="cta-btn cta-btn-peach cta-btn-lg promo-strip-btn"
            onClick={() => ymGoal('click_promo_strip_diagnostics')}
          >
            Занять бесплатное место
            <Icon name="ArrowRight" size={18} />
          </Link>
        </div>

        {/* Строка доверия */}
        <div className="hero-v2-trust">
          <a href="https://yandex.ru/maps/-/CPCszO6I" target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('click_yandex_maps')}>
            <Icon name="Star" size={14} /> 4,9 на Яндекс Картах
          </a>
          <span><Icon name="ShieldCheck" size={14} /> Лицензия</span>
          <span><Icon name="MapPin" size={14} /> ул. Циолковского, 12</span>
        </div>

        {/* Тизер цены */}
        <p className="hero-v2-price-teaser">
          Стоимость от 20 000 ₽/мес, два формата на выбор — подробнее в разделе{" "}
          <a href="#prices">«Стоимость»</a>
        </p>

        {/* Плашка дефицита */}
        <div className="hero-v2-deficit">
          <Icon name="Clock" size={16} />
          Набор сентября: в яслях 2 места, в старшей группе 3 места
        </div>

        {/* CTA */}
        <div className="hero-v2-cta-row">
          <button className="cta-btn cta-btn-primary cta-btn-lg" onClick={() => { ymGoal('click_hero_cta'); onOpenModal('excursion'); }}>
            Записаться на бесплатную экскурсию
            <Icon name="ArrowRight" size={18} />
          </button>
          <a
            href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn-outline"
            onClick={() => ymGoal('click_messenger')}
          >
            <Icon name="MessageCircle" size={17} />
            Спросить в MAX
          </a>
        </div>
      </div>
    </section>
  );
}