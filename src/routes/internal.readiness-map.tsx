import { createFileRoute } from "@tanstack/react-router";
import ReadinessMapAdminPage from "@/pages/internal/ReadinessMapAdminPage";

export const Route = createFileRoute("/internal/readiness-map")({
  component: ReadinessMapAdminPage,
});
