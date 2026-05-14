import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fallbackPortfolioProjects } from "../src/content/fallback-projects.js";
import { projectOverrides } from "../src/content/project-overrides.js";
import { getPinnedRepos } from "../src/server/github.js";
import { buildPortfolioProjects } from "../src/server/portfolio.js";

const CACHE_OK = "public, s-maxage=21600, stale-while-revalidate=86400";
const CACHE_FALLBACK = "public, s-maxage=3600";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username?.trim() || !token?.trim()) {
      res.setHeader("Cache-Control", CACHE_FALLBACK);
      return res.status(200).json({ projects: fallbackPortfolioProjects, source: "fallback" });
    }

    try {
      const pinned = await getPinnedRepos(username.trim(), token.trim());
      if (pinned.length === 0) {
        res.setHeader("Cache-Control", CACHE_FALLBACK);
        return res.status(200).json({ projects: fallbackPortfolioProjects, source: "empty_pins" });
      }
      const projects = buildPortfolioProjects(pinned, projectOverrides);
      res.setHeader("Cache-Control", CACHE_OK);
      return res.status(200).json({ projects, source: "github" });
    } catch {
      res.setHeader("Cache-Control", CACHE_FALLBACK);
      return res.status(200).json({ projects: fallbackPortfolioProjects, source: "error" });
    }
  } catch (err) {
    console.error("portfolio-projects failed", err);
    res.setHeader("Cache-Control", "public, s-maxage=300");
    return res.status(200).json({
      projects: [],
      source: "fatal",
      error: "Portfolio projects API unavailable",
    });
  }
}
