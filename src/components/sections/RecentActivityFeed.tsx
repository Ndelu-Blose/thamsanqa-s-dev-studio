import { motion } from "framer-motion";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Linkedin, Megaphone } from "lucide-react";
import type { ActivityFeedItem } from "@/types/activity-feed";

function sourceIcon(source: ActivityFeedItem["source"]) {
  switch (source) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "portfolio":
      return Megaphone;
    default: {
      const _exhaustive: never = source;
      return _exhaustive;
    }
  }
}

function sourceLabel(source: ActivityFeedItem["source"]) {
  switch (source) {
    case "github":
      return "GitHub";
    case "linkedin":
      return "LinkedIn";
    case "portfolio":
      return "Portfolio";
    default: {
      const _exhaustive: never = source;
      return _exhaustive;
    }
  }
}

const RecentActivityFeed = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["activity-feed"],
    queryFn: async (): Promise<ActivityFeedItem[]> => {
      const res = await fetch("/api/activity-feed");
      if (!res.ok) throw new Error("Failed to load activity");
      const json = (await res.json()) as { items: ActivityFeedItem[] };
      return json.items;
    },
    staleTime: 1000 * 60 * 30,
  });

  const items = isError ? [] : (data ?? []);

  return (
    <section id="activity" className="py-20 sm:py-24 lg:py-28 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Live</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Recent <span className="text-gradient">Activity</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
            GitHub events sync automatically. Add LinkedIn or portfolio highlights in{" "}
            <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">src/content/manual-updates.ts</code>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-card overflow-hidden"
        >
          {isPending ? (
            <ul className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="px-5 sm:px-7 py-4 sm:py-5">
                  <div className="h-4 w-3/4 max-w-md bg-muted animate-pulse rounded" />
                  <div className="mt-2 h-3 w-24 bg-muted/70 animate-pulse rounded" />
                </li>
              ))}
            </ul>
          ) : items.length === 0 ? (
            <div className="px-5 sm:px-7 py-10 text-center text-muted-foreground text-sm">
              No activity to show yet. Set{" "}
              <span className="font-mono text-foreground/90">GITHUB_USERNAME</span> and{" "}
              <span className="font-mono text-foreground/90">GITHUB_TOKEN</span> on Vercel, or add manual updates.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item, i) => {
                const Icon = sourceIcon(item.source);
                const when = safeFormatDistance(item.occurredAt);
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                    className="px-5 sm:px-7 py-4 sm:py-5 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
                      <div className="flex gap-3 min-w-0">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-primary">
                          <Icon className="h-4 w-4" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1">
                            {sourceLabel(item.source)}
                          </p>
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                            >
                              <span className="break-words">{item.title}</span>
                              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                            </a>
                          ) : (
                            <p className="font-medium text-foreground break-words">{item.title}</p>
                          )}
                          {item.description ? (
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed break-words">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <time
                        dateTime={item.occurredAt}
                        className="text-xs font-mono text-muted-foreground shrink-0 sm:text-right sm:pt-7"
                      >
                        {when}
                      </time>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
};

function safeFormatDistance(iso: string): string {
  try {
    return formatDistanceToNow(parseISO(iso), { addSuffix: true });
  } catch {
    return "";
  }
}

export default RecentActivityFeed;
