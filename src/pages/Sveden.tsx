import { MTO_SECTIONS } from "@/data/mto";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeo } from "@/lib/useSeo";
import { SVEDEN_DOCUMENTS, SVEDEN_STRUCT_DOCUMENTS, SVEDEN_LANG_DOCUMENTS, SVEDEN_PAID_DOCUMENTS, type SvedenDoc } from "./svedenDocuments";

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

const PAID_PRICES: string[] = [
  "Индивидуальное развивающее занятие с детьми 1-6 лет, продолжительность 35–45 минут — 500 рублей за одно занятие",
  "Индивидуальное развивающее занятие с детьми 5+ лет, продолжительность 40–45 минут — 700 рублей за одно занятие",
  "Групповые занятия по развитию личности для возрастных групп 4-5, 5-6, 6-7, 7-8, 8+ лет, продолжительность 60-90 минут — 1 000 рублей за одно занятие",
  "Групповые занятия по развитию личности для возрастной группы 10+, продолжительность 90-120 минут — 1 300 рублей за одно занятие",
];

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
  { title: "«Гениальный ребенок»", level: "дополнительное образование детей и взрослых", form: "очная форма", term: "1 год", url: "https://disk.yandex.ru/d/IHsXphCZm_V5PQ" },
];

const SECTIONS = [
  { id: "common", title: "Основные сведения" },
  { id: "struct", title: "Структура и органы управления образовательной организацией" },
  { id: "document", title: "Документы" },
  { id: "education", title: "Образование" },
  { id: "employees", title: "Руководство. Педагогический состав" },
  { id: "objects", title: "Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда" },
  { id: "paid_edu", title: "Платные образовательные услуги" },
  { id: "finance", title: "Финансово-хозяйственная деятельность" },
  { id: "vacant", title: "Вакантные места для приема (перевода) обучающихся" },
  { id: "grants", title: "Стипендии и меры поддержки обучающихся" },
  { id: "international", title: "Международное сотрудничество" },
  { id: "meals", title: "Организация питания в образовательной организации" },
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
          {sec.id === "employees" && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Руководство</h3>
              <p className="legal-p">
                Управление осуществляется на основании принципов единоначалия и в соответствии с действующим законодательством Российской Федерации.
              </p>
              <h3 className="text-lg font-semibold">Руководитель образовательной организации</h3>
              <p className="legal-p">ФИО: Савченко Ирина Игоревна</p>
              <p className="legal-p">Должность: Индивидуальный предприниматель</p>
              <p className="legal-p">ИНН: 911116164829</p>
              <p className="legal-p">Телефон: +7 (988) 152-16-98</p>
              <p className="legal-p">Электронная почта: ribkadolli@mail.ru</p>
              <p className="legal-p">На данный момент филиалов образовательной организации нет.</p>
              <p className="legal-p">
                Контактные данные руководства предназначены для связи по вопросам, связанным с образовательной деятельностью организации.
              </p>
              <p className="legal-p">Информация обновляется в случае изменений в составе руководства.</p>
            </div>
          )}
          {sec.id === "objects" && (
            <div className="space-y-3">
              {MTO_SECTIONS.map((m) => (
                <div key={m.title} className="space-y-2">
                  <h3 className="text-lg font-semibold">{m.title}</h3>
                  {m.blocks.map((b, i) =>
                    b.t === "ul" ? (
                      <ul key={i} className="list-disc pl-6 space-y-1">
                        {b.items.map((it) => (
                          <li key={it} className="legal-p">{it}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} className={b.t === "b" ? "legal-p font-medium" : "legal-p"}>{b.text}</p>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
          {sec.id === "paid_edu" && (
            <div className="space-y-3">
              <p className="legal-p">
                Образовательная организация предоставляет платные образовательные услуги в строгом соответствии с действующим законодательством Российской Федерации.
              </p>
              <h3 className="text-lg font-semibold">1. Порядок предоставления платных образовательных услуг</h3>
              <p className="legal-p">
                Обучение осуществляется на основании договора между образовательной организацией и обучающимся (или его законным представителем). Все условия оказания услуг регулируются внутренними нормативными актами.
              </p>
              <h3 className="text-lg font-semibold">2. Стоимость обучения в 2025/2026 учебном году</h3>
              <p className="legal-p">Тарифы утверждены приказом № 1 от 06 октября 2025 г.</p>
              <ul className="list-disc pl-6 space-y-1">
                {PAID_PRICES.map((t) => (
                  <li key={t} className="legal-p">{t}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold">Документы для скачивания</h3>
              <DocList docs={SVEDEN_PAID_DOCUMENTS} />
            </div>
          )}
          {sec.id === "finance" && (
            <div className="space-y-3">
              <p className="legal-p">
                Финансово-хозяйственная деятельность образовательной организации осуществляется в соответствии с законодательством Российской Федерации, обеспечивая прозрачность и эффективность использования финансовых ресурсов.
              </p>
              <h3 className="text-lg font-semibold">1. Источники финансирования образовательной деятельности</h3>
              <p className="legal-p">Финансирование образовательного процесса осуществляется за счет следующих источников:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="legal-p">Доходы от оказания платных образовательных услуг (в соответствии с заключенными договорами);</li>
                <li className="legal-p">Собственные средства организации;</li>
                <li className="legal-p">Иные поступления, не запрещенные законодательством РФ.</li>
              </ul>
            </div>
          )}
          {sec.id === "vacant" && (
            <div className="space-y-3">
              <p className="legal-p">В настоящее время вакантные места для приема (перевода) обучающихся отсутствуют.</p>
              <h3 className="text-lg font-semibold">1. Вакантные места, финансируемые за счет бюджетных ассигнований</h3>
              <p className="legal-p">На данный момент бюджетные места не предусмотрены.</p>
              <h3 className="text-lg font-semibold">2. Вакантные места, финансируемые по договорам об образовании за счет средств физических и (или) юридических лиц</h3>
              <p className="legal-p">На текущий момент свободных мест по договорам нет.</p>
              <p className="legal-p">
                Актуальная информация о наличии вакантных мест будет обновляться по мере изменений в образовательных программах и набора обучающихся.
              </p>
            </div>
          )}
          {sec.id === "grants" && (
            <div className="space-y-3">
              <p className="legal-p">В образовательной организации не предусмотрены стипендии и меры социальной поддержки обучающихся.</p>
              <h3 className="text-lg font-semibold">1. Стипендии</h3>
              <p className="legal-p">Стипендиальное обеспечение – не предусмотрено.</p>
              <h3 className="text-lg font-semibold">2. Меры социальной поддержки</h3>
              <p className="legal-p">Льготы и иные формы социальной поддержки – отсутствуют.</p>
              <h3 className="text-lg font-semibold">3. Общежитие и интернат</h3>
              <p className="legal-p">Образовательная организация не предоставляет общежитие и интернат для проживания обучающихся.</p>
            </div>
          )}
          {sec.id === "international" && (
            <div className="space-y-3">
              <p className="legal-p">
                Информация о заключенных и планируемых к заключению договорах с иностранными и (или) международными организациями по вопросам образования и науки (при наличии) - не имеется.
              </p>
              <p className="legal-p">Информация о международной аккредитации образовательных программ (при наличии) - не имеется.</p>
            </div>
          )}
          {sec.id === "meals" && (
            <div className="space-y-3">
              <p className="legal-p">Организация питания обучающихся не предусмотрена.</p>
              <h3 className="text-lg font-semibold">Питьевой режим</h3>
              <p className="legal-p">
                В образовательной организации организован и соблюдается питьевой режим: обучающимся обеспечивается свободный доступ к питьевой воде в течение всего времени пребывания в организации.
              </p>
            </div>
          )}
          {sec.id === "document" && <DocList docs={SVEDEN_DOCUMENTS} />}
        </section>
      ))}
    </div>
  );
}
