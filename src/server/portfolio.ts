import type { ProjectOverride } from "../content/project-overrides.js";
import type { PinnedRepositoryNode } from "./github.js";
import { isTrustedOgImageUrl } from "./repo-media.js";
import type { PortfolioProject } from "../types/portfolio-project.js";

function defaultColorFromRepoName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  const hue = h % 360;
  return `${hue} 55% 48%`;
}

function techFromRepo(repo: PinnedRepositoryNode): string[] {
  const topics = repo.repositoryTopics.nodes.map((n) => n.topic.name).filter(Boolean);
  const lang = repo.primaryLanguage?.name;
  const merged: string[] =
    lang && !topics.includes(lang) ? [lang, ...topics] : topics.length > 0 ? [...topics] : lang ? [lang] : ["GitHub"];
  return Array.from(new Set(merged)).slice(0, 8);
}

function titleFromRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function buildPortfolioProjects(
  repos: PinnedRepositoryNode[],
  overrides: Record<string, ProjectOverride>,
): PortfolioProject[] {
  return repos.map((repo) => {
    const o = overrides[repo.name] ?? {};
    const description =
      o.description ??
      (repo.description && repo.description.trim().length > 0
        ? repo.description
        : "Open-source work on GitHub — see the repository for details.");

    const tech = o.tech ?? techFromRepo(repo);
    const github = o.github ?? repo.url;
    // GitHub "About" website → live demo when not overridden
    const liveDemo = o.liveDemo ?? (repo.homepageUrl && repo.homepageUrl.length > 0 ? repo.homepageUrl : undefined);
    const color = o.color ?? defaultColorFromRepoName(repo.name);

    const ogImage =
      repo.openGraphImageUrl && isTrustedOgImageUrl(repo.openGraphImageUrl) ? repo.openGraphImageUrl : undefined;
    const previewImage = o.previewImage ?? ogImage;

    const engineeringHighlights =
      o.engineeringHighlights && o.engineeringHighlights.length > 0
        ? o.engineeringHighlights.slice(0, 5)
        : undefined;

    return {
      repoName: repo.name,
      title: o.title ?? titleFromRepoName(repo.name),
      description,
      tech,
      github,
      liveDemo,
      caseStudy: o.caseStudy,
      architecture: o.architecture,
      previewVideo: o.previewVideo,
      previewImage,
      engineeringHighlights,
      color,
    } satisfies PortfolioProject;
  });
}
