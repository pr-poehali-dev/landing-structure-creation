import { Link } from "@/lib/router-compat";
import { KINDS, type ContractKind } from "./kinds";
import { withTest } from "./formUtils";

const ORDER: ContractKind[] = ["garden", "half", "prod", "club"];

export default function KindSwitcher({ current, isTest }: { current: ContractKind; isTest: boolean }) {
  return (
    <section className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Выберите договор, который хотите заполнить</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {ORDER.map((k) => {
          const active = k === current;
          return (
            <Link
              key={k}
              to={withTest(KINDS[k].path, isTest)}
              aria-current={active ? "page" : undefined}
              className={
                "rounded-lg border px-4 py-3 text-sm font-medium transition-colors " +
                (active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-white hover:border-primary hover:bg-muted/50")
              }
            >
              {KINDS[k].short}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
