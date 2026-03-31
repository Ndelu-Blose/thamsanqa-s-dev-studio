import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-10">
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
            className="max-w-3xl rounded-2xl border border-white/10 bg-background/55 backdrop-blur-sm p-4 sm:p-0 sm:border-0 sm:bg-transparent sm:backdrop-blur-0"
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

            <h1 className="text-[1.95rem] sm:text-6xl md:text-7xl font-black leading-[1.03] tracking-tight mb-4 sm:mb-6">
              Thamsanqa{" "}
              <span className="text-gradient">Ndelu</span>
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
              Based in Durban, South Africa • Open to Opportunities
            </p>

            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 max-w-2xl">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">What I&apos;m looking for</h3>
              <ul className="space-y-2 text-sm sm:text-[0.95rem] text-secondary-foreground/85">
                <li>Graduate software engineering roles</li>
                <li>Backend development internships</li>
                <li>Teams building practical systems with real operational impact</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button variant="hero" size="lg" className="text-base px-11 h-12 sm:h-13 w-full sm:w-auto" asChild>
                <a href="#projects">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  View Projects
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-11 h-12 sm:h-13 w-full sm:w-auto" asChild>
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </div>

            <div className="hidden lg:flex flex-wrap items-center gap-5 mt-8 text-sm">
              <a
                href="https://github.com/Ndelu-Blose"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/thamsanqa-ndelu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <div className="flex lg:hidden items-center justify-between gap-3 text-sm mt-1">
            <a
              href="https://github.com/Ndelu-Blose"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/thamsanqa-ndelu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px]"
          >
            <div className="aspect-[4/5] w-full rounded-2xl border border-white/10 overflow-hidden bg-white/5">
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
