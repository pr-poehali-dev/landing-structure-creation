import { createFileRoute } from "@tanstack/react-router";
import ContractChoice from "@/pages/contract/ContractChoice";

export const Route = createFileRoute("/dogovor/")({
  component: ContractChoice,
});
