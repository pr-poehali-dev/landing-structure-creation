import { useEffect } from "react";
import ReadinessMapAdmin from "./ReadinessMapAdmin";

// ── ReadinessMapAdminPage — обёртка непубличного роута: noindex + заголовок ─
export default function ReadinessMapAdminPage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Карта готовности — служебный раздел";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return <ReadinessMapAdmin />;
}
