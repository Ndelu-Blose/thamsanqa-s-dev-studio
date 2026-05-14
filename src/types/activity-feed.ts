export type ActivityFeedItem = {
  id: string;
  source: "github" | "linkedin" | "portfolio";
  title: string;
  description?: string;
  url?: string;
  /** ISO 8601 timestamp */
  occurredAt: string;
};
