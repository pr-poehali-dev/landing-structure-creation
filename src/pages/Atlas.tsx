import { Link } from "@/lib/router-compat";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/landing/SiteHeader";
import AtlasLeadForm from "@/components/atlas/AtlasLeadForm";
import { ymGoal } from "@/lib/ym";
import { ATLAS_HERO_IMG, ATLAS_PAGE_IMG, ATLAS_PROGRAMS, ATLAS_SAFETY, ATLAS_FEATURES } from "@/components/atlas/atlasData";

const scrollToForm = () => {
  ymGoal("click_atlas_cta");
  document.getElementById("atlas-form")?.scrollIntoView({ behavior: "smooth" });
};

const h2 = "font-serif text-[clamp(30px,6vw,48px)] font-normal leading-tight text-[var(--text-main)]";

export default function Atlas() {
  return (
    <div className="ld bg-[var(--cream)] text-[var(--text-main)]">
      <SiteHeader onOpenModal={scrollToForm} ctaLabel="Записаться на экскурсию" />

      <section className="relative overflow-hidden" style={{ background: "var(--hero-bg)" }}>
        <div className="container grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-20">
          <div className="order-2 md:order-1">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--teal-dark)]">
              <Icon name="Sparkles" size={14} /> Новинка в Керчи
            </span>
            <h1 className="mb-5 font-serif text-[clamp(32px,7vw,56px)] font-normal leading-[1.1]">
              Первый в Керчи детский центр с цифровой экосистемой «Атлас достижений»
            </h1>
            <p className="mb-8 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              Мы не просто присматриваем за детьми. Мы строим их будущее, фиксируя каждый шаг, успех и открытие в персональном цифровом профиле.
            </p>
            <button onClick={scrollToForm} className="cta-btn cta-btn-primary cta-btn-lg w-full justify-center sm:w-auto">
              Записаться на экскурсию и увидеть Атлас вживую
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={ATLAS_HERO_IMG}
              alt="Педагог работает с «Атласом достижений» в уютной группе детского центра"
              className="w-full rounded-3xl object-cover shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">Прозрачность 24/7</span>
            <h2 className={`${h2} mb-5`}>Больше, чем просто детский центр</h2>
            <p className="mb-4 leading-relaxed text-[var(--text-muted)]">
              В обычных центрах вы узнаете о дне ребенка из короткого разговора у раздевалки: «Он хорошо покушал и поспал». В «Рыбке Долли» вы получаете прозрачность 24/7. Ежедневные фотоотчеты, обратная связь от воспитателя, ежемесячные подробные отчеты о бытовых навыках, навыках социализации и прочих, игровые задания и подарки для мам как благодарность за вашу вовлеченность.
            </p>
            <p className="mb-6 leading-relaxed">
              И главный подарок от нас — <strong>«Книга успеха»</strong> вашего ребенка. Атлас шаг за шагом формирует ее, и в конце года вы получаете полный отчет о том, как ваш ребенок развивался и рос в нашем центре.
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ATLAS_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-medium shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--teal-light)] text-[var(--teal-dark)]">
                    <Icon name={f.icon} size={20} />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={ATLAS_PAGE_IMG}
            alt="Страница «Атласа достижений»: дни в центре, выполненные задания, жемчужины и навыки малыша"
            className="w-full rounded-3xl shadow-2xl"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">Наши программы</span>
            <h2 className={h2}>Атлас работает на каждом возрасте</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ATLAS_PROGRAMS.map((p) => {
              const btn = (
                <>
                  {p.cta} <Icon name="ArrowRight" size={16} />
                </>
              );
              const cls = "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)] hover:underline";
              return (
                <article key={p.title} className="flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-[var(--cream)] transition-shadow hover:shadow-lg">
                  <img src={p.image} alt={p.imageAlt} loading="lazy" className="aspect-square w-full object-cover object-top" />
                  <div className="flex flex-1 flex-col p-6">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--teal)] text-white">
                    <Icon name={p.icon} size={28} />
                  </span>
                  <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--teal-dark)]">{p.age}</span>
                  <h3 className="mb-3 font-serif text-2xl">{p.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">{p.text}</p>
                  {p.external ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{btn}</a>
                  ) : (
                    <Link to={p.href} className={cls}>{btn}</Link>
                  )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container container-narrow">
          <div className="mb-8 text-center">
            <h2 className={`${h2} mb-5`}>Атлас — это наша гордость!</h2>
            <p className="leading-relaxed text-[var(--text-muted)]">
              Такого вы не встретите ни в одном детском центре города. Но мы гордимся не только этим. Мы гордимся всей системой, которую наша команда выстроила с любовью и заботой к детям и родителям. И одно из главных мест в этой системе занимает безопасная среда.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {ATLAS_SAFETY.map((s) => (
              <li key={s.text} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--teal-light)] text-[var(--teal-dark)]">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-medium">{s.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link to="/sveden" className="inline-flex items-center gap-2 font-semibold text-[var(--teal-dark)] underline underline-offset-4">
              <Icon name="FileText" size={18} /> Посмотреть наши документы и лицензию
            </Link>
          </div>
        </div>
      </section>

      <section id="atlas-form" className="scroll-mt-20 py-14 md:py-20" style={{ background: "var(--dark-bg)" }}>
        <div className="container grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-white">
            <h2 className="mb-5 font-serif text-[clamp(30px,6vw,48px)] font-normal leading-tight">
              Лучше один раз увидеть, чем сто раз прочитать
            </h2>
            <p className="mb-8 leading-relaxed text-white/80">
              Приходите к нам на бесплатную экскурсию. Мы покажем группы, познакомим с педагогами и продемонстрируем, как работает «Атлас достижений» на реальном примере.
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="mt-0.5 shrink-0 text-[#ffb87a]" />
                г. Керчь, ул. Циолковского, д. 12, кв. 13, 14
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={20} className="shrink-0 text-[#ffb87a]" />
                <a href="tel:+79881521698" onClick={() => ymGoal("click_phone")} className="font-semibold hover:underline">
                  +7 (988) 152-16-98
                </a>
              </li>
            </ul>
          </div>
          <AtlasLeadForm />
        </div>
        <div className="container mt-10">
          <iframe
            src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=120578628138"
            width="100%"
            height="320"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Детский центр Рыбка Долли на карте"
            style={{ borderRadius: "20px", display: "block" }}
          />
        </div>
      </section>

      <footer className="bg-[#10263d] py-6 text-center text-sm text-white/60">
        <div className="container">
          ДДЦ «Рыбка Долли», ИП Савченко И.И. ·{" "}
          <Link to="/privacy" className="underline">Политика конфиденциальности</Link>
        </div>
      </footer>
    </div>
  );
}
