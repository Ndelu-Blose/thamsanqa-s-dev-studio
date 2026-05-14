import type { ManualUpdate } from "../content/manual-updates.js";
import type { ActivityFeedItem } from "../types/activity-feed.js";

function manualDateToIso(date: string): string {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }
  return date.includes("T") ? date : `${date}T12:00:00.000Z`;
}

export function manualUpdatesToFeedItems(updates: ManualUpdate[]): ActivityFeedItem[] {
  return updates.map((u) => ({
    id: `manual-${u.id}`,
    source: u.type === "linkedin" ? "linkedin" : "portfolio",
    title: u.title,
    description: u.description,
    url: u.url,
    occurredAt: manualDateToIso(u.date),
  }));
}

export function mergeActivityFeedItems(
  github: ActivityFeedItem[],
  manual: ActivityFeedItem[],
  limit: number,
): ActivityFeedItem[] {
  return [...github, ...manual]
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, limit);
}
