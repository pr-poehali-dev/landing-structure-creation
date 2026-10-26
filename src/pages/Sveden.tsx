import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeo } from "@/lib/useSeo";

export default function Sveden() {
  useSeo(
    "Сведения об образовательной организации — ДДЦ «Рыбка Долли»",
    "Сведения об образовательной организации ДДЦ «Рыбка Долли» (ИП Савченко Ирина Игоревна)."
  );

  return (
    <div className="legal-page">
      <Link to="/" className="legal-back">
        <Icon name="ArrowLeft" size={16} /> На главную
      </Link>

      <h1 className="legal-h1">Сведения об образовательной организации</h1>
      <p className="legal-org">Индивидуальный предприниматель Савченко Ирина Игоревна (ДДЦ «Рыбка Долли»)</p>
    </div>
  );
}
