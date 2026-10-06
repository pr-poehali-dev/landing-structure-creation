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

export async function requestCode(form: ContractForm): Promise<ApiResult> {
  const token = await getCaptchaToken();
  if (token === null) return { ok: false, error: "Не удалось пройти проверку. Попробуйте ещё раз." };
  return post({ action: "request_code", form, captcha_token: token });
}

export function verifyCode(email: string, code: string): Promise<ApiResult> {
  return post({ action: "verify_code", email, code });
}
