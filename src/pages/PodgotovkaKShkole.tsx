import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/landing/SiteHeader";
import AgeTabs from "@/components/landing/AgeTabs";
import { Modal } from "@/components/landing/HeroSection";
import StarshayaHeroSection from "@/components/landing/StarshayaHeroSection";
import AgeProgramSections from "@/components/landing/AgeProgramSections";
import StarshayaProgramSections from "@/components/landing/StarshayaProgramSections";
import StarshayaPricesReviewsFaq from "@/components/landing/StarshayaPricesReviewsFaq";
import FooterSections from "@/components/landing/FooterSections";
import { useSeo } from "@/lib/useSeo";
import { STARSHAYA_CHECKLIST } from "@/components/landing/constants";

export default function PodgotovkaKShkole() {
  useSeo(
    "Подготовка к школе в Керчи — ДДЦ «Рыбка Долли» | Чтение, письмо, математика, английский",
    "Старшая группа и подготовка к школе в Керчи на Циолковского, 12. Мини-группы до 12 детей, занятия по возрасту, логопед и английский. Свободно 4 места. Запишитесь на пробное занятие!"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("excursion");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (source?: string) => {
    setModalSource(source || "excursion");
    setModalOpen(true);
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }
    }
  }, []);

  return (
    <div className="ld theme-starshaya">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
      <SiteHeader onOpenModal={openModal} ctaLabel="Записаться на пробное занятие" />

      <div className="back-to-home-bar">
        <div className="container">
          <Link to="/" className="back-to-home-link">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
        </div>
      </div>

      <AgeTabs />

      <StarshayaHeroSection onOpenModal={openModal} />

      <AgeProgramSections onOpenModal={openModal} />

      <StarshayaProgramSections onOpenModal={openModal} />

      <StarshayaPricesReviewsFaq onOpenModal={openModal} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* БЛОК 14–16: Лид-магнит, финальный CTA, футер */}
      <FooterSections
        onOpenModal={openModal}
        checklist={STARSHAYA_CHECKLIST}
        leadmagTitle="Боитесь, что чтение в школе пойдёт со слезами?"
        leadmagSubtitle="Заберите 5 упражнений нашего педагога бесплатно"
        deficitNode={<h2 className="final-title">В старшей группе<br />свободно <span className="clr-teal">4</span> места</h2>}
      />

    </div>
  );
}
