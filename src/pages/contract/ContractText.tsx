import { Link } from "react-router-dom";
import useNoIndex from "@/hooks/useNoIndex";
import { CONTRACT_BLOCKS, type Item, type Run } from "./contractData";
import { CONTRACT_DOCX_URL } from "./OfferText";

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

const List = ({ items, start = 1 }: { items: Item[]; start?: number }) => (
  <ol start={start} className="list-decimal space-y-1 pl-6">
    {items.map((it, i) => (
      <li key={i}>
        <Runs r={it.r} />
        {it.sub && <List items={it.sub} />}
      </li>
    ))}
  </ol>
);

export default function ContractText() {
  useNoIndex("Текст договора с Приложениями");
  let listStart = 1;
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-base leading-relaxed">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 p-4 text-sm">
        <a href={CONTRACT_DOCX_URL} download className="font-medium text-primary underline">
          Скачать договор (DOCX)
        </a>
        <Link to="/oferta/" className="text-primary underline">
          Оферта и соглашение об электронной подписи
        </Link>
      </div>
      {CONTRACT_BLOCKS.map((b, i) => {
        if (b.k === "h1") return <h1 key={i} className="pt-4 text-center text-2xl font-bold">{b.t}</h1>;
        if (b.k === "h2") {
          listStart = 1;
          return <h2 key={i} className="border-b pt-6 pb-1 text-xl font-semibold">{b.t}</h2>;
        }
        if (b.k === "p") return <p key={i}><Runs r={b.r} /></p>;
        if (b.k === "ol") return <List key={i} items={b.items} start={listStart} />;
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
    </main>
  );
}
