import { describe, expect, it } from "vitest";
import { dedupeGithubFeedItems, formatGithubEvent } from "@/server/github-events";

describe("formatGithubEvent", () => {
  it("formats PushEvent using first commit message", () => {
    const line = formatGithubEvent({
      id: "1",
      type: "PushEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/my-app" },
      payload: {
        ref: "refs/heads/main",
        size: 1,
        commits: [{ message: "feat: add login flow\n\nCo-authored-by: x <x@y.com>" }],
      },
    });
    expect(line?.title).toBe("Shipped work on my-app: feat: add login flow");
  });

  it("formats PushEvent without commits", () => {
    const line = formatGithubEvent({
      id: "1b",
      type: "PushEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/my-app" },
      payload: { ref: "refs/heads/main", size: 1 },
    });
    expect(line?.title).toBe("Shipped work on my-app: latest changes");
  });

  it("formats Create repository as journal line", () => {
    const line = formatGithubEvent({
      id: "2",
      type: "CreateEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/RouteWise" },
      payload: { ref_type: "repository" },
    });
    expect(line?.title).toBe("Started RouteWise — new repository on GitHub");
  });

  it("formats PullRequestEvent with PR title as headline", () => {
    const line = formatGithubEvent({
      id: "3",
      type: "PullRequestEvent",
      created_at: "2026-05-01T12:00:00Z",
      repo: { name: "org/app" },
      payload: {
        action: "opened",
        pull_request: { title: "Add portfolio sync", html_url: "https://github.com/org/app/pull/1" },
      },
    });
    expect(line?.title).toBe("Add portfolio sync");
    expect(line?.description).toContain("Opened");
    expect(line?.description).toContain("app");
  });

  it("returns null for DeleteEvent", () => {
    expect(
      formatGithubEvent({
        id: "4",
        type: "DeleteEvent",
        created_at: "2026-05-01T12:00:00Z",
        repo: { name: "org/app" },
        payload: { ref: "old-feature", ref_type: "branch" },
      }),
    ).toBeNull();
  });

  it("returns null for CreateEvent on branch", () => {
    expect(
      formatGithubEvent({
        id: "4b",
        type: "CreateEvent",
        created_at: "2026-05-01T12:00:00Z",
        repo: { name: "org/app" },
        payload: { ref_type: "branch", ref: "feature/x" },
      }),
    ).toBeNull();
  });

  it("returns null for CreateEvent on likely GitHub profile README repo", () => {
    expect(
      formatGithubEvent({
        id: "4c",
        type: "CreateEvent",
        created_at: "2026-05-01T12:00:00Z",
        repo: { name: "Ndelu-Blose/Ndelu-Blose" },
        payload: { ref_type: "repository" },
      }),
    ).toBeNull();
  });

  it("returns null for unknown event types", () => {
    expect(
      formatGithubEvent({
        id: "9",
        type: "GollumEvent",
        created_at: "2026-05-01T12:00:00Z",
        repo: { name: "org/wiki" },
        payload: {},
      }),
    ).toBeNull();
  });

  it("returns null for WatchEvent", () => {
    expect(
      formatGithubEvent({
        id: "5",
        type: "WatchEvent",
        created_at: "2026-05-01T12:00:00Z",
        repo: { name: "org/app" },
        payload: {},
      }),
    ).toBeNull();
  });

  it("returns null for invalid payloads", () => {
    expect(formatGithubEvent(null)).toBeNull();
    expect(formatGithubEvent({})).toBeNull();
  });
});

describe("dedupeGithubFeedItems", () => {
  it("merges consecutive shipped pushes to the same repo", () => {
    const items = dedupeGithubFeedItems([
      {
        id: "github-a",
        title: "Shipped work on my-app: one",
        occurredAt: "2026-05-01T12:00:00Z",
      },
      {
        id: "github-b",
        title: "Shipped work on my-app: two",
        occurredAt: "2026-05-01T13:00:00Z",
      },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Shipped work on my-app: latest activity");
    expect(items[0].description).toBe("Multiple recent pushes");
  });
});
