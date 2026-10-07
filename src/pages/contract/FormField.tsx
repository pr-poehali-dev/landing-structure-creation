import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email";
  autoComplete?: string;
  className?: string;
  hint?: string;
}

const FIELD_BORDER = "border-2 border-slate-500 bg-white shadow-sm hover:border-slate-700 focus-visible:border-primary";

export default function FormField({
  id,
  label,
  value,
  onChange,
  error,
  required = true,
  placeholder,
  multiline,
  inputMode,
  autoComplete,
  className,
  hint,
}: Props) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {multiline ? (
        <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={FIELD_BORDER} />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={FIELD_BORDER}
        />
      )}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
