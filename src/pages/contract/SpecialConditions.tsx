import type { PersonalOffer } from "./contractApi";

export default function SpecialConditions({ offer }: { offer?: PersonalOffer | null }) {
  const comment = offer?.comment?.trim();
  if (!comment) return null;
  return (
    <section className="space-y-3">
      <h2 className="border-b pt-6 pb-1 text-xl font-semibold">ОСОБЫЕ УСЛОВИЯ</h2>
      <p>
        Особые условия, указанные в настоящем разделе, согласованы Сторонами индивидуально и имеют преимущественную силу перед иными
        положениями настоящего Договора и Приложений к нему. В случае расхождения между Особыми условиями и иными положениями Договора
        применяются Особые условия.
      </p>
      <p className="whitespace-pre-line">{comment}</p>
    </section>
  );
}
