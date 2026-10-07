import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useNoIndex from "@/hooks/useNoIndex";
import OfferText from "./OfferText";
import SignatureAgreement from "./SignatureAgreement";
import { KINDS, type ContractKind } from "./kinds";

export default function Offer() {
  useNoIndex("Оферта и соглашение о простой электронной подписи");
  const [params] = useSearchParams();
  const raw = params.get("kind");
  const kind: ContractKind = raw && raw in KINDS ? (raw as ContractKind) : "garden";
  const cfg = KINDS[kind];
  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild variant="outline">
        <Link to={cfg.path}>Вернуться к прочтению договора</Link>
      </Button>
      <Button asChild>
        <Link to={`${cfg.path}?step=fill`}>Начать заполнять договор</Link>
      </Button>
    </div>
  );
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {actions}
      <OfferText kind={kind} />
      <SignatureAgreement kind={kind} />
      {actions}
    </main>
  );
}
