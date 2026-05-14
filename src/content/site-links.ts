/**
 * Canonical public profile URLs for the portfolio UI.
 * Change these here only — Hero, Contact, Footer, and fallbacks import from this file.
 *
 * For API-driven features (pinned repos, activity feed), set `GITHUB_USERNAME` on the
 * host to the same account as `SITE_GITHUB_USERNAME` below.
 */
export const SITE_GITHUB_USERNAME = "Ndelu-Blose" as const;

export const SITE_GITHUB_URL = `https://github.com/${SITE_GITHUB_USERNAME}` as const;

export const SITE_LINKEDIN_URL = "https://www.linkedin.com/in/thamsanqa-ndelu" as const;

/** Repository page URL with optional `.git` suffix (matches prior fallback data). */
export function siteGithubRepoUrl(repoName: string, options?: { gitSuffix?: boolean }): string {
  const suffix = options?.gitSuffix ? ".git" : "";
  return `https://github.com/${SITE_GITHUB_USERNAME}/${repoName}${suffix}`;
}
