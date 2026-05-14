import { motion } from "framer-motion";
import { CURRENTLY_BUILDING_LINES } from "@/content/currently-building";

const CurrentlyBuildingTerminal = () => {
  return (
    <section
      id="building"
      className="scroll-mt-20 sm:scroll-mt-24 border-t border-border/50 bg-background py-14 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Currently <span className="text-primary">building</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            What I am focused on right now — short, concrete, and easy to update.
          </p>
          <ul className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4 text-sm sm:text-base text-foreground/90 leading-relaxed border-l-2 border-primary/35 pl-4 sm:pl-5">
            {CURRENTLY_BUILDING_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyBuildingTerminal;
