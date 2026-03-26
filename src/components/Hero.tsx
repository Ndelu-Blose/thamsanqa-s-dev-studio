import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">
            Software Developer
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
            Thamsanqa{" "}
            <span className="text-gradient">Ndelu</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-4">
            ICT Applications Development Graduate Growing into a Software Engineer Through Practical, Real-World Projects
          </p>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            I'm an aspiring software developer focused on growing into a strong software engineer through continuous learning, practical development, and building real-world systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                <ArrowDown className="w-4 h-4 mr-2" />
                View Projects
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
