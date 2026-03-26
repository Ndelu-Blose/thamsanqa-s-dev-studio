import { motion } from "framer-motion";
import { Code2, Target, Zap, User } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Builder", desc: "Focused on writing clean, functional code that solves real problems." },
  { icon: Target, title: "Goal-Driven", desc: "Committed to continuous improvement and professional growth." },
  { icon: Zap, title: "Fast Learner", desc: "Quickly adapts to new tools, frameworks, and development workflows." },
];

const About = () => {
  return (
    <section id="about" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Background</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile visual + text */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-6 items-start"
            >
              {/* Profile image placeholder */}
              <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-2xl bg-card border border-border items-center justify-center">
                <User className="w-8 h-8 text-primary/60" />
              </div>
              <div>
                <p className="text-foreground/85 text-lg leading-relaxed mb-6">
                  I am an ICT Applications Development graduate with a strong interest in software engineering, web development, and building systems that solve real problems. My journey is driven by curiosity, consistency, and the desire to keep improving through practical work.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I am currently focused on strengthening my skills through hands-on projects, sharpening my development workflow, and growing into a well-rounded software engineer capable of building useful and impactful solutions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Strength cards */}
          <div className="lg:col-span-2 grid gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-500"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
