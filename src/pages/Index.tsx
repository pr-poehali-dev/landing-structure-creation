import { useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection, { Modal } from "@/components/landing/HeroSection";
import { ymGoal } from "@/lib/ym";
import InfoSections from "@/components/landing/InfoSections";
import ServicesSection from "@/components/landing/ServicesSection";
import SummerSection from "@/components/landing/SummerSection";
import CalculatorFaqTeam from "@/components/landing/CalculatorFaqTeam";
import FooterSections from "@/components/landing/FooterSections";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <div className="ld">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Плавающая кнопка с выбором номера */}
      <div className="float-phone-wrap">
        {phoneMenuOpen && (
          <div className="float-phone-menu">
            <a href="tel:+79881521698" className="float-phone-option" onClick={() => { ymGoal('click_phone'); setPhoneMenuOpen(false); }}>
              <Icon name="Phone" size={15} />
              <div>
                <div className="float-phone-number">+7 (988) 152-16-98</div>
                <div className="float-phone-op">МТС</div>
              </div>
            </a>
            <a href="tel:+79787120353" className="float-phone-option" onClick={() => { ymGoal('click_phone'); setPhoneMenuOpen(false); }}>
              <Icon name="Phone" size={15} />
              <div>
                <div className="float-phone-number">+7 (978) 712-03-53</div>
                <div className="float-phone-op">Волна</div>
              </div>
            </a>
          </div>
        )}
        <button className="float-btn" onClick={() => { ymGoal('click_float_btn'); setPhoneMenuOpen(v => !v); }} title="Позвонить">
          <Icon name="Phone" size={20} />
        </button>
      </div>

      <HeroSection onOpenModal={openModal} />
      {/* <SummerSection /> — временно скрыт, вернуть при необходимости */}
      <ServicesSection onOpenModal={openModal} />
      <InfoSections onOpenModal={openModal} />
      <CalculatorFaqTeam onOpenModal={openModal} />
      <FooterSections onOpenModal={openModal} />
    </div>
  );
}