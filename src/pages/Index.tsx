import { useState } from "react";
import HeroSection, { Modal } from "@/components/landing/HeroSection";
import SiteHeader from "@/components/landing/SiteHeader";
import InfoSections from "@/components/landing/InfoSections";
import ServicesSection from "@/components/landing/ServicesSection";
import CalculatorFaqTeam from "@/components/landing/CalculatorFaqTeam";
import FooterSections from "@/components/landing/FooterSections";
import SeoText from "@/components/landing/SeoText";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("excursion");

  const openModal = (source?: string) => {
    setModalSource(source || "excursion");
    setModalOpen(true);
  };

  return (
    <div className="ld">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />

      <SiteHeader onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <ServicesSection onOpenModal={openModal} />
      <InfoSections onOpenModal={openModal} />
      <CalculatorFaqTeam onOpenModal={openModal} />
      <FooterSections onOpenModal={openModal} />
      <SeoText />
    </div>
  );
}
