import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyCode, requestCode } from "./contractApi";
import type { ContractForm } from "./formUtils";

interface Props {
  form: ContractForm;
  onSigned: (number?: number) => void;
  onBack: () => void;
}

export default function CodeStep({ form, onSigned, onBack }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError("");
    setInfo("");
    const res = await verifyCode(form.email, code);
    setBusy(false);
    if (res.ok) onSigned(res.number);
    else {
      setError(res.error ?? "Ошибка");
      setCode("");
    }
  };

  const resend = async () => {
    setBusy(true);
    setError("");
    setInfo("");
    const res = await requestCode(form);
    setBusy(false);
    if (res.ok) setInfo("Новый код отправлен на почту.");
    else setError(res.error ?? "Ошибка");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Введите код из письма</h3>
        <p className="text-sm text-muted-foreground">
          Мы отправили 6-значный код на {form.email}. Код действителен 15 минут. Ввод кода означает подписание договора.
        </p>
      </div>
      <InputOTP maxLength={6} value={code} onChange={setCode} inputMode="numeric" disabled={busy}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {info && <p className="text-sm text-muted-foreground">{info}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" onClick={submit} disabled={busy || code.length !== 6}>
          Подписать договор
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={resend} disabled={busy}>
          Отправить код ещё раз
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={onBack} disabled={busy}>
          Назад
        </Button>
      </div>
    </div>
  );
}
