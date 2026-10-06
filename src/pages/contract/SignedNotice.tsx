interface Props {
  email: string;
  number?: number;
}

export default function SignedNotice({ email, number }: Props) {
  return (
    <div className="space-y-2 rounded-lg border-2 border-green-600 bg-green-50 p-6 text-green-950">
      <h3 className="text-xl font-semibold">Договор подписан{number ? ` (№ ${number})` : ""}</h3>
      <p>Подписанный договор отправлен на {email}. Копия ушла администратору центра.</p>
    </div>
  );
}
