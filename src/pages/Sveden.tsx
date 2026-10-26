import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeo } from "@/lib/useSeo";
import { SVEDEN_DOCUMENTS, SVEDEN_STRUCT_DOCUMENTS, SVEDEN_LANG_DOCUMENTS, type SvedenDoc } from "./svedenDocuments";

const DocList = ({ docs }: { docs: SvedenDoc[] }) => (
  <ul className="space-y-2">
    {docs.map((d) => (
      <li key={d.url}>
        <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-primary underline">
          <Icon name="FileText" size={18} className="mt-0.5 shrink-0" />
          <span>{d.title} (PDF)</span>
        </a>
      </li>
    ))}
  </ul>
);

const COMMON_INFO: { label: string; lines: string[] }[] = [
  { label: "Полное наименование", lines: ["ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ САВЧЕНКО ИРИНА ИГОРЕВНА"] },
  { label: "Сокращенное наименование", lines: ["ИП САВЧЕНКО ИРИНА ИГОРЕВНА"] },
  { label: "Дата регистрации", lines: ["17.09.2018"] },
  { label: "Наименование представительств и филиалов образовательной организации", lines: ["Отсутствуют"] },
  { label: "Место нахождения образовательной организации", lines: ["Республика Крым, город Керчь"] },
  { label: "Режим и график работы", lines: ["понедельник - пятница с 08:00 — 17:00", "суббота, воскресенье - выходные"] },
  { label: "Контакты", lines: ["Телефон: +7 (988) 152-16-98", "Электронная почта: ribkadolli@mail.ru"] },
  { label: "Лицензия на осуществление образовательной деятельности", lines: ["№ Л035-01251-91/03250491 от 23.09.2025"] },
];

const PROGRAMS: { title: string; level: string; form: string; term: string; url: string }[] = [
  { title: "РОДИТЕЛЬСКАЯ ШКОЛА: РАННЕЕ РАЗВИТИЕ ДЕТЕЙ", level: "дополнительное образование детей и взрослых", form: "с применением электронного обучения, дистанционных образовательных технологий", term: "6 недель", url: "https://disk.yandex.ru/i/mLUQXAtMHhsEqQ" },
  { title: "«Гениальный ребенок»", level: "дополнительное образование детей и взрослых", form: "с применением электронного обучения, дистанционных образовательных технологий", term: "1 год", url: "https://disk.yandex.ru/d/4lV7J89w4WEEww" },
  { title: "«Гениальный ребенок»", level: "", form: "очная форма", term: "1 год", url: "https://disk.yandex.ru/d/IHsXphCZm_V5PQ" },
];

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
          {sec.id === "common" && (
            <div className="space-y-4">
              {COMMON_INFO.map((item) => (
                <div key={item.label}>
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="legal-p">{l}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {sec.id === "struct" && (
            <div className="space-y-3">
              <p className="legal-p">
                ИП Савченко Ирина Игоревна осуществляет свою деятельность на основе единоначалия, без выделения отдельных структурных
                подразделений. Управление образовательной организацией осуществляется в соответствии с Федеральным законом от 29 декабря
                2012 г. № 273-ФЗ "Об образовании в Российской Федерации" и локальными нормативными актами.
              </p>
              <h3 className="text-lg font-semibold">Руководство образовательной организацией</h3>
              <p className="legal-p">Общее руководство осуществляет Савченко Ирина Игоревна</p>
              <p className="legal-p">Место нахождения: Республика Крым, город Керчь</p>
              <h3 className="text-lg font-semibold">Документы, регламентирующие управление образовательной организацией</h3>
              <DocList docs={SVEDEN_STRUCT_DOCUMENTS} />
            </div>
          )}
          {sec.id === "education" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Реализуемые образовательные программы</h3>
              {PROGRAMS.map((p, i) => (
                <div key={i} className="space-y-1">
                  <p className="legal-p font-medium">{i + 1}. {p.title}</p>
                  {p.level && <p className="legal-p">Уровень образования: {p.level}</p>}
                  <p className="legal-p">Форма обучения: {p.form}</p>
                  <p className="legal-p">Нормативный срок обучения: {p.term}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline">
                    <Icon name="ExternalLink" size={18} />
                    <span>Программа</span>
                  </a>
                </div>
              ))}
              <h3 className="text-lg font-semibold">Язык образования</h3>
              <p className="legal-p">Образовательная деятельность ведется на русском языке.</p>
              <DocList docs={SVEDEN_LANG_DOCUMENTS} />
            </div>
          )}
          {sec.id === "document" && <DocList docs={SVEDEN_DOCUMENTS} />}
        </section>
      ))}
    </div>
  );
}
