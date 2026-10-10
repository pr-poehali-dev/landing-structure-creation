import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useNoIndex from "@/hooks/useNoIndex";
import type { Item, Run } from "./contractData";
import TestBanner from "./TestBanner";
import { withTest } from "./formUtils";
import { KINDS, type ContractKind } from "./kinds";

const Runs = ({ r }: { r: Run[] }) => (
  <>
    {r.map((x, i) => {
      let n: React.ReactNode = x.t;
      if (x.b) n = <strong>{n}</strong>;
      if (x.i) n = <em>{n}</em>;
      return <span key={i}>{n}</span>;
    })}
  </>
);

const List = ({ items, start = 1, bullet = false }: { items: Item[]; start?: number; bullet?: boolean }) => {
  const Tag = bullet ? "ul" : "ol";
  return (
  <Tag start={bullet ? undefined : start} className={`${bullet ? "list-disc" : "list-decimal"} space-y-1 pl-6`}>
    {items.map((it, i) => (
      <li key={i}>
        <Runs r={it.r} />
        {it.sub && <List items={it.sub} />}
      </li>
    ))}
  </Tag>
  );
};

export default function ContractText({ kind = "garden" }: { kind?: ContractKind }) {
  const cfg = KINDS[kind];
  useNoIndex(`Текст договора с Приложениями — ${cfg.short}`);
  const isTest = useSearchParams()[0].get("test") === "1";
  let listStart = 1;
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-base leading-relaxed">
      {isTest && <TestBanner />}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 p-4 text-sm">
        <a href={cfg.docxUrl} download className="font-medium text-primary underline">
          Скачать договор (DOCX)
        </a>
        <Link to={withTest(`/oferta/?kind=${kind}`, isTest)} className="text-primary underline">
          Оферта и соглашение об электронной подписи
        </Link>
      </div>
      <div className="flex flex-col gap-3 pb-2 sm:flex-row">
        <Button asChild variant="outline">
          <Link to={withTest(cfg.path, isTest)}>Вернуться к прочтению договора</Link>
        </Button>
        <Button asChild>
          <Link to={withTest(`${cfg.path}?step=fill`, isTest)}>Начать заполнять договор</Link>
        </Button>
      </div>
      {cfg.blocks.map((b, i) => {
        if (b.k === "h1") return <h1 key={i} className="pt-4 text-center text-2xl font-bold">{b.t}</h1>;
        if (b.k === "h2") {
          listStart = 1;
          return <h2 key={i} className="border-b pt-6 pb-1 text-xl font-semibold">{b.t}</h2>;
        }
        if (b.k === "p") return <p key={i}><Runs r={b.r} /></p>;
        if (b.k === "ol" || b.k === "ul") return <List key={i} items={b.items} start={listStart} bullet={b.k === "ul"} />;
        if (b.k !== "table") return null;
        return (
          <div key={i} className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? "bg-muted font-semibold" : ""}>
                    {row.map((c, ci) => (
                      <td key={ci} className="border p-2 align-top">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <Button asChild variant="outline">
          <Link to={withTest(cfg.path, isTest)}>Вернуться к прочтению договора</Link>
        </Button>
        <Button asChild>
          <Link to={withTest(`${cfg.path}?step=fill`, isTest)}>Начать заполнять договор</Link>
        </Button>
      </div>
    </main>
  );
}
