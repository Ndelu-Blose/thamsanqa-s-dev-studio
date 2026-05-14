import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { ENGINEERING_NOTES } from "@/content/engineering-notes";

const EngineeringNotes = () => {
  return (
    <SectionShell
      id="engineering-notes"
      eyebrow="Notes"
      title={
        <>
          Engineering <span className="text-primary">notes</span>
        </>
      }
      subtitle="Short memos I stand behind — curated like the rest of the site, not auto-generated."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ENGINEERING_NOTES.map((note, i) => (
          <motion.article
            key={note.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="section-surface-card p-5 sm:p-6 flex flex-col gap-3"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-primary/90 w-fit rounded-md border border-primary/25 bg-primary/5 px-2 py-1">
              {note.tag}
            </span>
            <h3 className="text-lg font-semibold text-foreground leading-snug">{note.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{note.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
};

export default EngineeringNotes;
