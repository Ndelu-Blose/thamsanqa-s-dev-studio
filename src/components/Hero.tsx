import { motion } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">
                Open to Opportunities
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tight">
              Thamsanqa{" "}
              <span className="text-gradient">Ndelu</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-6">
              ICT Applications Development Graduate Growing into a Software Engineer Through Practical, Real-World Projects
            </p>

            <p className="text-secondary-foreground/60 max-w-xl mx-auto text-base leading-relaxed mb-14">
              Focused on continuous learning, practical development, and building real-world systems that solve meaningful problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-base px-10 h-13" asChild>
                <a href="#projects">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  View Projects
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-10 h-13" asChild>
                <a href="#contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-primary/60" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
