interface Item {
  source?: string;
  is_test?: boolean;
}

const groupName = (s?: string) => {
  if (!s) return "Не указано";
  return s.startsWith("Другое") ? "Другое" : s;
};

export default function SourceStats({ rows }: { rows: Item[] }) {
  const real = rows.filter((r) => !r.is_test);
  if (real.length === 0) return null;

  const counts = new Map<string, number>();
  real.forEach((r) => {
    const k = groupName(r.source);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  const list = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const max = list[0][1];

  return (
    <section className="max-w-xl space-y-3 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Откуда приходят клиенты</h2>
      <ul className="space-y-2">
        {list.map(([name, n]) => (
          <li key={name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{name}</span>
              <span className="font-medium">
                {n} ({Math.round((n / real.length) * 100)}%)
              </span>
            </div>
            <div className="h-2 rounded bg-muted">
              <div className="h-2 rounded bg-primary" style={{ width: `${(n / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">Всего договоров без тестовых: {real.length}</p>
    </section>
  );
}
