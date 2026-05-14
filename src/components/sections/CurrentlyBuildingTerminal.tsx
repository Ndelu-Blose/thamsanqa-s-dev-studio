import { motion } from "framer-motion";
import { CURRENTLY_BUILDING_LINES } from "@/content/currently-building";
import { SectionShell } from "@/components/sections/SectionShell";

const CurrentlyBuildingTerminal = () => {
  return (
    <SectionShell
      id="building"
      eyebrow="Focus"
      title={
        <>
          Currently <span className="text-primary">building</span>
        </>
      }
      subtitle="A compact snapshot of what I am leaning into right now — no roadmap theatre, just real work."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="section-surface-card max-w-3xl p-6 sm:p-8 font-mono text-sm sm:text-base"
      >
        <div className="flex items-baseline gap-2 text-muted-foreground border-b border-border pb-3 mb-4">
          <span className="text-primary select-none">&gt;</span>
          <span className="tracking-tight text-foreground/90">currently_building</span>
          <span className="animate-terminal-caret inline-block w-2 h-4 bg-primary/80 align-middle ml-0.5" aria-hidden />
        </div>
        <ul className="space-y-3 text-muted-foreground leading-relaxed">
          {CURRENTLY_BUILDING_LINES.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
              className="flex gap-3"
            >
              <span className="text-primary shrink-0 select-none">—</span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </SectionShell>
  );
};

export default CurrentlyBuildingTerminal;
