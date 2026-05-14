export type ManualUpdateType = "linkedin" | "portfolio";

export type ManualUpdate = {
  id: string;
  type: ManualUpdateType;
  title: string;
  description?: string;
  url?: string;
  /** ISO 8601 date (YYYY-MM-DD or full ISO) */
  date: string;
};

/**
 * Curated highlights (e.g. LinkedIn). Add an entry when you want it on the site;
 * there is no official LinkedIn read API for personal posts.
 */
export const manualUpdates: ManualUpdate[] = [];
