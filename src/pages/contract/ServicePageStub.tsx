import useNoIndex from "@/hooks/useNoIndex";

interface Props {
  title: string;
}

export default function ServicePageStub({ title }: Props) {
  useNoIndex(title);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">{title}</h1>
    </main>
  );
}
