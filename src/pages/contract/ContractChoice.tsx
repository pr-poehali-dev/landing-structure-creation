import { Link, useSearchParams } from "@/lib/router-compat";
import useNoIndex from "@/hooks/useNoIndex";
import Icon from "@/components/ui/icon";
import TestBanner from "./TestBanner";
import { withTest } from "./formUtils";
import { KINDS, type ContractKind } from "./kinds";

const ORDER: ContractKind[] = ["garden", "half", "prod", "club"];

export default function ContractChoice() {
  useNoIndex("Заключить договор");
  const [params] = useSearchParams();
  const isTest = params.get("test") === "1";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {isTest && <TestBanner />}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Заключить договор</h1>
        <p className="text-muted-foreground">Выберите договор, который вам нужно заполнить</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {ORDER.map((k) => (
          <Link
            key={k}
            to={withTest(KINDS[k].path, isTest)}
            className="flex items-center justify-between gap-3 rounded-lg border bg-white p-5 text-lg font-semibold transition-colors hover:border-primary hover:bg-muted/50"
          >
            {KINDS[k].short}
            <Icon name="ArrowRight" size={20} />
          </Link>
        ))}
      </div>
    </main>
  );
}
