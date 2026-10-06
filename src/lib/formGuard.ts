import { toast } from "sonner";

// Публичный ключ клиента Яндекс СмартКапчи (не секрет). Пока пусто — капча не запрашивается.
export const SMARTCAPTCHA_SITEKEY = "";

interface SmartCaptchaApi {
  render: (container: HTMLElement, params: Record<string, unknown>) => number;
  execute: (widgetId: number) => void;
  reset: (widgetId: number) => void;
  subscribe: (widgetId: number, event: string, cb: () => void) => void;
}

declare global {
  interface Window {
    smartCaptcha?: SmartCaptchaApi;
  }
}

let scriptPromise: Promise<void> | null = null;
let widgetId: number | null = null;
let pending: ((token: string | null) => void) | null = null;

function loadCaptchaScript(): Promise<void> {
  if (window.smartCaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://smartcaptcha.yandexcloud.net/captcha.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("captcha script failed"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

function finish(token: string | null) {
  if (pending) {
    const cb = pending;
    pending = null;
    cb(token);
  }
  if (widgetId !== null && window.smartCaptcha) window.smartCaptcha.reset(widgetId);
}

/** Возвращает токен невидимой капчи, "" если капча не настроена, null если проверка не пройдена */
export async function getCaptchaToken(): Promise<string | null> {
  if (!SMARTCAPTCHA_SITEKEY) return "";
  try {
    await loadCaptchaScript();
  } catch {
    return null;
  }
  const sc = window.smartCaptcha;
  if (!sc) return null;

  let container = document.getElementById("sc-invisible-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "sc-invisible-container";
    document.body.appendChild(container);
  }

  if (widgetId === null) {
    widgetId = sc.render(container, {
      sitekey: SMARTCAPTCHA_SITEKEY,
      invisible: true,
      hl: "ru",
      callback: (token: string) => finish(token),
    });
    sc.subscribe(widgetId, "challenge-hidden", () => finish(null));
  }

  return new Promise<string | null>((resolve) => {
    pending = resolve;
    window.setTimeout(() => finish(null), 30000);
    sc.execute(widgetId as number);
  });
}

function pageMeta() {
  return {
    page_url: window.location.href,
    site_host: window.location.hostname,
  };
}

/**
 * Единая отправка формы на бэкенд: капча + honeypot + адрес страницы.
 * Возвращает true только при успешном ответе сервера.
 */
export async function submitForm(
  url: string,
  payload: Record<string, unknown>,
  form?: HTMLFormElement | null
): Promise<boolean> {
  const honeypot = form ? String(new FormData(form).get("website") ?? "") : "";

  const token = await getCaptchaToken();
  if (token === null) {
    toast.error("Не удалось пройти проверку. Попробуйте ещё раз.");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, ...pageMeta(), website: honeypot, captcha_token: token }),
    });
    if (res.status === 429) {
      toast.error("Слишком много заявок с вашего адреса. Позвоните нам или попробуйте позже.");
      return false;
    }
    if (!res.ok) {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
      return false;
    }
    return true;
  } catch {
    toast.error("Нет связи с сервером. Попробуйте ещё раз.");
    return false;
  }
}
