import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeo } from "@/lib/useSeo";

const SECTIONS = [
  { id: "common", title: "Основные сведения" },
  { id: "struct", title: "Структура и органы управления образовательной организацией" },
  { id: "document", title: "Документы" },
  { id: "education", title: "Образование" },
  { id: "employees", title: "Руководство. Педагогический состав" },
  { id: "objects", title: "Материально-техническое обеспечение" },
  { id: "paid_edu", title: "Платные образовательные услуги" },
];

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

      {SECTIONS.map((sec) => (
        <section key={sec.id} id={sec.id}>
          <h2 className="legal-h2">{sec.title}</h2>
        </section>
      ))}
    </div>
  );
}
