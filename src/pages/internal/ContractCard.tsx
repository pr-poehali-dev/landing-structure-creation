import { Button } from "@/components/ui/button";
import { useState } from "react";
import { downloadWord } from "./wordExport";
import type { ContractForm } from "@/pages/contract/formUtils";
import { KIND_LABELS, TARIFF_LABELS } from "@/pages/contract/kinds";

export interface ContractDetails {
  id: number;
  signed_at: string;
  full_name: string;
  email: string;
  tariff: string;
  ip: string;
  status: string;
  kind?: string;
  form: ContractForm;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1 py-2 sm:grid-cols-[240px_1fr] sm:gap-4">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="break-words font-medium">{value || "—"}</dd>
  </div>
);

interface Props {
  c: ContractDetails;
  onBack: () => void;
  adminUrl: string;
  adminKey: string;
}

export default function ContractCard({ c, onBack, adminUrl, adminKey }: Props) {
  const f = c.form;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const download = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${adminUrl}?id=${c.id}&format=doc`, { headers: { "X-Auth-Token": adminKey } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка");
      downloadWord(`Dogovor_${c.id}`, data.html);
    } catch (e) {
      setError((e as Error).message);
    }
    setBusy(false);
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onBack}>
          К списку
        </Button>
        <Button onClick={download} disabled={busy}>
          Скачать договор (DOC)
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <h1 className="text-2xl font-bold">Договор № {c.id}</h1>
      <dl className="divide-y rounded-lg border px-4">
        <Row label="Статус" value={c.status} />
        <Row label="Подписан" value={new Date(c.signed_at).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) + " (МСК)"} />
        <Row label="IP-адрес" value={c.ip} />
        <Row label="Договор" value={KIND_LABELS[c.kind ?? "garden"] ?? ""} />
        <Row label={c.kind === "prod" ? "Группа" : "Тариф"} value={TARIFF_LABELS[f.tariff] ?? f.tariff} />
        {c.kind === "club" && <Row label="Смена" value={`№ ${f.shiftNumber}, ${f.shiftFrom} — ${f.shiftTo}`} />}
        {c.kind === "club" && <Row label="Раннее посещение с 8:00" value={f.earlyVisit ? "Да" : "Нет"} />}
        {c.kind === "prod" && <Row label="Школа, класс" value={`${f.school}, ${f.schoolClass}`} />}
        {c.kind === "prod" && <Row label="Место работы (родитель)" value={f.parentWork} />}
        {c.kind === "prod" && <Row label="Второй родитель" value={`${f.parent2Name || "—"}, ${f.parent2Work || "—"}`} />}
        {c.kind === "prod" && <Row label="Творческие увлечения" value={f.hobbies} />}
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
