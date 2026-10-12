import { getCaptchaToken } from "@/lib/formGuard";
import type { ContractForm } from "./formUtils";

const CONTRACT_SIGN_URL = "https://functions.poehali.dev/22a3d560-7847-466d-be7b-9f6e4cbd6cbf";

export interface ApiResult {
  ok: boolean;
  error?: string;
  number?: number;
}

async function post(payload: Record<string, unknown>): Promise<ApiResult> {
  try {
    const res = await fetch(CONTRACT_SIGN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, number: data.number };
    return { ok: false, error: data.error || "Не удалось выполнить запрос. Попробуйте ещё раз." };
  } catch {
    return { ok: false, error: "Нет связи с сервером. Попробуйте ещё раз." };
  }
}

export interface PersonalOffer {
  program: "garden" | "prod";
  child_name: string;
  tariff_name: string;
  price_month: number;
  comment: string;
}

export type OfferResult = { ok: true; offer: PersonalOffer } | { ok: false; error: string; network?: boolean };

export async function checkOffer(code: string): Promise<OfferResult> {
  try {
    const res = await fetch(CONTRACT_SIGN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check_offer", offer_code: code }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.offer) return { ok: true, offer: data.offer as PersonalOffer };
    if (res.status === 404) return { ok: false, error: data.error || OFFER_INVALID };
    return { ok: false, error: "Не удалось проверить ссылку. Попробуйте ещё раз.", network: true };
  } catch {
    return { ok: false, error: "Нет связи с сервером. Попробуйте ещё раз.", network: true };
  }
}

export const OFFER_INVALID = "Ссылка недействительна, обратитесь к администратору";

export async function requestCode(form: ContractForm, offerCode?: string): Promise<ApiResult> {
  const token = await getCaptchaToken();
  if (token === null) return { ok: false, error: "Не удалось пройти проверку. Попробуйте ещё раз." };
  return post({ action: "request_code", form, captcha_token: token, ...(offerCode ? { offer_code: offerCode } : {}) });
}

export function verifyCode(email: string, code: string): Promise<ApiResult> {
  return post({ action: "verify_code", email, code });
}
