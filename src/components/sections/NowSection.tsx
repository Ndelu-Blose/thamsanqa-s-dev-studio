import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";

const NOW_ITEMS = [
  "Shipping portfolio polish with keyboard-first navigation and calmer motion.",
  "Keeping production APIs boring: predictable errors, explicit contracts, and tests where they earn their keep.",
  "Reading and building in public where it helps the next person — not for vanity metrics.",
] as const;

const NowSection = () => {
  return (
    <SectionShell
      id="now"
      eyebrow="Today"
      title={
        <>
          Right <span className="text-primary">now</span>
        </>
      }
      subtitle="Short list of what I would tell a colleague over coffee this week."
    >
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed list-disc pl-5 sm:pl-6 marker:text-primary"
      >
        {NOW_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </motion.ul>
    </SectionShell>
  );
};

export default NowSection;
