import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";

const NODES = [
  { label: "Expo / React UI", short: "Clients" },
  { label: "FastAPI / ASP.NET", short: "APIs" },
  { label: "Postgres / SQL Server", short: "Data" },
  { label: "Firebase", short: "Push" },
  { label: "Gemini / AI", short: "Assist" },
] as const;

const ArchitectureShowcase = () => {
  return (
    <SectionShell
      id="architecture"
      eyebrow="Stack"
      title={
        <>
          Architecture <span className="text-primary">sketch</span>
        </>
      }
      subtitle="How pieces tend to line up on projects — bounded height, no poster diagram."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="section-surface-card max-w-5xl p-6 sm:p-8"
      >
        {/* Mobile: vertical */}
        <div className="flex flex-col gap-3 md:hidden">
          {NODES.map((node, i) => (
            <div key={node.label}>
              <div className="rounded-lg border border-border bg-surface px-4 py-3 text-center">
                <p className="text-xs font-mono text-primary/90">{node.short}</p>
                <p className="text-sm font-medium text-foreground mt-1">{node.label}</p>
              </div>
              {i < NODES.length - 1 ? (
                <div className="flex justify-center py-1" aria-hidden>
                  <div className="h-6 w-px bg-border" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* md+: horizontal with connectors */}
        <div className="hidden md:flex items-center gap-0 overflow-x-auto pb-2 max-w-full [scrollbar-width:thin]">
          {NODES.map((node, i) => (
            <div key={node.label} className="flex items-center shrink-0">
              <div className="rounded-lg border border-border bg-surface px-4 py-3 min-w-[132px] text-center">
                <p className="text-xs font-mono text-primary/90">{node.short}</p>
                <p className="text-sm font-medium text-foreground mt-1 leading-snug">{node.label}</p>
              </div>
              {i < NODES.length - 1 ? (
                <div className="flex items-center px-1 text-muted-foreground/40" aria-hidden>
                  <div className="h-px w-5 bg-border" />
                  <span className="text-[10px] px-0.5">→</span>
                  <div className="h-px w-5 bg-border" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default ArchitectureShowcase;
