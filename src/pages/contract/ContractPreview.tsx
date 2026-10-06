import { Button } from "@/components/ui/button";
import type { ContractForm } from "./formUtils";

const TARIFF_LABELS = {
  basic: { name: "«Основной»", price: "25 000 руб./мес" },
  special: { name: "«Специальный»", price: "20 000 руб./мес (минимальный срок 4 месяца)" },
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

      <Group title="Тариф и согласия">
        <Row label="Тариф" value={tariff ? `${tariff.name} — ${tariff.price}` : ""} />
        <Row label="Условия Договора, Приложения № 1 и № 2, оферта" value={yesNo(f.agreeContract)} />
        <Row label="Обработка персональных данных" value={yesNo(f.agreePersonal)} />
        <Row label="Фото- и видеосъёмка" value={yesNo(f.agreePhoto)} />
      </Group>

      <div className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Вернуться к анкете
          </Button>
          <Button type="button" size="lg" onClick={onConfirm} disabled={!confirmEnabled}>
            Всё верно, получить код для подписания
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
