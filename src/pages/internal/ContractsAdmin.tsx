import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNoIndex from "@/hooks/useNoIndex";
import { downloadWord, escapeHtml } from "./wordExport";
import ContractCard, { type ContractDetails } from "./ContractCard";
import { KIND_LABELS, TARIFF_LABELS } from "@/pages/contract/kinds";

const ADMIN_URL = "https://functions.poehali.dev/68be8c9a-fc88-49dd-b91b-c6802b66ae84";
const KEY_STORAGE = "contracts_admin_key";

interface Row {
  id: number;
  signed_at: string;
  full_name: string;
  email: string;
  tariff: string;
  status: string;
  kind?: string;
}

const TARIFFS = TARIFF_LABELS;
const kindName = (k?: string) => KIND_LABELS[k ?? "garden"] ?? k ?? "";

const fmt = (s: string) => new Date(s).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

export default function ContractsAdmin() {
  useNoIndex("Договоры — служебный раздел");
  const [key, setKey] = useState(() => sessionStorage.getItem(KEY_STORAGE) ?? "");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [card, setCard] = useState<ContractDetails | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const call = async (query = "") => {
    const res = await fetch(ADMIN_URL + query, { headers: { "X-Auth-Token": key } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Ошибка запроса");
    return data;
  };

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await call();
      sessionStorage.setItem(KEY_STORAGE, key);
      setRows(data.items);
    } catch (e) {
      setRows(null);
      setError((e as Error).message);
    }
    setBusy(false);
  };

  const open = async (id: number) => {
    setBusy(true);
    setError("");
    try {
      setCard(await call(`?id=${id}`));
    } catch (e) {
      setError((e as Error).message);
    }
    setBusy(false);
  };

  const downloadList = () => {
    if (!rows) return;
    const head = ["№", "Дата", "Договор", "ФИО", "Email", "Тариф", "Статус"];
    const cell = "border:1px solid #999;padding:4px;";
    const body =
      "<h2>Подписанные договоры</h2><table style='border-collapse:collapse;'><tr>" +
      head.map((h) => `<th style='${cell}'>${h}</th>`).join("") +
      "</tr>" +
      rows
        .map(
          (r) =>
            "<tr>" +
            [r.id, fmt(r.signed_at), kindName(r.kind), r.full_name, r.email, TARIFFS[r.tariff] ?? r.tariff, r.status]
              .map((v) => `<td style='${cell}'>${escapeHtml(String(v))}</td>`)
              .join("") +
            "</tr>"
        )
        .join("") +
      "</table>";
    downloadWord("Spisok_dogovorov", body);
  };

  if (card) return <ContractCard c={card} adminUrl={ADMIN_URL} adminKey={key} onBack={() => setCard(null)} />;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-2xl font-bold">Подписанные договоры</h1>
      <form
        className="flex max-w-md gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
      >
        <Input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Ключ доступа" />
        <Button type="submit" disabled={!key || busy}>
          Войти
        </Button>
      </form>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {rows && rows.length === 0 && <p className="text-muted-foreground">Подписанных договоров пока нет.</p>}
      {rows && rows.length > 0 && (
        <Button variant="outline" onClick={downloadList}>
          Скачать список (DOC)
        </Button>
      )}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">№</th>
                <th className="p-3">Дата</th>
                <th className="p-3">Договор</th>
                <th className="p-3">ФИО</th>
                <th className="p-3">Тариф</th>
                <th className="p-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="cursor-pointer border-t hover:bg-muted/50" onClick={() => open(r.id)}>
                  <td className="p-3 font-medium">{r.id}</td>
                  <td className="p-3">{fmt(r.signed_at)}</td>
                  <td className="p-3">{kindName(r.kind)}</td>
                  <td className="p-3">{r.full_name}</td>
                  <td className="p-3">{TARIFFS[r.tariff] ?? r.tariff}</td>
                  <td className="p-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
