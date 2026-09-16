declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

const YM_ID = 108711263;

export function ymGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YM_ID, "reachGoal", goal, params);
  }
}