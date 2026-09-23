import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ── buildReadinessMapPdf — рендерит листы «Карты готовности» (.rm-page внутри
// containerEl) в многостраничный A4 PDF и запускает скачивание файла ────────
export async function buildReadinessMapPdf(containerEl: HTMLElement, filename: string): Promise<void> {
  const pages = Array.from(containerEl.querySelectorAll<HTMLElement>(".rm-page"));
  if (pages.length === 0) return;

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidthMm = pdf.internal.pageSize.getWidth();
  const pageHeightMm = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, pageWidthMm, pageHeightMm);
  }

  pdf.save(filename);
}
