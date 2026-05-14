import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";

/** Honest credibility lines — qualitative, no invented KPIs. */
const METRICS = [
  { title: "Full-stack delivery", body: "Web, mobile, and API layers shipped as one coherent product surface." },
  { title: "Relational data in anger", body: "Postgres and SQL Server schemas tuned for reporting, not just CRUD demos." },
  { title: "Notifications that respect users", body: "Firebase-backed push with conservative batching and clear intent." },
  { title: "AI as an accelerator", body: "Gemini and similar tools wired where they remove repetition, not ownership." },
] as const;

const ProjectMetrics = () => {
  return (
    <SectionShell
      id="metrics"
      eyebrow="Credibility"
      title={
        <>
          Project <span className="text-primary">metrics</span>
        </>
      }
      subtitle="Statements I can defend — no vanity dashboards or synthetic growth charts."
    >
      <div className="grid gap-5 sm:grid-cols-2 max-w-4xl">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="section-surface-card p-5 sm:p-6"
          >
            <h3 className="text-base font-semibold text-foreground">{m.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
};

export default ProjectMetrics;
