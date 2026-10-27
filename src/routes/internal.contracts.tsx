import { createFileRoute } from "@tanstack/react-router";
import ContractsAdmin from "@/pages/internal/ContractsAdmin";

export const Route = createFileRoute("/internal/contracts")({
  component: ContractsAdmin,
});
