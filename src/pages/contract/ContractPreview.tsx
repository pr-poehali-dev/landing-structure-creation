import { Button } from "@/components/ui/button";
import type { ContractForm } from "./formUtils";

import { KINDS } from "./kinds";
import { HALF_GROUPS } from "./shifts";

const TARIFF_LABELS: Record<string, { name: string; price: string }> = {
  basic: { name: "«Основной»", price: "25 000 руб./мес" },
  special: { name: "«Специальный»", price: "20 000 руб./мес (минимальный срок 4 месяца)" },
  half: { name: "«Неполный день с питанием»", price: "18 000 руб./мес" },
  club: { name: "Смена летнего клуба", price: "15 500 руб." },
  morning: { name: "Утренняя продлёнка", price: "с 8:00 до 12:30" },
  day: { name: "Дневная продлёнка", price: "с 12:00 до 18:00" },
};

interface Props {
  form: ContractForm;
  onBack: () => void;
  onConfirm: () => void;
  confirmEnabled: boolean;
  unavailable?: boolean;
  error?: string;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1 py-2 sm:grid-cols-[220px_1fr] sm:gap-4">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="break-words font-medium">{value || "—"}</dd>
  </div>
);

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-1">
    <h3 className="text-lg font-semibold">{title}</h3>
    <dl className="divide-y rounded-lg border px-4">{children}</dl>
  </section>
);

const yesNo = (v: boolean) => (v ? "Да" : "Нет");

export default function ContractPreview({ form: f, onBack, onConfirm, confirmEnabled, unavailable, error }: Props) {
  const tariff = f.tariff ? TARIFF_LABELS[f.tariff] : null;
  const cfg = KINDS[f.kind];
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Проверьте данные</h3>
        <p className="text-sm text-muted-foreground">
          Если нашли ошибку, вернитесь к анкете и исправьте. Код придёт на {f.email} после подтверждения.
        </p>
      </div>

      <Group title="Заказчик">
        <Row label="ФИО" value={f.fullName} />
        <Row label="Дата рождения" value={f.birthDate} />
        <Row label="Адрес регистрации" value={f.address} />
        <Row label="Телефон (мама)" value={f.phoneMother} />
        <Row label="Телефон (папа)" value={f.phoneFather} />
        <Row label="Email" value={f.email} />
      </Group>

      <Group title="Паспорт">
        <Row label="Серия и номер" value={`${f.passportSeries} ${f.passportNumber}`} />
        <Row label="Кем выдан" value={f.passportIssuedBy} />
        <Row label="Дата выдачи" value={f.passportIssuedDate} />
        <Row label="Код подразделения" value={f.passportDeptCode} />
      </Group>

      <Group title="Ребёнок">
        <Row label="ФИО" value={f.childName} />
        <Row label="Дата рождения" value={f.childBirthDate} />
        <Row label="Свидетельство о рождении" value={f.childCertificate} />
        <Row label="Кому доверено забирать" value={f.trustedPersons} />
        <Row label="Здоровье / аллергии" value={f.health} />
      </Group>

      {f.kind === "half" && f.halfGroup && (
        <Group title="Группа">
          <Row label="Группа" value={`${HALF_GROUPS[f.halfGroup].title}, ${HALF_GROUPS[f.halfGroup].note.toLowerCase()}`} />
        </Group>
      )}

      {f.kind === "club" && (
        <Group title="Смена">
          <Row label="Номер смены" value={f.shiftNumber} />
          <Row label="Даты" value={`${f.shiftFrom} — ${f.shiftTo}`} />
          <Row label="Раннее посещение с 8:00" value={yesNo(f.earlyVisit)} />
        </Group>
      )}

      {f.kind === "prod" && (
        <Group title="Школа и семья">
          <Row label="Школа" value={f.school} />
          <Row label="Класс" value={f.schoolClass} />
          <Row label="Место работы (родитель)" value={f.parentWork} />
          <Row label="Второй родитель" value={f.parent2Name} />
          <Row label="Место работы (второй родитель)" value={f.parent2Work} />
          <Row label="Творческие увлечения" value={f.hobbies} />
        </Group>
      )}

      <Group title={`${cfg.tariffTitle} и согласия`}>
        <Row label={cfg.tariffTitle} value={tariff ? `${tariff.name} — ${tariff.price}` : ""} />
        <Row label={`Условия Договора, ${cfg.summary}, оферта`} value={yesNo(f.agreeContract)} />
        <Row label="Обработка персональных данных" value={yesNo(f.agreePersonal)} />
        <Row label="Фото- и видеосъёмка" value={yesNo(f.agreePhoto)} />
      </Group>

      <div className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Вернуться к анкете
          </Button>
          <Button type="button" size="lg" onClick={onConfirm} disabled={!confirmEnabled}>
            Всё верно, подписать договор
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {unavailable && (
          <p className="text-sm text-muted-foreground">Подписание временно недоступно. Мы сообщим, когда оно заработает.</p>
        )}
      </div>
    </div>
  );
}
