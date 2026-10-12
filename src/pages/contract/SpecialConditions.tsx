import type { PersonalOffer } from "./contractApi";

export default function SpecialConditions({ offer }: { offer?: PersonalOffer | null }) {
  const comment = offer?.comment?.trim();
  if (!comment) return null;
  return (
    <section className="space-y-3 rounded-lg border-2 border-primary bg-primary/5 p-5">
      <h2 className="text-xl font-bold">ОСОБЫЕ УСЛОВИЯ</h2>
      <p>
        Особые условия, указанные в настоящем разделе, согласованы Сторонами индивидуально и имеют преимущественную силу перед иными
        положениями настоящего Договора и Приложений к нему. В случае расхождения между Особыми условиями и иными положениями Договора
        применяются Особые условия.
      </p>
      <p className="whitespace-pre-line font-bold">{comment}</p>
    </section>
  );
}
