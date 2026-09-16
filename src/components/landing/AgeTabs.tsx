import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "4-5", label: "4-5 лет: Фундамент" },
  { id: "5-7", label: "5-7 лет: Предшкольная подготовка" },
];

// ── AgeTabs — липкий переключатель между секциями возрастных программ ──────
export default function AgeTabs() {
  const [active, setActive] = useState("4-5");
  const clickLock = useRef(false);

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setActive(id);
    clickLock.current = true;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      clickLock.current = false;
    }, 900);
  };

  return (
    <div className="age-tabs">
      <div className="container age-tabs-inner">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`age-tab-btn ${active === t.id ? "age-tab-active" : ""}`}
            onClick={() => goTo(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
