import type { VercelRequest, VercelResponse } from "@vercel/node";
import { manualUpdates } from "../src/content/manual-updates.js";
import { mergeActivityFeedItems, manualUpdatesToFeedItems } from "../src/server/activity-feed-merge.js";
import { githubEventsToFeedItems } from "../src/server/github-events.js";
import { getPublicUserEvents } from "../src/server/github.js";

const CACHE_OK = "public, s-maxage=3600, stale-while-revalidate=7200";
const CACHE_FALLBACK = "public, s-maxage=1800";

const FEED_LIMIT = 5;
const GITHUB_EVENT_CAP = 24;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;
    const manual = manualUpdatesToFeedItems(manualUpdates);

    if (!username?.trim() || !token?.trim()) {
      res.setHeader("Cache-Control", CACHE_FALLBACK);
      const items = mergeActivityFeedItems([], manual, FEED_LIMIT);
      return res.status(200).json({ items, source: "manual_only" });
    }

    try {
      const raw = await getPublicUserEvents(username.trim(), token.trim());
      const github = githubEventsToFeedItems(raw, GITHUB_EVENT_CAP);
      const items = mergeActivityFeedItems(github, manual, FEED_LIMIT);
      res.setHeader("Cache-Control", CACHE_OK);
      return res.status(200).json({ items, source: "github+manual" });
    } catch {
      res.setHeader("Cache-Control", CACHE_FALLBACK);
      const items = mergeActivityFeedItems([], manual, FEED_LIMIT);
      return res.status(200).json({ items, source: "error" });
    }
  } catch (err) {
    console.error("activity-feed failed", err);
    res.setHeader("Cache-Control", "public, s-maxage=300");
    return res.status(200).json({
      items: [],
      source: "fatal",
      error: "Activity feed unavailable",
    });
  }
}
