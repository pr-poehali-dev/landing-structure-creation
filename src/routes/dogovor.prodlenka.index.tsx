import { createFileRoute } from "@tanstack/react-router";
import SignContract from "@/pages/contract/SignContract";

export const Route = createFileRoute("/dogovor/prodlenka/")({
  component: SignContractPage,
});

function SignContractPage() {
  return <SignContract kind="prod" />;
}
