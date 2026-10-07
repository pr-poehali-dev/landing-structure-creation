import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useNoIndex from "@/hooks/useNoIndex";
import OfferText from "./OfferText";
import SignatureAgreement from "./SignatureAgreement";

export default function Offer() {
  useNoIndex("Оферта и соглашение о простой электронной подписи");
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline">
          <Link to="/dogovor/">Вернуться к прочтению договора</Link>
        </Button>
        <Button asChild>
          <Link to="/dogovor/?step=fill">Начать заполнять договор</Link>
        </Button>
      </div>
      <OfferText />
      <SignatureAgreement />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline">
          <Link to="/dogovor/">Вернуться к прочтению договора</Link>
        </Button>
        <Button asChild>
          <Link to="/dogovor/?step=fill">Начать заполнять договор</Link>
        </Button>
      </div>
    </main>
  );
}
