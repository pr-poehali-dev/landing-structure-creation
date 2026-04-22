declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string) => void;
  }
}

const YM_ID = 108711263;

export function ymGoal(goal: string) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YM_ID, "reachGoal", goal);
  }
}