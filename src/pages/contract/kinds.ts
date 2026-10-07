import { CONTRACT_BLOCKS, type Block } from "./contractData";
import { CLUB_BLOCKS } from "./data/clubBlocks";
import { HALF_BLOCKS } from "./data/halfBlocks";
import { PROD_BLOCKS } from "./data/prodBlocks";

export type ContractKind = "garden" | "prod" | "half" | "club";

export interface TariffOption {
  value: string;
  title: string;
  note: string;
}

export interface KindConfig {
  kind: ContractKind;
  path: string;
  textPath: string;
  short: string;
  heading: string;
  blocks: Block[];
  docxUrl: string;
  tariffTitle: string;
  tariffs: TariffOption[];
  appendices: string;
  summary: string;
}

const CDN = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/";

export const KINDS: Record<ContractKind, KindConfig> = {
  garden: {
    kind: "garden",
    path: "/dogovor/",
    textPath: "/dogovor/tekst/",
    short: "Детский сад",
    heading: "Договор об оказании услуг по присмотру и уходу за детьми",
    blocks: CONTRACT_BLOCKS,
    docxUrl: CDN + "1f18a467-f459-4a1a-85cd-62439d8fcdb6.docx",
    tariffTitle: "Тариф",
    tariffs: [
      { value: "basic", title: "«Основной» — 25 000 руб./мес", note: "Приложение № 1" },
      { value: "special", title: "«Специальный» — 20 000 руб./мес", note: "Минимальный срок 4 месяца, Приложение № 2" },
    ],
    appendices: "Приложениями № 1 и № 2",
    summary: "Приложения № 1 и № 2",
  },
  prod: {
    kind: "prod",
    path: "/dogovor/prodlenka/",
    textPath: "/dogovor/prodlenka/tekst/",
    short: "Продлёнка",
    heading: "Договор об оказании услуг по присмотру и уходу за детьми младшего школьного возраста в группе продлённого дня",
    blocks: PROD_BLOCKS,
    docxUrl: CDN + "bbc0afbb-ae2f-4c9d-b464-cc3477145a2c.docx",
    tariffTitle: "Группа",
    tariffs: [
      { value: "morning", title: "Утренняя продлёнка", note: "С 8:00 до 12:30" },
      { value: "day", title: "Дневная продлёнка", note: "С 12:00 до 18:00" },
    ],
    appendices: "Приложениями № 1–5",
    summary: "Приложения № 1–5",
  },
  half: {
    kind: "half",
    path: "/dogovor/nepolny-den/",
    textPath: "/dogovor/nepolny-den/tekst/",
    short: "Неполный день с питанием",
    heading: "Договор об оказании услуг по присмотру и уходу за детьми (неполный день с питанием)",
    blocks: HALF_BLOCKS,
    docxUrl: CDN + "8273685d-314f-4e77-b345-6e70a293875f.docx",
    tariffTitle: "Тариф",
    tariffs: [{ value: "half", title: "«Неполный день с питанием» — 18 000 руб./мес", note: "Приложение № 1" }],
    appendices: "Приложением № 1",
    summary: "Приложение № 1",
  },
  club: {
    kind: "club",
    path: "/dogovor/klub/",
    textPath: "/dogovor/klub/tekst/",
    short: "Летний клуб",
    heading: "Договор об оказании услуг летнего клуба дневного пребывания",
    blocks: CLUB_BLOCKS,
    docxUrl: CDN + "20fdb54a-3cf4-484f-b519-e58cea9f3c83.docx",
    tariffTitle: "Стоимость",
    tariffs: [{ value: "club", title: "Смена — 15 500 руб.", note: "10 рабочих дней, питание включено" }],
    appendices: "Приложениями № 1–6",
    summary: "Приложения № 1–6",
  },
};

export const KIND_LABELS: Record<string, string> = {
  garden: "Детский сад",
  prod: "Продлёнка",
  half: "Неполный день",
  club: "Летний клуб",
};

export const TARIFF_LABELS: Record<string, string> = {
  basic: "Основной",
  special: "Специальный",
  morning: "Утренняя группа",
  day: "Дневная группа",
  half: "Неполный день",
  club: "Смена клуба",
};
