import { describe, expect, it } from "vitest";
import { buildPortfolioProjects } from "@/server/portfolio";
import type { PinnedRepositoryNode } from "@/server/github";
import { projectOverrides } from "@/content/project-overrides";

const baseRepo = (name: string, extras: Partial<PinnedRepositoryNode> = {}): PinnedRepositoryNode => ({
  name,
  description: "From GitHub",
  url: `https://github.com/u/${name}`,
  homepageUrl: null,
  openGraphImageUrl: null,
  stargazerCount: 1,
  forkCount: 0,
  primaryLanguage: { name: "TypeScript", color: "#3178c6" },
  repositoryTopics: { nodes: [{ topic: { name: "react" } }] },
  ...extras,
});

describe("buildPortfolioProjects", () => {
  it("applies overrides by exact repo name", () => {
    const repos = [baseRepo("OLI")];
    const merged = buildPortfolioProjects(repos, projectOverrides);
    expect(merged).toHaveLength(1);
    expect(merged[0].title).toBe("OLI");
    expect(merged[0].previewVideo).toBe("/oli-preview.mp4");
    expect(merged[0].tech).toContain("FastAPI");
  });

  it("falls back to GitHub metadata when no override", () => {
    const repos = [baseRepo("new-repo")];
    const merged = buildPortfolioProjects(repos, {});
    expect(merged[0].repoName).toBe("new-repo");
    expect(merged[0].description).toBe("From GitHub");
    expect(merged[0].github).toContain("new-repo");
  });

  it("uses trusted openGraphImageUrl when no preview override", () => {
    const og = "https://repository-images.githubusercontent.com/123/456";
    const repos = [baseRepo("svc", { openGraphImageUrl: og })];
    const merged = buildPortfolioProjects(repos, {});
    expect(merged[0].previewImage).toBe(og);
  });

  it("passes engineering highlights from overrides", () => {
    const repos = [baseRepo("Fleet_Rental_System")];
    const merged = buildPortfolioProjects(repos, projectOverrides);
    expect(merged[0].engineeringHighlights?.length).toBeGreaterThan(0);
  });
});
