import { createFileRoute } from "@tanstack/react-router";
import ContractText from "@/pages/contract/ContractText";

export const Route = createFileRoute("/dogovor/polny-den/tekst")({
  component: ContractTextPage,
});

function ContractTextPage() {
  return <ContractText />;
}
