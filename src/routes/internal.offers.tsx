import { createFileRoute } from "@tanstack/react-router";
import OffersAdmin from "@/pages/internal/OffersAdmin";

export const Route = createFileRoute("/internal/offers")({
  component: OffersAdmin,
});
