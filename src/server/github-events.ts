import { activityJournalOverrides } from "../content/activity-journal-overrides.js";
import type { ActivityFeedItem } from "../types/activity-feed.js";

type GithubRepoRef = { name?: string };

type GithubCommitRef = { message?: string };

type GithubPushPayload = {
  ref?: string;
  size?: number;
  commits?: GithubCommitRef[];
};

type GithubCreatePayload = {
  ref_type?: string;
  ref?: string;
  description?: string;
};

type GithubPullRequestPayload = {
  action?: string;
  pull_request?: { title?: string; html_url?: string; merged?: boolean };
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

/** GitHub special profile repo is typically `username/username` — low signal on a portfolio feed. */
function isLikelyProfileReadmeRepo(repo?: GithubRepoRef): boolean {
  const name = repo?.name;
  if (!name || !name.includes("/")) return false;
  const [owner, repoName] = name.split("/");
  return Boolean(owner && repoName && owner === repoName);
}

function firstCommitSummary(payload: GithubPushPayload): string {
  const raw = payload.commits?.[0]?.message;
  if (typeof raw !== "string" || !raw.trim()) return "latest changes";
  let line = raw.split("\n")[0].trim();
  const coIdx = line.toLowerCase().indexOf("co-authored-by:");
  if (coIdx !== -1) line = line.slice(0, coIdx).trim();
  line = line.replace(/\s*\(#\d+\)\s*$/u, "").trim();
  if (!line) return "latest changes";
  if (line.length > 72) return `${line.slice(0, 69)}…`;
  return line;
}

function applyJournalOverride(
  line: Omit<ActivityFeedItem, "source">,
  raw: unknown,
): Omit<ActivityFeedItem, "source"> {
  if (!isRecord(raw) || typeof raw.id !== "string") return line;
  const rule = activityJournalOverrides.find((r) => r.matchEventId === raw.id);
  if (!rule) return line;
  return {
    ...line,
    title: rule.displayTitle ?? line.title,
    description: rule.displayDescription ?? line.description,
  };
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
    case "WatchEvent":
    case "ForkEvent":
      return null;
    case "PushEvent": {
      const p = payload as GithubPushPayload;
      const summary = firstCommitSummary(p);
      const title = `Shipped work on ${repoName}: ${summary}`;
      return { id: `github-${id}`, title, occurredAt: createdAt };
    }
    case "CreateEvent": {
      const p = payload as GithubCreatePayload;
      const refType = p.ref_type;
      if (refType === "repository") {
        if (isLikelyProfileReadmeRepo(ev.repo)) return null;
        return {
          id: `github-${id}`,
          title: `Started ${repoName} — new repository on GitHub`,
          occurredAt: createdAt,
        };
      }
      if (refType === "branch" || refType === "tag") {
        return null;
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
      const pr = p.pull_request;
      const prTitle = pr?.title?.trim() || "Pull request";
      const url = typeof pr?.html_url === "string" ? pr.html_url : undefined;
      const merged = pr?.merged === true;
      let verb: string;
      if (action === "closed" && merged) verb = "Merged";
      else if (action === "closed" && !merged) verb = "Closed";
      else if (action === "opened") verb = "Opened";
      else if (action === "reopened") verb = "Reopened";
      else verb = capitalize(action);
      return {
        id: `github-${id}`,
        title: prTitle,
        description: `${verb} · ${repoName}`,
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
        title: `Release ${tag} for ${repoName}`,
        description: `${capitalize(action)} on GitHub`,
        url,
        occurredAt: createdAt,
      };
    }
    case "IssuesEvent": {
      const action = typeof (payload as { action?: string }).action === "string" ? (payload as { action: string }).action : "updated";
      return {
        id: `github-${id}`,
        title: `${capitalize(action)} issue in ${repoName}`,
        occurredAt: createdAt,
      };
    }
    case "DeleteEvent":
      return null;
    case "PublicEvent": {
      return {
        id: `github-${id}`,
        title: `Published ${repoName} on GitHub`,
        occurredAt: createdAt,
      };
    }
    default:
      return null;
  }
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Repo segment from `Shipped work on {repo}: …` */
function extractRepoFromShippedTitle(title: string): string | null {
  const m = /^Shipped work on (.+?):/.exec(title);
  return m ? m[1] : null;
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
  const prevRepo = extractRepoFromShippedTitle(prev.title);
  const currRepo = extractRepoFromShippedTitle(curr.title);
  if (!prevRepo || !currRepo || prevRepo !== currRepo) return null;
  if (!prev.title.startsWith("Shipped work on ") || !curr.title.startsWith("Shipped work on ")) return null;
  return {
    ...curr,
    title: `Shipped work on ${currRepo}: latest activity`,
    description: "Multiple recent pushes",
  };
}

export function githubEventsToFeedItems(rawEvents: unknown[], limit: number): ActivityFeedItem[] {
  const lines: Omit<ActivityFeedItem, "source">[] = [];
  for (const raw of rawEvents) {
    const line = formatGithubEvent(raw);
    if (!line) continue;
    lines.push(applyJournalOverride(line, raw));
  }
  const deduped = dedupeGithubFeedItems(lines);
  return deduped.slice(0, limit).map((item) => ({ ...item, source: "github" as const }));
}
