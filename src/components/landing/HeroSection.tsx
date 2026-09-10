import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { IMG_HERO, IMG_YASLI_HERO, IMG_STARSHAYA_HERO } from "./constants";
import { ymGoal } from "@/lib/ym";
import ConsentCheckbox from "./ConsentCheckbox";

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, source = 'excursion' }: { open: boolean; onClose: () => void; source?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed) return;
    setLoading(true);
    await sendLead(name, phone, '', `Модальное окно (${source})`);
    ymGoal('form_modal_submit');
    ymGoal(source === 'calculator' ? 'form_calculator_submit' : 'form_excursion_submit');
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
              <h3 className="modal-title">Запишитесь на экскурсию</h3>
              <p className="modal-sub">Бесплатно. Без обязательств. Просто посмотрите.</p>
            </div>
            <form onSubmit={submit} className="modal-form">
              <input className="modal-input" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
              <input className="modal-input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
              <ConsentCheckbox checked={agreed} onChange={setAgreed} />
              <button type="submit" className="cta-btn cta-btn-lg cta-btn-primary" disabled={loading || !agreed}>
                {loading ? 'Отправляем...' : 'Хочу на экскурсию'}
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

async function sendLead(name: string, phone: string, age: string, source: string) {
  await fetch(SEND_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, age, source }),
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
        <div className="hero-v2-fork">
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_YASLI_HERO})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-peach" />
            <div className="hero-fork-card-body">
              <div className="hero-fork-deficit">Свободно 2 места</div>
              <div className="hero-fork-emoji">🧸</div>
              <h3>Моему ребёнку 1,5–3 года</h3>
              <p>Мягкая адаптация, забота и первые шаги в развитии</p>
              <Link to="/yasli/?utm_source=main&utm_medium=internal&utm_campaign=hub_yasli" className="cta-btn cta-btn-primary" onClick={() => ymGoal('click_fork_yasli')}>
                Страница яслей
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
          <div
            className="hero-fork-card hero-fork-card-photo"
            style={{ backgroundImage: `url(${IMG_STARSHAYA_HERO})` }}
          >
            <div className="hero-fork-overlay hero-fork-overlay-honey" />
            <div className="hero-fork-card-body">
              <div className="hero-fork-deficit">Свободно 4 места</div>
              <div className="hero-fork-emoji">🎓</div>
              <h3>Моему ребёнку 4–6 лет</h3>
              <p>Осознанная подготовка к школе по программе ФГОС</p>
              <Link to="/podgotovka-k-shkole/?utm_source=main&utm_medium=internal&utm_campaign=hub_starshaya" className="cta-btn cta-btn-primary" onClick={() => ymGoal('click_fork_school')}>
                Старшая группа
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
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
          Набор сентября: в яслях 2 места, в старшей группе 4 места
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