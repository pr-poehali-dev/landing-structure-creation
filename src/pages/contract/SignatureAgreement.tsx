import type { ContractKind } from "./kinds";

const CLAUSE: Record<ContractKind, string> = {
  garden: "п. 8.3.1 Договора",
  prod: "настоящим соглашением и офертой",
  half: "п. 8.2.1 Договора",
  club: "п. 9.1 Договора",
};

export default function SignatureAgreement({ kind = "garden" }: { kind?: ContractKind }) {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
      <h3 className="text-base font-semibold">Соглашение о простой электронной подписи</h3>
      <p>
        В соответствии с {CLAUSE[kind]}, Стороны признают документы, подписанные простой электронной подписью,
        равнозначными документам на бумажном носителе. Простой электронной подписью признаётся указанный Заказчиком
        email вместе с одноразовым кодом (или ссылкой), направленным на этот адрес. Ввод кода означает подписание
        договора и принятие всех его условий.
      </p>
    </section>
  );
}
