export type EngineeringNote = {
  title: string;
  description: string;
  tag: string;
};

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    title: "Prefer boring boundaries",
    description: "Keep API contracts explicit, version surfaces that ship to mobile, and let the database own invariants where it belongs.",
    tag: "Architecture",
  },
  {
    title: "Observability before heroics",
    description: "Structured logs, meaningful error shapes, and a single place to trace a user action beat clever one-off fixes.",
    tag: "Reliability",
  },
  {
    title: "Auth is a product feature",
    description: "Session lifetimes, recovery paths, and least-privilege tokens are part of UX — not an afterthought bolted on at the end.",
    tag: "Security",
  },
];
