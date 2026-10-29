import { useEffect, useState } from "react";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNoIndex from "@/hooks/useNoIndex";

const ADMIN_URL = "https://functions.poehali.dev/68be8c9a-fc88-49dd-b91b-c6802b66ae84";
const KEY_STORAGE = "contracts_admin_key";

interface Offer {
  id: number;
  program: "garden" | "prod";
  child_name: string;
  tariff_name: string;
  price_month: number;
  comment: string;
  status: "active" | "used" | "cancelled";
  created_at: string;
  contract_id: number | null;
  link: string;
}

const PROGRAMS = { garden: "Садик", prod: "ГПД" };
const STATUSES = {
  active: { label: "Активно", cls: "bg-green-100 text-green-800" },
  used: { label: "Использовано", cls: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Отменено", cls: "bg-gray-200 text-gray-700" },
};
const FILTERS = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "used", label: "Использованные" },
  { value: "cancelled", label: "Отменённые" },
] as const;

const fmt = (s: string) => new Date(s).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

export default function OffersAdmin() {
  useNoIndex("Персональные предложения — служебный раздел");
  const [key, setKey] = useState("");
  useEffect(() => {
    setKey(sessionStorage.getItem(KEY_STORAGE) ?? "");
  }, []);
  const [rows, setRows] = useState<Offer[] | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(ADMIN_URL + "?offers=1", { headers: { "X-Auth-Token": key } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Ошибка запроса");
      sessionStorage.setItem(KEY_STORAGE, key);
      setRows(data.items);
    } catch (e) {
      setRows(null);
      setError((e as Error).message);
    }
    setBusy(false);
  };

  const copy = async (o: Offer) => {
    await navigator.clipboard.writeText(o.link);
    setCopied(o.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const shown = rows?.filter((r) => filter === "all" || r.status === filter) ?? [];

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Link to="/" className="inline-block text-sm text-primary underline">
        ← На главную страницу сайта
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Персональные предложения</h1>
        <Link to="/internal/contracts/" className="text-sm text-primary underline">
          К подписанным договорам
        </Link>
      </div>
      <form
        className="flex max-w-md gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
      >
        <Input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Ключ доступа" />
        <Button type="submit" disabled={!key || busy}>
          {rows ? "Обновить" : "Войти"}
        </Button>
      </form>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {rows && (
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button key={f.value} size="sm" variant={filter === f.value ? "default" : "outline"} onClick={() => setFilter(f.value)}>
              {f.label}
            </Button>
          ))}
        </div>
      )}
      {rows && shown.length === 0 && <p className="text-muted-foreground">Предложений пока нет.</p>}
      {shown.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">Создано</th>
                <th className="p-3">Программа</th>
                <th className="p-3">Ребёнок</th>
                <th className="p-3">Тариф</th>
                <th className="p-3">Цена/мес</th>
                <th className="p-3">Статус</th>
                <th className="p-3">Договор</th>
                <th className="p-3">Ссылка</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <tr key={o.id} className="border-t align-top">
                  <td className="p-3">{fmt(o.created_at)}</td>
                  <td className="p-3">{PROGRAMS[o.program]}</td>
                  <td className="p-3">{o.child_name}</td>
                  <td className="p-3">
                    {o.tariff_name}
                    {o.comment && <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground">{o.comment}</p>}
                  </td>
                  <td className="p-3 whitespace-nowrap">{o.price_month.toLocaleString("ru-RU")} ₽</td>
                  <td className="p-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${STATUSES[o.status].cls}`}>{STATUSES[o.status].label}</span>
                  </td>
                  <td className="p-3">{o.contract_id ? `№ ${o.contract_id}` : "—"}</td>
                  <td className="p-3">
                    {o.status === "active" ? (
                      <Button size="sm" variant="outline" onClick={() => copy(o)}>
                        {copied === o.id ? "Скопировано" : "Копировать"}
                      </Button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}