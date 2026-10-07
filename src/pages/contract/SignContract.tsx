import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useNoIndex from "@/hooks/useNoIndex";
import ContractForm from "./ContractForm";
import OfferText, { CONTRACT_DOCX_URL } from "./OfferText";
import SignatureAgreement from "./SignatureAgreement";

export default function SignContract() {
  useNoIndex("Заключить договор");
  const [params, setParams] = useSearchParams();
  const filling = params.get("step") === "fill";

  const go = (fill: boolean) => {
    setParams(fill ? { step: "fill" } : {});
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">{filling ? "Заполнение и подписание договора" : "Заключить договор"}</h1>

      <div className={filling ? "hidden" : "space-y-8"}>
        <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 p-4 text-sm">
          <a href={CONTRACT_DOCX_URL} download className="font-medium text-primary underline">
            Скачать полный текст договора с Приложениями (DOCX)
          </a>
          <Link to="/dogovor/tekst/" className="text-primary underline">
            Читать договор на сайте
          </Link>
          <Link to="/oferta/" className="text-primary underline">
            Смотреть оферту
          </Link>
        </div>
        <OfferText />
        <SignatureAgreement />
        <Button size="lg" onClick={() => go(true)}>
          Начать заполнять договор
        </Button>
      </div>

      <div className={filling ? "space-y-6" : "hidden"}>
        <Button variant="outline" onClick={() => go(false)}>
          Вернуться к прочтению договора
        </Button>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Анкета-заявление</h2>
            <ContractForm />
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <SignatureAgreement />
          </aside>
        </div>
      </div>
    </main>
  );
}
