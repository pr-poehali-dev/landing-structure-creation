import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { KINDS, type ContractKind } from "./kinds";
import { HALF_GROUPS, SHIFTS } from "./shifts";
import CodeStep from "./CodeStep";
import ContractPreview from "./ContractPreview";
import SignedNotice from "./SignedNotice";
import { requestCode } from "./contractApi";
import FormField from "./FormField";
import {
  makeEmptyForm,
  SOURCES,
  formatDate,
  formatDeptCode,
  formatPhone,
  getErrors,
  withTest,
  digits,
  type ContractForm as FormState,
  type FieldKey,
} from "./formUtils";

const SUBMIT_ENABLED = true;

export default function ContractForm({ kind }: { kind: ContractKind }) {
  const cfg = KINDS[kind];
  const [f, setF] = useState<FormState>(() => makeEmptyForm(kind));
  const [step, setStep] = useState<"form" | "preview" | "code" | "done">("form");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [contractNumber, setContractNumber] = useState<number | undefined>();
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [params] = useSearchParams();
  const isTest = params.get("test") === "1";
  useEffect(() => {
    setF((p) => (p.isTest === isTest ? p : { ...p, isTest }));
  }, [isTest]);
  const errors = useMemo(() => getErrors(f), [f]);
  const valid = Object.keys(errors).length === 0;

  const set = <K extends FieldKey>(k: K, v: FormState[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setTouched((p) => ({ ...p, [k]: true }));
  };
  const err = (k: FieldKey) => (touched[k] ? errors[k] : undefined);

  const text = (k: FieldKey, label: string, extra: Partial<React.ComponentProps<typeof FormField>> = {}) => (
    <FormField
      id={k}
      label={label}
      value={String(f[k])}
      onChange={(v) => set(k, v as never)}
      error={err(k)}
      {...extra}
    />
  );

  const showPreview = () => {
    setStep("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendCode = async () => {
    setSending(true);
    setSendError("");
    const res = await requestCode(f);
    setSending(false);
    if (res.ok) setStep("code");
    else setSendError(res.error ?? "Ошибка");
  };

  if (step === "done") return <SignedNotice email={f.email} number={contractNumber} isTest={f.isTest} />;

  if (step === "code") {
    return (
      <CodeStep
        form={f}
        onBack={() => setStep("preview")}
        onSigned={(n) => {
          setContractNumber(n);
          setStep("done");
        }}
      />
    );
  }

  if (step === "preview") {
    return (
      <ContractPreview
        form={f}
        onBack={() => setStep("form")}
        onConfirm={sendCode}
        confirmEnabled={SUBMIT_ENABLED && !sending}
        unavailable={!SUBMIT_ENABLED}
        error={sendError}
      />
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) showPreview();
      }}
    >
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Данные Заказчика (родителя)</h3>
        {text("fullName", "ФИО полностью", { autoComplete: "name" })}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="birthDate"
            label="Дата рождения"
            value={f.birthDate}
            onChange={(v) => set("birthDate", formatDate(v))}
            error={err("birthDate")}
            placeholder="ДД.ММ.ГГГГ"
            inputMode="numeric"
          />
          <FormField
            id="email"
            label="Email (для кода и договора)"
            value={f.email}
            onChange={(v) => set("email", v)}
            error={err("email")}
            inputMode="email"
            autoComplete="email"
            placeholder="name@mail.ru"
          />
          <FormField
            id="phoneMother"
            label="Контактный телефон (мама)"
            value={f.phoneMother}
            onChange={(v) => set("phoneMother", formatPhone(v))}
            error={err("phoneMother")}
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
          />
          <FormField
            id="phoneFather"
            label="Контактный телефон (папа)"
            required={false}
            value={f.phoneFather}
            onChange={(v) => set("phoneFather", formatPhone(v))}
            error={err("phoneFather")}
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        {text("address", "Адрес регистрации", { autoComplete: "street-address", placeholder: "Город, улица, номер дома и квартира", hint: "Город, улица, номер дома и квартира" })}
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Паспорт</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            id="passportSeries"
            label="Серия"
            value={f.passportSeries}
            onChange={(v) => set("passportSeries", digits(v).slice(0, 4))}
            error={err("passportSeries")}
            inputMode="numeric"
            placeholder="0000"
          />
          <FormField
            id="passportNumber"
            label="Номер"
            value={f.passportNumber}
            onChange={(v) => set("passportNumber", digits(v).slice(0, 6))}
            error={err("passportNumber")}
            inputMode="numeric"
            placeholder="000000"
          />
          <FormField
            id="passportDeptCode"
            label="Код подразделения"
            value={f.passportDeptCode}
            onChange={(v) => set("passportDeptCode", formatDeptCode(v))}
            error={err("passportDeptCode")}
            inputMode="numeric"
            placeholder="000-000"
          />
        </div>
        <FormField
          id="passportIssuedBy"
          label="Кем выдан"
          value={f.passportIssuedBy}
          onChange={(v) => set("passportIssuedBy", v)}
          error={err("passportIssuedBy")}
        />
        <FormField
          id="passportIssuedDate"
          label="Дата выдачи"
          value={f.passportIssuedDate}
          onChange={(v) => set("passportIssuedDate", formatDate(v))}
          error={err("passportIssuedDate")}
          inputMode="numeric"
          placeholder="ДД.ММ.ГГГГ"
          className="sm:max-w-xs"
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Ребёнок</h3>
        {text("childName", "ФИО ребёнка полностью")}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="childBirthDate"
            label="Дата рождения ребёнка"
            value={f.childBirthDate}
            onChange={(v) => set("childBirthDate", formatDate(v))}
            error={err("childBirthDate")}
            inputMode="numeric"
            placeholder="ДД.ММ.ГГГГ"
          />
          {text("childCertificate", "Номер свидетельства о рождении")}
        </div>
        {text("trustedPersons", "Лица, которым доверено забирать ребёнка", {
          multiline: true,
          placeholder: "ФИО и степень родства, через запятую",
        })}
        {text("health", "Сведения о состоянии здоровья / аллергиях", {
          multiline: true,
          placeholder: "Если нет — напишите «нет»",
        })}
      </section>

      {kind === "club" && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Смена</h3>
          {SHIFTS.length > 0 ? (
            <RadioGroup
              value={f.shiftNumber}
              onValueChange={(v) => {
                const sh = SHIFTS.find((x) => String(x.number) === v);
                setF((p) => ({ ...p, shiftNumber: v, shiftFrom: sh?.from ?? "", shiftTo: sh?.to ?? "" }));
                setTouched((p) => ({ ...p, shiftNumber: true }));
              }}
              className="gap-3"
            >
              {SHIFTS.map((sh) => (
                <Label key={sh.number} htmlFor={`shift-${sh.number}`} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-slate-400 bg-white p-4 font-normal">
                  <RadioGroupItem id={`shift-${sh.number}`} value={String(sh.number)} className="mt-1" />
                  <span className="font-semibold">
                    Смена {sh.number}: с {sh.from} по {sh.to}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {text("shiftNumber", "Номер смены")}
              <FormField
                id="shiftFrom"
                label="Начало смены"
                value={f.shiftFrom}
                onChange={(v) => set("shiftFrom", formatDate(v))}
                error={err("shiftFrom")}
                inputMode="numeric"
                placeholder="ДД.ММ.ГГГГ"
              />
              <FormField
                id="shiftTo"
                label="Окончание смены"
                value={f.shiftTo}
                onChange={(v) => set("shiftTo", formatDate(v))}
                error={err("shiftTo")}
                inputMode="numeric"
                placeholder="ДД.ММ.ГГГГ"
              />
            </div>
          )}
          {err("shiftNumber") && SHIFTS.length > 0 && <p className="text-sm text-destructive">{errors.shiftNumber}</p>}
          <div className="flex items-start gap-3">
            <Checkbox id="earlyVisit" className="mt-1" checked={f.earlyVisit} onCheckedChange={(v) => set("earlyVisit", v === true)} />
            <Label htmlFor="earlyVisit" className="font-normal leading-snug">
              Раннее посещение с 8:00 вместо 10:00 (+3 000 руб. за смену, с завтраком)
            </Label>
          </div>
        </section>
      )}

      {kind === "half" && (
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            Группа<span className="text-destructive"> *</span>
          </h3>
          <RadioGroup value={f.halfGroup} onValueChange={(v) => set("halfGroup", v as FormState["halfGroup"])} className="gap-3">
            {(Object.keys(HALF_GROUPS) as Array<keyof typeof HALF_GROUPS>).map((g) => (
              <Label key={g} htmlFor={`g-${g}`} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-slate-400 bg-white p-4 font-normal">
                <RadioGroupItem id={`g-${g}`} value={g} className="mt-1" />
                <span>
                  <span className="block font-semibold">{HALF_GROUPS[g].title}</span>
                  <span className="text-sm text-muted-foreground">{HALF_GROUPS[g].note}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
          {err("halfGroup") && <p className="text-sm text-destructive">{errors.halfGroup}</p>}
        </section>
      )}

      {kind === "prod" && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Школа и семья</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {text("school", "Школа")}
            {text("schoolClass", "Класс")}
            {text("parentWork", "Место работы, должность (родитель)", { required: false })}
            {text("parent2Name", "ФИО второго родителя", { required: false })}
            {text("parent2Work", "Место работы, должность (второй родитель)", { required: false })}
          </div>
          {text("hobbies", "Творческие увлечения ребёнка", { multiline: true, required: false })}
        </section>
      )}

      {cfg.tariffs.length > 1 && (
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            {cfg.tariffTitle}
            <span className="text-destructive"> *</span>
          </h3>
          <RadioGroup value={f.tariff} onValueChange={(v) => set("tariff", v as FormState["tariff"])} className="gap-3">
            {cfg.tariffs.map((t) => (
              <Label key={t.value} htmlFor={`t-${t.value}`} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-slate-400 bg-white p-4 font-normal">
                <RadioGroupItem id={`t-${t.value}`} value={t.value} className="mt-1" />
                <span>
                  <span className="block font-semibold">{t.title}</span>
                  <span className="text-sm text-muted-foreground">{t.note}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
          {err("tariff") && <p className="text-sm text-destructive">{errors.tariff}</p>}
        </section>
      )}

      <section className="space-y-2">
        <Label htmlFor="source" className="text-lg font-semibold">
          Откуда вы о нас узнали?<span className="text-destructive"> *</span>
        </Label>
        <Select value={f.source} onValueChange={(v) => set("source", v)}>
          <SelectTrigger id="source" className="bg-white">
            <SelectValue placeholder="Выберите вариант" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {err("source") && <p className="text-sm text-destructive">{errors.source}</p>}
      </section>

      <section className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            id="agreeContract"
            className="mt-1"
            checked={f.agreeContract}
            onCheckedChange={(v) => set("agreeContract", v === true)}
          />
          <Label htmlFor="agreeContract" className="font-normal leading-snug">
            С условиями{" "}
            <Link to={withTest(cfg.textPath, f.isTest)} target="_blank" className="text-primary underline">
              Договора
            </Link>
            , {cfg.appendices} и{" "}
            <Link to={withTest(`/oferta/?kind=${kind}`, f.isTest)} target="_blank" className="text-primary underline">
              оферты
            </Link>{" "}
            ознакомлен(а) и согласен(а) <span className="text-destructive">*</span>
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="agreePersonal"
            className="mt-1"
            checked={f.agreePersonal}
            onCheckedChange={(v) => set("agreePersonal", v === true)}
          />
          <Label htmlFor="agreePersonal" className="font-normal leading-snug">
            Даю согласие на обработку персональных данных (своих и Ребёнка) в соответствии с ФЗ № 152-ФЗ{" "}
            <span className="text-destructive">*</span>
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="agreePhoto"
            className="mt-1"
            checked={f.agreePhoto}
            onCheckedChange={(v) => set("agreePhoto", v === true)}
          />
          <Label htmlFor="agreePhoto" className="font-normal leading-snug">
            Даю согласие на фото- и видеосъёмку Ребёнка и размещение материалов в соцсетях центра
          </Label>
        </div>
      </section>

      <div className="space-y-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={!valid}>
          Подписать договор
        </Button>
      </div>
    </form>
  );
}
