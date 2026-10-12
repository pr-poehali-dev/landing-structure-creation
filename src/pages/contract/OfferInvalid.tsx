import { Button } from "@/components/ui/button";

export default function OfferInvalid({ message, retry }: { message: string; retry?: () => void }) {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">{message}</h1>
      {retry && <Button onClick={retry}>Попробовать ещё раз</Button>}
    </main>
  );
}
