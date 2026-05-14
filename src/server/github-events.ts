import type { ActivityFeedItem } from "@/types/activity-feed";

type GithubRepoRef = { name?: string };

type GithubPushPayload = {
  ref?: string;
  size?: number;
};

type GithubCreatePayload = {
  ref_type?: string;
  ref?: string;
  description?: string;
};

type GithubPullRequestPayload = {
  action?: string;
  pull_request?: { title?: string; html_url?: string };
};

type GithubReleasePayload = {
  action?: string;
  release?: { tag_name?: string; html_url?: string; name?: string };
};

type GithubEventRecord = {
  id?: string;
  type?: string;
  created_at?: string;
  repo?: GithubRepoRef;
  payload?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function repoLabel(repo?: GithubRepoRef): string {
  const name = repo?.name;
  return name ? name.split("/").pop() ?? name : "a repository";
}

export function formatGithubEvent(raw: unknown): Omit<ActivityFeedItem, "source"> | null {
  if (!isRecord(raw)) return null;
  const ev = raw as GithubEventRecord;
  const id = typeof ev.id === "string" ? ev.id : null;
  const type = typeof ev.type === "string" ? ev.type : null;
  const createdAt = typeof ev.created_at === "string" ? ev.created_at : null;
  if (!id || !type || !createdAt) return null;

  const repoName = repoLabel(ev.repo);
  const payload = isRecord(ev.payload) ? ev.payload : {};

  switch (type) {
    case "PushEvent": {
      const p = payload as GithubPushPayload;
      const branch = typeof p.ref === "string" ? p.ref.replace(/^refs\/heads\//, "") : undefined;
      const title = branch
        ? `Pushed updates to ${repoName} (${branch})`
        : `Pushed updates to ${repoName}`;
      return { id: `github-${id}`, title, occurredAt: createdAt };
    }
    case "CreateEvent": {
      const p = payload as GithubCreatePayload;
      const refType = p.ref_type;
      if (refType === "repository") {
        return {
          id: `github-${id}`,
          title: `Created repository ${repoName}`,
          occurredAt: createdAt,
        };
      }
      if (refType === "branch" || refType === "tag") {
        const ref = typeof p.ref === "string" ? p.ref : refType;
        return {
          id: `github-${id}`,
          title: `Created ${refType} ${ref} in ${repoName}`,
          occurredAt: createdAt,
        };
      }
      return {
        id: `github-${id}`,
        title: `Created new content in ${repoName}`,
        occurredAt: createdAt,
      };
    }
    case "PullRequestEvent": {
      const p = payload as GithubPullRequestPayload;
      const action = typeof p.action === "string" ? p.action : "updated";
      const prTitle = p.pull_request?.title ?? "a pull request";
      const url = typeof p.pull_request?.html_url === "string" ? p.pull_request.html_url : undefined;
      return {
        id: `github-${id}`,
        title: `${capitalize(action)} pull request in ${repoName}`,
        description: prTitle,
        url,
        occurredAt: createdAt,
      };
    }
    case "ReleaseEvent": {
      const p = payload as GithubReleasePayload;
      const action = typeof p.action === "string" ? p.action : "updated";
      const tag = p.release?.tag_name ?? p.release?.name ?? "release";
      const url = typeof p.release?.html_url === "string" ? p.release.html_url : undefined;
      return {
        id: `github-${id}`,
        title: `${capitalize(action)} ${tag} of ${repoName}`,
        url,
        occurredAt: createdAt,
      };
    }
    case "IssuesEvent": {
      const action = typeof (payload as { action?: string }).action === "string" ? (payload as { action: string }).action : "updated";
      return {
        id: `github-${id}`,
        title: `${capitalize(action)} an issue in ${repoName}`,
        occurredAt: createdAt,
      };
    }
    case "WatchEvent": {
      return {
        id: `github-${id}`,
        title: `Starred ${repoName}`,
        occurredAt: createdAt,
      };
    }
    case "ForkEvent": {
      return {
        id: `github-${id}`,
        title: `Forked ${repoName}`,
        occurredAt: createdAt,
      };
    }
    case "PublicEvent": {
      return {
        id: `github-${id}`,
        title: `Published ${repoName}`,
        occurredAt: createdAt,
      };
    }
    default:
      return {
        id: `github-${id}`,
        title: `${type.replace(/Event$/, "")} on ${repoName}`,
        occurredAt: createdAt,
      };
  }
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Collapse consecutive push lines for the same repository */
export function dedupeGithubFeedItems(items: Omit<ActivityFeedItem, "source">[]): Omit<ActivityFeedItem, "source">[] {
  const out: Omit<ActivityFeedItem, "source">[] = [];
  for (const item of items) {
    const prev = out[out.length - 1];
    const merged = tryMergePush(prev, item);
    if (merged) {
      out[out.length - 1] = merged;
    } else {
      out.push(item);
    }
  }
  return out;
}

function tryMergePush(
  prev: Omit<ActivityFeedItem, "source"> | undefined,
  curr: Omit<ActivityFeedItem, "source">,
): Omit<ActivityFeedItem, "source"> | null {
  if (!prev) return null;
  const prevRepo = extractRepoFromPushTitle(prev.title);
  const currRepo = extractRepoFromPushTitle(curr.title);
  if (!prevRepo || !currRepo || prevRepo !== currRepo) return null;
  if (!prev.title.startsWith("Pushed updates to ") || !curr.title.startsWith("Pushed updates to ")) return null;
  return {
    ...curr,
    title: `Pushed updates to ${currRepo}`,
    description: "Multiple recent pushes",
  };
}

function extractRepoFromPushTitle(title: string): string | null {
  const m = /^Pushed updates to (.+?) \(/.exec(title);
  if (m) return m[1];
  const m2 = /^Pushed updates to (.+)$/.exec(title);
  return m2 ? m2[1] : null;
}

export function githubEventsToFeedItems(rawEvents: unknown[], limit: number): ActivityFeedItem[] {
  const lines: Omit<ActivityFeedItem, "source">[] = [];
  for (const raw of rawEvents) {
    const line = formatGithubEvent(raw);
    if (line) lines.push(line);
  }
  const deduped = dedupeGithubFeedItems(lines);
  return deduped.slice(0, limit).map((item) => ({ ...item, source: "github" as const }));
}
