import type { PortfolioProject } from "../types/portfolio-project.js";

/**
 * Keyed by exact GitHub repository name (case-sensitive).
 * Optional fields override or enrich data from pinned repos.
 */
export type ProjectOverride = Partial<
  Pick<
    PortfolioProject,
    | "title"
    | "description"
    | "tech"
    | "github"
    | "liveDemo"
    | "caseStudy"
    | "architecture"
    | "previewVideo"
    | "previewImage"
    | "engineeringHighlights"
    | "color"
  >
>;

export const projectOverrides: Record<string, ProjectOverride> = {
  OLI: {
    title: "OLI",
    description:
      "A system focused on operational workflows, tracking, and real-world system architecture with containerized deployment.",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
    previewVideo: "/oli-preview.mp4",
    previewImage: "/oli-thumb.png",
    color: "190 70% 50%",
  },
  "hawkeye-incident-system": {
    title: "HawkEye",
    description:
      "A community-driven incident reporting and analytics platform designed for real-world impact and data-driven insights.",
    tech: ["Flask", "SQLAlchemy", "Postgres"],
    liveDemo: "https://hawkeye-incident-system.onrender.com",
    previewVideo: "/hawkeye-preview.mp4",
    previewImage: "/hawkeye-thumb.png",
    color: "200 65% 50%",
  },
  Fleet_Rental_System: {
    title: "FleetHub",
    description:
      "A fleet and logistics management concept system showcasing system thinking, scalability, and efficient resource tracking.",
    tech: ["React", "Node.js", "PostgreSQL"],
    liveDemo: "https://fleet-rental-system.vercel.app/",
    previewVideo: "/fleethub-preview.mp4",
    previewImage: "/fleethub-thumb.png",
    color: "180 60% 45%",
    engineeringHighlights: [
      "Separated booking flows from admin reporting to keep UX focused",
      "PostgreSQL for relational fleet state with clear migration path",
    ],
  },
};
