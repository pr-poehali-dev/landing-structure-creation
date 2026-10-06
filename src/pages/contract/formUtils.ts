export type Tariff = "basic" | "special";

export interface ContractForm {
  fullName: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
  passportIssuedBy: string;
  passportIssuedDate: string;
  passportDeptCode: string;
  address: string;
  phoneMother: string;
  phoneFather: string;
  email: string;
  childName: string;
  childBirthDate: string;
  childCertificate: string;
  trustedPersons: string;
  health: string;
  tariff: Tariff | "";
  agreeContract: boolean;
  agreePersonal: boolean;
  agreePhoto: boolean;
}

export const EMPTY_FORM: ContractForm = {
  fullName: "",
  birthDate: "",
  passportSeries: "",
  passportNumber: "",
  passportIssuedBy: "",
  passportIssuedDate: "",
  passportDeptCode: "",
  address: "",
  phoneMother: "",
  phoneFather: "",
  email: "",
  childName: "",
  childBirthDate: "",
  childCertificate: "",
  trustedPersons: "",
  health: "",
  tariff: "",
  agreeContract: false,
  agreePersonal: false,
  agreePhoto: false,
};

export const digits = (s: string) => s.replace(/\D/g, "");

export function formatPhone(value: string): string {
  let d = digits(value);
  if (d.startsWith("7") || d.startsWith("8")) d = d.slice(1);
  d = d.slice(0, 10);
  if (!d) return "";
  let out = "+7 (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

export function formatDate(value: string): string {
  const d = digits(value).slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += "." + d.slice(2, 4);
  if (d.length > 4) out += "." + d.slice(4, 8);
  return out;
}

export function formatDeptCode(value: string): string {
  const d = digits(value).slice(0, 6);
  return d.length > 3 ? d.slice(0, 3) + "-" + d.slice(3) : d;
}

export const isPhoneValid = (v: string) => digits(v).length === 11;
export const isEmailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function isDateValid(v: string): boolean {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v);
  if (!m) return false;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(y, mo - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d && y >= 1900 && dt <= new Date()
  );
}

export type FieldKey = keyof ContractForm;

export function getErrors(f: ContractForm): Partial<Record<FieldKey, string>> {
  const e: Partial<Record<FieldKey, string>> = {};
  const req = (k: FieldKey, label = "Заполните поле") => {
    if (!String(f[k]).trim()) e[k] = label;
  };
  req("fullName");
  req("passportIssuedBy");
  req("address");
  req("childName");
  req("trustedPersons");
  req("health", "Заполните поле (если нет — напишите «нет»)");

  if (!isDateValid(f.birthDate)) e.birthDate = "Формат ДД.ММ.ГГГГ";
  if (!isDateValid(f.passportIssuedDate)) e.passportIssuedDate = "Формат ДД.ММ.ГГГГ";
  if (!isDateValid(f.childBirthDate)) e.childBirthDate = "Формат ДД.ММ.ГГГГ";
  if (digits(f.passportSeries).length !== 4) e.passportSeries = "4 цифры";
  if (digits(f.passportNumber).length !== 6) e.passportNumber = "6 цифр";
  if (digits(f.passportDeptCode).length !== 6) e.passportDeptCode = "Формат 000-000";
  if (!isPhoneValid(f.phoneMother)) e.phoneMother = "Формат +7 (XXX) XXX-XX-XX";
  if (f.phoneFather && !isPhoneValid(f.phoneFather)) e.phoneFather = "Формат +7 (XXX) XXX-XX-XX";
  if (!isEmailValid(f.email)) e.email = "Введите корректный email";
  if (!f.childCertificate.trim()) e.childCertificate = "Заполните поле";
  if (!f.tariff) e.tariff = "Выберите тариф";
  if (!f.agreeContract) e.agreeContract = "Обязательно";
  if (!f.agreePersonal) e.agreePersonal = "Обязательно";
  return e;
}
