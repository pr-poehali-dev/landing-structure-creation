import { useEffect, useState } from "react";
import { useSearchParams } from "@/lib/router-compat";
import { checkOffer, type PersonalOffer } from "./contractApi";

export type OfferState =
  | { status: "none" }
  | { status: "loading" }
  | { status: "ready"; code: string; offer: PersonalOffer }
  | { status: "invalid"; error: string }
  | { status: "failed"; error: string };

export default function useOffer(): OfferState {
  const code = (useSearchParams()[0].get("offer") ?? "").trim();
  const [state, setState] = useState<OfferState>(code ? { status: "loading" } : { status: "none" });

  useEffect(() => {
    if (!code) {
      setState({ status: "none" });
      return;
    }
    let alive = true;
    setState({ status: "loading" });
    checkOffer(code).then((r) => {
      if (!alive) return;
      if (r.ok) setState({ status: "ready", code, offer: r.offer });
      else setState({ status: r.network ? "failed" : "invalid", error: r.error });
    });
    return () => {
      alive = false;
    };
  }, [code]);

  return state;
}
