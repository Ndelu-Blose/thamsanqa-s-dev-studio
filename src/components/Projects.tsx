import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileText, Github, GitBranch, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fallbackPortfolioProjects } from "@/content/fallback-projects";
import type { PortfolioProject } from "@/types/portfolio-project";

type ProjectAction = {
  label: string;
  href: string;
  icon: LucideIcon;
};

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
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const hoverTimers = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHoverPreview(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const handleEnter = (key: string, previewVideo?: string) => {
    if (!canHoverPreview || !previewVideo) return;
    if (hoverTimers.current[key]) {
      clearTimeout(hoverTimers.current[key] as ReturnType<typeof setTimeout>);
    }
    hoverTimers.current[key] = setTimeout(async () => {
      const video = videoRefs.current[key];
      if (!video) return;
      video.currentTime = 0;
      try {
        await video.play();
        setActivePreview(key);
      } catch {
        setActivePreview((current) => (current === key ? null : current));
      }
    }, 120);
  };

  const handleLeave = (key: string, previewVideo?: string) => {
    if (!canHoverPreview || !previewVideo) return;
    if (hoverTimers.current[key]) {
      clearTimeout(hoverTimers.current[key] as ReturnType<typeof setTimeout>);
      hoverTimers.current[key] = null;
    }
    setActivePreview((current) => (current === key ? null : current));
    const video = videoRefs.current[key];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const openDemo = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-28 relative">
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
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
            Pinned GitHub repositories sync here; enrich each repo in{" "}
            <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">src/content/project-overrides.ts</code>.
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
                  <div className="h-6 w-2/3 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted/80 rounded" />
                  <div className="h-4 w-5/6 bg-muted/80 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            {projects.map((project, i) => {
              const cardKey = project.repoName;
              return (
                <motion.div
                  key={cardKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 ${
                    project.liveDemo ? "cursor-pointer" : ""
                  }`}
                  onMouseEnter={() => handleEnter(cardKey, project.previewVideo)}
                  onMouseLeave={() => handleLeave(cardKey, project.previewVideo)}
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
                    <img
                      src={project.previewImage ?? "/placeholder.svg"}
                      alt={`${project.title} preview`}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-in-out ${
                        canHoverPreview && activePreview === cardKey
                          ? "opacity-60 scale-105"
                          : "opacity-100 scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    {project.previewVideo && (
                      <video
                        ref={(el) => {
                          videoRefs.current[cardKey] = el;
                        }}
                        src={project.previewVideo}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-in-out ${
                          canHoverPreview && activePreview === cardKey
                            ? "opacity-100 scale-105"
                            : "opacity-0 scale-100"
                        }`}
                      />
                    )}
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ease-in-out ${
                        canHoverPreview && activePreview === cardKey ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
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

                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>

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
                            className="w-full sm:w-auto justify-center"
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
