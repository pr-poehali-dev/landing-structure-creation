import { Button } from "@/components/ui/button";
import type { ContractForm } from "@/pages/contract/formUtils";

export interface ContractDetails {
  id: number;
  signed_at: string;
  full_name: string;
  email: string;
  tariff: string;
  ip: string;
  status: string;
  form: ContractForm;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1 py-2 sm:grid-cols-[240px_1fr] sm:gap-4">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="break-words font-medium">{value || "—"}</dd>
  </div>
);

export default function ContractCard({ c, onBack }: { c: ContractDetails; onBack: () => void }) {
  const f = c.form;
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <Button variant="outline" onClick={onBack}>
        К списку
      </Button>
      <h1 className="text-2xl font-bold">Договор № {c.id}</h1>
      <dl className="divide-y rounded-lg border px-4">
        <Row label="Статус" value={c.status} />
        <Row label="Подписан" value={new Date(c.signed_at).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) + " (МСК)"} />
        <Row label="IP-адрес" value={c.ip} />
        <Row label="Тариф" value={f.tariff === "special" ? "Специальный (20 000 руб./мес)" : "Основной (25 000 руб./мес)"} />
        <Row label="ФИО Заказчика" value={f.fullName} />
        <Row label="Дата рождения" value={f.birthDate} />
        <Row label="Паспорт" value={`${f.passportSeries} ${f.passportNumber}, выдан ${f.passportIssuedBy}, ${f.passportIssuedDate}, код ${f.passportDeptCode}`} />
        <Row label="Адрес регистрации" value={f.address} />
        <Row label="Телефон (мама)" value={f.phoneMother} />
        <Row label="Телефон (папа)" value={f.phoneFather} />
        <Row label="Email" value={f.email} />
        <Row label="Ребёнок" value={`${f.childName}, ${f.childBirthDate}`} />
        <Row label="Свидетельство о рождении" value={f.childCertificate} />
        <Row label="Кому доверено забирать" value={f.trustedPersons} />
        <Row label="Здоровье / аллергии" value={f.health} />
        <Row label="Согласие на фото и видео" value={f.agreePhoto ? "Да" : "Нет"} />
      </dl>
    </main>
  );
}
