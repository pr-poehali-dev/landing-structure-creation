import { Link } from "react-router-dom";
import useNoIndex from "@/hooks/useNoIndex";
import ContractForm from "./ContractForm";
import OfferText, { CONTRACT_DOCX_URL } from "./OfferText";
import SignatureAgreement from "./SignatureAgreement";

export default function SignContract() {
  useNoIndex("Заключить договор");
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Заключить договор</h1>
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 p-4 text-sm">
        <a href={CONTRACT_DOCX_URL} download className="font-medium text-primary underline">
          Скачать полный текст договора с Приложениями (DOCX)
        </a>
        <Link to="/dogovor/tekst/" className="text-primary underline">
          Читать договор на сайте
        </Link>
      </div>
      <OfferText />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Анкета-заявление</h2>
          <ContractForm />
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <SignatureAgreement />
        </aside>
      </div>
    </main>
  );
}
