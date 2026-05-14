import { describe, expect, it } from "vitest";
import { mergeActivityFeedItems, manualUpdatesToFeedItems } from "@/server/activity-feed-merge";
import type { ManualUpdate } from "@/content/manual-updates";
import type { ActivityFeedItem } from "@/types/activity-feed";

describe("manualUpdatesToFeedItems", () => {
  it("maps manual updates to feed items with ISO dates", () => {
    const updates: ManualUpdate[] = [
      {
        id: "x",
        type: "linkedin",
        title: "Hello",
        date: "2026-01-02",
      },
    ];
    const items = manualUpdatesToFeedItems(updates);
    expect(items).toHaveLength(1);
    expect(items[0].source).toBe("linkedin");
    expect(items[0].title).toBe("Hello");
    expect(items[0].occurredAt).toMatch(/2026-01-02/);
  });
});

describe("mergeActivityFeedItems", () => {
  it("sorts by occurredAt descending and caps limit", () => {
    const github: ActivityFeedItem[] = [
      {
        id: "g1",
        source: "github",
        title: "Old",
        occurredAt: "2026-01-01T00:00:00.000Z",
      },
      {
        id: "g2",
        source: "github",
        title: "Newer",
        occurredAt: "2026-06-01T00:00:00.000Z",
      },
    ];
    const manual: ActivityFeedItem[] = [
      {
        id: "m1",
        source: "portfolio",
        title: "Latest",
        occurredAt: "2026-12-01T00:00:00.000Z",
      },
    ];
    const merged = mergeActivityFeedItems(github, manual, 2);
    expect(merged.map((i) => i.title)).toEqual(["Latest", "Newer"]);
  });
});
