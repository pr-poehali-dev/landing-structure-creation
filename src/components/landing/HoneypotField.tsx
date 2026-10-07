// Скрытое поле-ловушка для ботов: человек его не видит, бот заполняет
export default function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Не заполняйте это поле
        <input type="text" name="hp_trap_field" id="hp_trap_field" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
