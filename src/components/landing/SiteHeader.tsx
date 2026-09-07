import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";

const NAV_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Ясли", href: "/yasli/" },
  { label: "Старшая группа", href: "/podgotovka-k-shkole/" },
  { label: "Стоимость", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#footer" },
];

interface SiteHeaderProps {
  onOpenModal: (source?: string) => void;
}

export default function SiteHeader({ onOpenModal }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-header-logo">
            <img
              src="https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png"
              alt="Рыбка Долли"
            />
          </Link>

          <nav className="site-header-nav">
            {NAV_LINKS.map((l) =>
              l.href.startsWith("#") ? (
                <a key={l.label} href={location.pathname === "/" ? l.href : `/${l.href}`} className="site-header-nav-link" onClick={() => handleNavClick(l.href)}>
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`site-header-nav-link ${location.pathname === l.href ? "site-header-nav-link-active" : ""}`}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="site-header-actions">
            <a href="tel:+79881521698" className="site-header-phone" onClick={() => ymGoal('click_phone')}>
              <Icon name="Phone" size={15} />
              <span>+7 (988) 152-16-98</span>
            </a>
            <a href="tel:+79787120353" className="site-header-phone site-header-phone-alt" onClick={() => ymGoal('click_phone')}>
              <Icon name="Phone" size={15} />
              <span>+7 (978) 712-03-53</span>
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-max"
              aria-label="Написать в MAX"
              onClick={() => ymGoal('click_messenger')}
            >
              <Icon name="MessageCircle" size={17} />
            </a>
            <button className="cta-btn cta-btn-primary site-header-cta" onClick={() => { ymGoal('click_header_cta'); onOpenModal('excursion'); }}>
              Записаться на экскурсию
            </button>
          </div>

          <button className="site-header-burger" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
            <Icon name="Menu" size={26} />
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">
              <Icon name="X" size={24} />
            </button>
            <nav className="mobile-menu-nav">
              {NAV_LINKS.map((l) =>
                l.href.startsWith("#") ? (
                  <a key={l.label} href={location.pathname === "/" ? l.href : `/${l.href}`} className="mobile-menu-link" onClick={() => handleNavClick(l.href)}>
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.href}
                    className={`mobile-menu-link ${location.pathname === l.href ? "mobile-menu-link-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
            <div className="mobile-menu-contacts">
              <a href="tel:+79881521698" className="mobile-menu-phone" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={16} /> +7 (988) 152-16-98
              </a>
              <a href="tel:+79787120353" className="mobile-menu-phone" onClick={() => ymGoal('click_phone')}>
                <Icon name="Phone" size={16} /> +7 (978) 712-03-53
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOIhbnzQELXr9pYLpa3UrPFtm6a-qdComLrDEwRysIA_MF93vG4"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-phone"
                onClick={() => ymGoal('click_messenger')}
              >
                <Icon name="MessageCircle" size={16} /> Написать в MAX
              </a>
            </div>
            <button
              className="cta-btn cta-btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={() => { setMenuOpen(false); ymGoal('click_header_cta'); onOpenModal('excursion'); }}
            >
              Записаться на экскурсию
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Липкая нижняя панель — мобильные */}
      <div className="sticky-bottom-bar">
        <a href="tel:+79881521698" className="sticky-bottom-phone" onClick={() => ymGoal('click_phone')}>
          <Icon name="Phone" size={18} />
        </a>
        <button className="sticky-bottom-cta" onClick={() => { ymGoal('click_sticky_cta'); onOpenModal('excursion'); }}>
          Записаться на экскурсию
        </button>
      </div>
    </>
  );
}