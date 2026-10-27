// Title и meta description страниц задаются в head() маршрутов (src/routes/*) —
// они отдаются уже в серверном HTML. Хук оставлен для совместимости вызовов.
export function useSeo(title: string, description: string) {
  void title;
  void description;
}
