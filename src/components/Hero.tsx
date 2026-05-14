import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-0 lg:min-h-screen flex items-start lg:items-center relative overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-12 lg:pb-10"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Subtle ambient accent */}
      <div className="absolute top-28 left-1/3 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-8 sm:gap-10 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl lg:max-w-none"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/30 bg-primary/10 mb-5 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline text-primary font-mono text-xs tracking-widest uppercase">
                Open to Opportunities
              </span>
              <span className="sm:hidden text-primary font-mono text-[11px] tracking-widest uppercase">
                Open to Work
              </span>
            </motion.div>

            <h1 className="text-[1.95rem] sm:text-6xl md:text-7xl font-black leading-[1.03] tracking-tight mb-4 sm:mb-6 text-foreground">
              Thamsanqa <span className="text-primary">Ndelu</span>
            </h1>

            <p className="text-base sm:text-2xl font-semibold text-foreground leading-snug">
              ICT Applications Development Graduate
            </p>
            <p className="text-[0.95rem] sm:text-xl text-secondary-foreground/75 leading-relaxed mt-1">
              Growing into a Software Engineer through practical, real-world projects.
            </p>

            <p className="text-secondary-foreground/70 max-w-[34ch] sm:max-w-xl text-[0.86rem] sm:text-base leading-relaxed mt-4 sm:mt-6">
              Focused on continuous learning, practical development, and building real-world systems that solve meaningful problems.
            </p>

            <p className="text-sm text-secondary-foreground/80 mt-4">
              Durban, South Africa · Remote-friendly
            </p>

            <div className="mt-5 sm:mt-6 max-w-2xl border-l-2 border-primary/30 pl-4 sm:pl-5 py-0.5">
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                What I&apos;m looking for
              </p>
              <ul className="space-y-1.5 text-sm sm:text-[0.95rem] text-secondary-foreground/90 leading-snug">
                <li>Graduate software engineering roles</li>
                <li>Backend development internships</li>
                <li>Teams building practical systems with real operational impact</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button variant="hero" size="lg" className="text-base px-11 h-12 sm:h-13 w-full sm:w-auto" asChild>
                <a href="/#projects">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  View Projects
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-11 h-12 sm:h-13 w-full sm:w-auto" asChild>
                <a href="/#contact">
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[460px]"
          >
            <div className="aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl sm:rounded-2xl border border-border/50 overflow-hidden bg-muted/20">
              <img
                src="/profile.png"
                alt="Portrait of Thamsanqa Ndelu"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
