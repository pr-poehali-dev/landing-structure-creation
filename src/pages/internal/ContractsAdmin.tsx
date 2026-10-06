import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNoIndex from "@/hooks/useNoIndex";
import ContractCard, { type ContractDetails } from "./ContractCard";

const ADMIN_URL = "https://functions.poehali.dev/68be8c9a-fc88-49dd-b91b-c6802b66ae84";
const KEY_STORAGE = "contracts_admin_key";

interface Row {
  id: number;
  signed_at: string;
  full_name: string;
  email: string;
  tariff: string;
  status: string;
}

const TARIFFS: Record<string, string> = { basic: "Основной", special: "Специальный" };

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

  if (card) return <ContractCard c={card} onBack={() => setCard(null)} />;

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
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">№</th>
                <th className="p-3">Дата</th>
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
