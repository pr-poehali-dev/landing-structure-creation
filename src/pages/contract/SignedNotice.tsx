interface Props {
  email: string;
  number?: number;
  isTest?: boolean;
}

export default function SignedNotice({ email, number, isTest }: Props) {
  return (
    <div className="space-y-3">
      {isTest && (
        <div className="rounded-lg border-2 border-orange-500 bg-orange-100 p-4 text-center font-semibold text-orange-900">
          ЭТО БЫЛ ТЕСТОВЫЙ ДОГОВОР — он не настоящий. В админке он помечен «Тест», в кабинет агента не попадёт.
        </div>
      )}
      <div className="space-y-2 rounded-lg border-2 border-green-600 bg-green-50 p-6 text-green-950">
        <h3 className="text-xl font-semibold">
          {isTest ? "Тестовый договор подписан" : "Договор подписан"}
          {number ? ` (№ ${number})` : ""}
        </h3>
        <p>
          {isTest ? "Тестовый договор" : "Подписанный договор"} отправлен на {email}. Копия ушла администратору центра.
        </p>
      </div>
    </div>
  );
}
