import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import HeroSection, { Modal } from "@/components/landing/HeroSection";
import InfoSections from "@/components/landing/InfoSections";
import CalculatorFaqTeam from "@/components/landing/CalculatorFaqTeam";
import FooterSections from "@/components/landing/FooterSections";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [timerSec, setTimerSec] = useState(23 * 60 + 47);

  useEffect(() => {
    const t = setInterval(() => setTimerSec(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(timerSec / 60)).padStart(2, "0");
  const ss = String(timerSec % 60).padStart(2, "0");

  const openModal = () => setModalOpen(true);

  return (
    <div className="ld">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Плавающая кнопка с выбором номера */}
      <div className="float-phone-wrap">
        {phoneMenuOpen && (
          <div className="float-phone-menu">
            <a href="tel:+79881521680" className="float-phone-option" onClick={() => setPhoneMenuOpen(false)}>
              <Icon name="Phone" size={15} />
              <div>
                <div className="float-phone-number">+7 (988) 152-16-80</div>
                <div className="float-phone-op">МТС</div>
              </div>
            </a>
            <a href="tel:+79787120353" className="float-phone-option" onClick={() => setPhoneMenuOpen(false)}>
              <Icon name="Phone" size={15} />
              <div>
                <div className="float-phone-number">+7 (978) 712-03-53</div>
                <div className="float-phone-op">Волна</div>
              </div>
            </a>
          </div>
        )}
        <button className="float-btn" onClick={() => setPhoneMenuOpen(v => !v)}>
          <Icon name="Phone" size={20} />
          <span>Позвонить</span>
        </button>
      </div>

      <HeroSection onOpenModal={openModal} />
      <InfoSections onOpenModal={openModal} timerMm={mm} timerSs={ss} />
      <CalculatorFaqTeam onOpenModal={openModal} />
      <FooterSections onOpenModal={openModal} />
    </div>
  );
}