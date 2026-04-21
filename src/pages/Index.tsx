import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import HeroSection, { Modal } from "@/components/landing/HeroSection";
import InfoSections from "@/components/landing/InfoSections";
import CalculatorFaqTeam from "@/components/landing/CalculatorFaqTeam";
import FooterSections from "@/components/landing/FooterSections";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
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

      {/* Плавающая кнопка */}
      <button className="float-btn" onClick={openModal}>
        <Icon name="Calendar" size={20} />
        <span>Записаться</span>
      </button>

      <HeroSection onOpenModal={openModal} />
      <InfoSections onOpenModal={openModal} timerMm={mm} timerSs={ss} />
      <CalculatorFaqTeam onOpenModal={openModal} />
      <FooterSections onOpenModal={openModal} />
    </div>
  );
}
