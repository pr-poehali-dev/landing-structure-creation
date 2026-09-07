import { useEffect } from "react";

// Временно меняет title и meta description страницы, возвращая исходные значения при размонтировании
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";

    document.title = title;
    metaDesc?.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
