import { useState } from "react";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function AdminKeyInput({ value, onChange }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex-1">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ключ доступа"
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Скрыть пароль" : "Показать пароль"}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        <Icon name={show ? "EyeOff" : "Eye"} size={18} />
      </button>
    </div>
  );
}
