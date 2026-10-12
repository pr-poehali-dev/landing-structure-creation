import type { PersonalOffer } from "./contractApi";

const rub = (n: number) => n.toLocaleString("ru-RU").replace(/\u00a0/g, " ");

export default function OfferBanner({ offer }: { offer: PersonalOffer }) {
  return (
    <section className="space-y-1 rounded-lg border-2 border-primary bg-primary/5 p-4">
      <p className="text-sm font-medium text-muted-foreground">Персональное предложение</p>
      <p className="text-lg font-semibold">
        Тариф «{offer.tariff_name}» — {rub(offer.price_month)} руб./мес
      </p>
      <p className="text-sm">Ребёнок: {offer.child_name}</p>
      {offer.comment && <p className="text-sm text-muted-foreground">{offer.comment}</p>}
    </section>
  );
}
