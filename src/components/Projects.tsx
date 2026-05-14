import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileText, Github, GitBranch, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fallbackPortfolioProjects } from "@/content/fallback-projects";
import type { PortfolioProject } from "@/types/portfolio-project";
import { isTrustedOgImageUrl } from "@/server/repo-media";

type ProjectAction = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function projectInitials(title: string): string {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  const t = parts[0] ?? "?";
  return t.length >= 2 ? t.slice(0, 2).toUpperCase() : `${t.charAt(0).toUpperCase()}·`;
}

function ProjectPreviewPlaceholder({ title, tech, hueCss }: { title: string; tech: string[]; hueCss: string }) {
  const initials = projectInitials(title);
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center border-b border-border/40"
      style={{
        background: `linear-gradient(135deg, hsl(${hueCss} / 0.22) 0%, hsl(var(--secondary) / 0.92) 45%, hsl(var(--background)) 100%)`,
      }}
    >
      <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-foreground">{initials}</span>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5 px-5 max-w-[92%]">
        {tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground border border-border/70 rounded px-2 py-0.5 bg-background/50"
          >
            {t}
          </span>
        ))}
      </div>
      <span className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/75">Preview</span>
    </div>
  );
}

const buildMailTo = (projectTitle: string, topic: "details" | "architecture") => {
  const subject =
    topic === "details"
      ? `Project details request: ${projectTitle}`
      : `Architecture write-up request: ${projectTitle}`;
  const body =
    topic === "details"
      ? `Hi Thamsanqa,%0D%0A%0D%0AI would like more details about ${projectTitle}.%0D%0A%0D%0AThanks.`
      : `Hi Thamsanqa,%0D%0A%0D%0APlease share the architecture write-up for ${projectTitle}.%0D%0A%0D%0AThanks.`;
  return `mailto:thamsanqandelu0210@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
};

const getProjectActions = (project: PortfolioProject): ProjectAction[] => {
  const baseActions: ProjectAction[] = [];

  if (project.liveDemo) {
    baseActions.push({ label: "Live Demo", href: project.liveDemo, icon: ExternalLink });
  }
  if (project.caseStudy) {
    baseActions.push({ label: "Case Study", href: project.caseStudy, icon: FileText });
  }
  if (project.architecture) {
    baseActions.push({ label: "Architecture", href: project.architecture, icon: GitBranch });
  }
  if (project.github) {
    baseActions.push({ label: "GitHub", href: project.github, icon: Github });
  }

  const fallbackActions: ProjectAction[] = [
    {
      label: "Details on request",
      href: buildMailTo(project.title, "details"),
      icon: FileText,
    },
    {
      label: "Architecture write-up",
      href: buildMailTo(project.title, "architecture"),
      icon: GitBranch,
    },
  ];

  for (const fallbackAction of fallbackActions) {
    if (baseActions.length >= 2) break;
    baseActions.push(fallbackAction);
  }

  return baseActions.slice(0, 4);
};

const Projects = () => {
  const [brokenPreview, setBrokenPreview] = useState<Record<string, boolean>>({});

  const { data, isPending, isError } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async (): Promise<PortfolioProject[]> => {
      const res = await fetch("/api/portfolio-projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const json = (await res.json()) as { projects: PortfolioProject[] };
      return json.projects;
    },
    staleTime: 1000 * 60 * 60,
  });

  const projects: PortfolioProject[] =
    isError || !data || data.length === 0 ? fallbackPortfolioProjects : data;

  const openDemo = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-28 relative scroll-mt-nav sm:scroll-mt-nav-sm">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
            Pinned GitHub repositories sync automatically. Set each repo&apos;s <strong className="text-foreground/90">Website</strong> on
            GitHub for live demo links, and add screenshots or video in your local content overrides when you want richer cards.
          </p>
        </motion.div>

        {isPending ? (
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-card animate-pulse"
              >
                <div className="h-44 sm:h-48 bg-muted" />
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="h-6 w-8/12 max-w-[16rem] bg-muted rounded" />
                  <div className="h-4 w-full bg-muted/80 rounded" />
                  <div className="h-4 w-10/12 max-w-[20rem] bg-muted/80 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            {projects.map((project, i) => {
              const cardKey = project.repoName;
              const rawImage = project.previewImage;
              const trustedImage =
                typeof rawImage === "string" && rawImage.trim().length > 0 && isTrustedOgImageUrl(rawImage)
                  ? rawImage
                  : undefined;
              const showImage = Boolean(trustedImage) && !brokenPreview[cardKey];
              const hasVideo = Boolean(project.previewVideo);
              const videoPoster = showImage && trustedImage ? trustedImage : undefined;
              return (
                <motion.div
                  key={cardKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative section-surface-card overflow-hidden duration-500 ${
                    project.liveDemo ? "cursor-pointer" : ""
                  }`}
                  onClick={() => openDemo(project.liveDemo)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openDemo(project.liveDemo);
                    }
                  }}
                  role={project.liveDemo ? "button" : undefined}
                  tabIndex={project.liveDemo ? 0 : -1}
                  aria-label={project.liveDemo ? `Open ${project.title} live demo` : undefined}
                >
                  <div className="h-44 sm:h-48 bg-secondary/50 relative overflow-hidden">
                    {hasVideo ? (
                      <>
                        {(!showImage || !trustedImage) && (
                          <div className="absolute inset-0 z-0">
                            <ProjectPreviewPlaceholder title={project.title} tech={project.tech} hueCss={project.color} />
                          </div>
                        )}
                        <video
                          src={project.previewVideo}
                          poster={videoPoster}
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="auto"
                          className="absolute inset-0 z-[1] h-full w-full object-cover pointer-events-none"
                          aria-label={`${project.title} preview video`}
                        />
                      </>
                    ) : showImage ? (
                      <img
                        src={trustedImage}
                        alt={`${project.title} preview`}
                        onError={() => setBrokenPreview((m) => ({ ...m, [cardKey]: true }))}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <ProjectPreviewPlaceholder title={project.title} tech={project.tech} hueCss={project.color} />
                    )}
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, hsl(${project.color} / 0.1), transparent)`,
                      }}
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" />
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                    {project.engineeringHighlights && project.engineeringHighlights.length > 0 ? (
                      <div className="mb-4 rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
                          Key engineering decisions
                        </p>
                        <ul className="space-y-1 text-xs text-muted-foreground leading-snug list-disc pl-3.5">
                          {project.engineeringHighlights.map((line, idx) => (
                            <li key={`${cardKey}-eng-${idx}`}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/8 text-primary/90 border border-primary/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      {getProjectActions(project).map((action) => {
                        const Icon = action.icon;
                        const isMailTo = action.href.startsWith("mailto:");
                        return (
                          <Button
                            key={`${cardKey}-${action.label}`}
                            variant="heroOutline"
                            size="sm"
                            className="w-full sm:w-auto justify-center min-h-11 sm:min-h-9 py-2.5 sm:py-0"
                            asChild
                          >
                            <a
                              href={action.href}
                              target={isMailTo ? undefined : "_blank"}
                              rel={isMailTo ? undefined : "noopener noreferrer"}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {action.label}
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
