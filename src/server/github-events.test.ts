import { describe, expect, it } from "vitest";
import { dedupeGithubFeedItems, formatGithubEvent } from "@/server/github-events";

describe("formatGithubEvent", () => {
  it("formats PushEvent with branch", () => {
    const line = formatGithubEvent({
      id: "1",
      type: "PushEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/my-app" },
      payload: { ref: "refs/heads/main", size: 1 },
    });
    expect(line?.title).toContain("Pushed updates to my-app");
    expect(line?.title).toContain("main");
  });

  it("formats Create repository", () => {
    const line = formatGithubEvent({
      id: "2",
      type: "CreateEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/RouteWise" },
      payload: { ref_type: "repository" },
    });
    expect(line?.title).toBe("Created repository RouteWise");
  });

  it("returns null for invalid payloads", () => {
    expect(formatGithubEvent(null)).toBeNull();
    expect(formatGithubEvent({})).toBeNull();
  });
});

describe("dedupeGithubFeedItems", () => {
  it("merges consecutive pushes to the same repo", () => {
    const items = dedupeGithubFeedItems([
      {
        id: "github-a",
        title: "Pushed updates to my-app (main)",
        occurredAt: "2026-05-01T12:00:00Z",
      },
      {
        id: "github-b",
        title: "Pushed updates to my-app (main)",
        occurredAt: "2026-05-01T13:00:00Z",
      },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Pushed updates to my-app");
    expect(items[0].description).toBe("Multiple recent pushes");
  });
});
