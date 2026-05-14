import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";

type StatusRow = {
  label: string;
  value: string;
  state: "ok" | "idle";
};

const ROWS: StatusRow[] = [
  { label: "Portfolio API", value: "Reachable", state: "ok" },
  { label: "GitHub sync", value: "Pinned repos + activity", state: "ok" },
  { label: "Current focus", value: "Systems that ship calmly", state: "ok" },
  { label: "Availability", value: "Selective new engagements", state: "idle" },
  { label: "Learning track", value: "AI tooling without losing craft", state: "ok" },
];

const SystemStatus = () => {
  return (
    <SectionShell
      id="status"
      eyebrow="Signals"
      title={
        <>
          System <span className="text-primary">status</span>
        </>
      }
      subtitle="Lightweight health-style rows — static for now, readable at a glance."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="section-surface-card divide-y divide-border max-w-3xl overflow-hidden"
      >
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${row.state === "ok" ? "bg-primary" : "bg-muted-foreground/40"}`}
                aria-hidden
              />
              <span className="font-medium text-foreground truncate">{row.label}</span>
            </div>
            <span className="text-sm text-muted-foreground text-right shrink-0 max-w-[55%] sm:max-w-none">{row.value}</span>
          </div>
        ))}
      </motion.div>
    </SectionShell>
  );
};

export default SystemStatus;
