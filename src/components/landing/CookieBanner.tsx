import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <Icon name="Cookie" size={20} className="cookie-icon" />
        <p className="cookie-text">
          Мы используем файлы cookie для улучшения работы сайта и аналитики.
          Продолжая пользоваться сайтом, вы соглашаетесь с нашей{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.
        </p>
        <button className="cookie-btn" onClick={accept}>Понятно</button>
      </div>
    </div>
  );
}
