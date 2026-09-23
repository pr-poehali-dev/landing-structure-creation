import html2canvas from "html2canvas";

// ── buildReadinessMapImage — склеивает листы «Карты готовности» (.rm-page
// внутри containerEl) в одну длинную PNG-картинку и запускает скачивание ────
// PNG выбран вместо PDF: на телефоне мамы открывают её как обычное фото,
// без сторонних приложений — и легко пересылают в мессенджер.
export async function buildReadinessMapImage(containerEl: HTMLElement, filename: string): Promise<void> {
  const pages = Array.from(containerEl.querySelectorAll<HTMLElement>(".rm-page"));
  if (pages.length === 0) return;

  const scale = 2;
  const canvases = await Promise.all(
    pages.map((page) =>
      html2canvas(page, {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
      })
    )
  );

  const gap = 24 * scale;
  const width = Math.max(...canvases.map((c) => c.width));
  const height = canvases.reduce((sum, c) => sum + c.height, 0) + gap * (canvases.length - 1);

  const merged = document.createElement("canvas");
  merged.width = width;
  merged.height = height;
  const ctx = merged.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#e9e9e9";
  ctx.fillRect(0, 0, width, height);

  let offsetY = 0;
  canvases.forEach((c) => {
    ctx.drawImage(c, 0, offsetY);
    offsetY += c.height + gap;
  });

  const dataUrl = merged.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
