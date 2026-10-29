import { useLocation } from "@/lib/router-compat";
import CookieBanner from "@/components/landing/CookieBanner";

const SERVICE_PREFIXES = ["/dogovor", "/oferta", "/internal"];

export default function ServiceAwareWidgets() {
  const { pathname } = useLocation();
  if (SERVICE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return (
    <>
      <CookieBanner />
    </>
  );
}
