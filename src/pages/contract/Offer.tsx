import useNoIndex from "@/hooks/useNoIndex";
import OfferText from "./OfferText";
import SignatureAgreement from "./SignatureAgreement";

export default function Offer() {
  useNoIndex("Оферта и соглашение о простой электронной подписи");
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <OfferText />
      <SignatureAgreement />
    </main>
  );
}
