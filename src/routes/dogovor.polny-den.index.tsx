import { createFileRoute } from "@tanstack/react-router";
import SignContract from "@/pages/contract/SignContract";

export const Route = createFileRoute("/dogovor/polny-den/")({
  component: SignContractPage,
});

function SignContractPage() {
  return <SignContract />;
}
