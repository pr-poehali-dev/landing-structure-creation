import { createFileRoute } from "@tanstack/react-router";
import SignContract from "@/pages/contract/SignContract";

export const Route = createFileRoute("/dogovor/klub/")({
  component: SignContractPage,
});

function SignContractPage() {
  return <SignContract kind="club" />;
}
