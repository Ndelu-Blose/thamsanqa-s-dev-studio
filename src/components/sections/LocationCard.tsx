import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";

const LocationCard = () => {
  return (
    <SectionShell
      id="location"
      eyebrow="Where"
      title={
        <>
          Based in <span className="text-primary">Durban</span>
        </>
      }
      subtitle="South Africa · SAST (UTC+2). Remote-first collaboration across time zones when it makes sense."
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="section-surface-card max-w-xl overflow-hidden"
      >
        <div className="relative aspect-[16/10] sm:aspect-[2/1] bg-surface">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden />
          <div className="absolute inset-0 bg-dot-pattern opacity-25" aria-hidden />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-elevated shadow-card">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <p className="text-sm font-medium text-foreground px-4 text-center">Durban, KwaZulu-Natal</p>
            <p className="text-xs text-muted-foreground">No map SDK — just a calm locator motif.</p>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4 sm:px-6 bg-card/80">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Happy to align on overlap hours for reviews, pairing, and incident response — clarity beats hero hours.
          </p>
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default LocationCard;
