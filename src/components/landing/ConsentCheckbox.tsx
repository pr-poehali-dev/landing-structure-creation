interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  light?: boolean;
}

// Обязательный чекбокс согласия на обработку ПД — используется во всех формах сайта
export default function ConsentCheckbox({ checked, onChange, light }: ConsentCheckboxProps) {
  return (
    <label className={`privacy-checkbox-label ${light ? "privacy-checkbox-label--light" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
      />
      <span>
        Я согласен(на) на обработку персональных данных в соответствии с ФЗ № 152-ФЗ,{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>{" "}
        и{" "}
        <a href="/consent" target="_blank" rel="noopener noreferrer">согласием на обработку ПД</a>
      </span>
    </label>
  );
}
