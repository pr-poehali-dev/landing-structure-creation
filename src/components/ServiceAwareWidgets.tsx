import { useLocation } from "react-router-dom";
import ExitIntentPopup from "@/components/landing/ExitIntentPopup";
import CookieBanner from "@/components/landing/CookieBanner";

const SERVICE_PREFIXES = ["/dogovor", "/oferta", "/internal"];

export default function ServiceAwareWidgets() {
  const { pathname } = useLocation();
  if (SERVICE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return (
    <>
      <ExitIntentPopup />
      <CookieBanner />
    </>
  );
}
