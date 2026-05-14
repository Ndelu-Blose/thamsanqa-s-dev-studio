import type { PortfolioProject } from "../types/portfolio-project.js";
import { SITE_GITHUB_URL, siteGithubRepoUrl } from "./site-links.js";

/** Used when GitHub env is missing or the sync API fails */
export const fallbackPortfolioProjects: PortfolioProject[] = [
  {
    repoName: "autoedge",
    title: "AutoEdge",
    description:
      "A practical system demonstrating problem-solving and structured application development with a modern frontend and robust backend architecture.",
    tech: ["React", "Node.js", "REST API"],
    github: SITE_GITHUB_URL,
    previewVideo: "/autoedge-preview.mp4",
    previewImage: "/autoedge-thumb.png",
    color: "174 62% 47%",
  },
  {
    repoName: "oli",
    title: "OLI",
    description:
      "A system focused on operational workflows, tracking, and real-world system architecture with containerized deployment.",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
    github: siteGithubRepoUrl("OLI", { gitSuffix: true }),
    previewVideo: "/oli-preview.mp4",
    previewImage: "/oli-thumb.png",
    color: "190 70% 50%",
  },
  {
    repoName: "hawkeye-incident-system",
    title: "HawkEye",
    description:
      "A community-driven incident reporting and analytics platform designed for real-world impact and data-driven insights.",
    tech: ["Flask", "SQLAlchemy", "Postgres"],
    github: siteGithubRepoUrl("hawkeye-incident-system", { gitSuffix: true }),
    liveDemo: "https://hawkeye-incident-system.onrender.com",
    previewVideo: "/hawkeye-preview.mp4",
    previewImage: "/hawkeye-thumb.png",
    color: "200 65% 50%",
  },
  {
    repoName: "fleet-rental-system",
    title: "FleetHub",
    description:
      "A fleet and logistics management concept system showcasing system thinking, scalability, and efficient resource tracking.",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: siteGithubRepoUrl("Fleet_Rental_System", { gitSuffix: true }),
    liveDemo: "https://fleet-rental-system.vercel.app/",
    previewVideo: "/fleethub-preview.mp4",
    previewImage: "/fleethub-thumb.png",
    color: "180 60% 45%",
  },
];
