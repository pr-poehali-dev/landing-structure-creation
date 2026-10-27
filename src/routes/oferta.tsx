import { createFileRoute } from "@tanstack/react-router";
import Offer from "@/pages/contract/Offer";

export const Route = createFileRoute("/oferta")({
  component: Offer,
});
