import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ym";
import { formatPhoneInput, isPhoneComplete, PHONE_ERROR_MESSAGE, PHONE_EMPTY_MASK } from "@/lib/phone";

// ── PhoneField — поле телефона с маской +7 (___) ___-__-__ ──────────────────
// Используется во всех формах заявок сайта (модалка, квизы, летний клуб).
interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  /** true после попытки сабмита — включает показ ошибки сразу при пустом/неполном значении */
  submitAttempted?: boolean;
  className?: string;
}

export default function PhoneField({ value, onChange, submitAttempted, className = "" }: PhoneFieldProps) {
  const [touched, setTouched] = useState(false);
  const showError = (touched || submitAttempted) && value.length > 0 && !isPhoneComplete(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhoneInput(e.target.value));
  };

  const handleFocus = () => {
    if (!value) onChange(PHONE_EMPTY_MASK);
  };

  const handleBlur = () => {
    setTouched(true);
    if (value.length > 0 && !isPhoneComplete(value)) {
      ymGoal("form_error", { field: "phone" });
    }
  };

  return (
    <div className="modal-field-group">
      <input
        className={`modal-input ${showError ? "modal-input-error" : ""} ${className}`}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showError && (
        <p className="modal-field-error">
          <Icon name="AlertCircle" size={13} />
          {PHONE_ERROR_MESSAGE}
        </p>
      )}
    </div>
  );
}
