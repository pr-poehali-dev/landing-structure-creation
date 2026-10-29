import { useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneField from "@/components/landing/PhoneField";
import ConsentCheckbox from "@/components/landing/ConsentCheckbox";
import HoneypotField from "@/components/landing/HoneypotField";
import { isPhoneComplete, normalizePhoneForCrm } from "@/lib/phone";
import { submitForm } from "@/lib/formGuard";
import { ymGoal } from "@/lib/ym";
import { CHILD_AGE_OPTIONS } from "@/components/landing/modalContent";

const SEND_LEAD_URL = "https://functions.poehali.dev/57047ae6-091f-4a98-8391-1bc5b14b157a";

export default function AtlasLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!name || !isPhoneComplete(phone) || !agreed) return;
    setLoading(true);
    const ok = await submitForm(
      SEND_LEAD_URL,
      {
        name,
        phone: normalizePhoneForCrm(phone),
        age,
        comment: "",
        source: "Лендинг «Атлас достижений» (Яндекс.Директ)",
        application_type: "tour",
      },
      e.currentTarget as HTMLFormElement
    );
    setLoading(false);
    if (!ok) return;
    ymGoal("form_excursion_submit", { application_type: "tour", source: "atlas" });
    ymGoal("lead_tour", { application_type: "tour", source: "atlas" });
    ymGoal("atlas_lead", { application_type: "tour", source: "atlas" });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mb-3 text-5xl">🎉</div>
        <h3 className="mb-2 font-serif text-3xl text-[var(--text-main)]">Спасибо за заявку!</h3>
        <p className="text-[var(--text-muted)]">Мы позвоним вам в течение дня, в рабочее время, и согласуем время экскурсии.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
      <HoneypotField />
      <div className="modal-field-group">
        <input
          className={`modal-input ${attempted && !name ? "modal-input-error" : ""}`}
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        {attempted && !name && (
          <p className="modal-field-error">
            <Icon name="AlertCircle" size={13} /> Укажите имя
          </p>
        )}
      </div>
      <PhoneField value={phone} onChange={setPhone} submitAttempted={attempted} />
      <select className="modal-input modal-select" value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="">Возраст ребёнка</option>
        {CHILD_AGE_OPTIONS.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
      <ConsentCheckbox checked={agreed} onChange={setAgreed} />
      <button type="submit" className="cta-btn cta-btn-primary cta-btn-lg justify-center" disabled={loading || !agreed}>
        {loading ? "Отправляем..." : "Записаться на экскурсию"}
        {!loading && <Icon name="ArrowRight" size={18} />}
      </button>
    </form>
  );
}
