export type PortfolioProject = {
  /** Stable id from GitHub repo name or fallback slug */
  repoName: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  liveDemo?: string;
  caseStudy?: string;
  architecture?: string;
  previewVideo?: string;
  previewImage?: string;
  /** Curated bullets — from overrides only (not GitHub) */
  engineeringHighlights?: string[];
  color: string;
};
