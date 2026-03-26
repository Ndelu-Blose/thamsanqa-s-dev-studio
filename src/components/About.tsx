import { motion } from "framer-motion";
import { Code2, Target, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Builder", desc: "Focused on writing clean, functional code that solves real problems." },
  { icon: Target, title: "Goal-Driven", desc: "Committed to continuous improvement and professional growth." },
  { icon: Zap, title: "Fast Learner", desc: "Quickly adapts to new tools, frameworks, and development workflows." },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-secondary-foreground/80 leading-relaxed mb-6">
              I am an ICT Applications Development graduate with a strong interest in software engineering, web development, and building systems that solve real problems. My journey is driven by curiosity, consistency, and the desire to keep improving through practical work.
            </p>
            <p className="text-secondary-foreground/80 leading-relaxed">
              I am currently focused on strengthening my skills through hands-on projects, sharpening my development workflow, and growing into a well-rounded software engineer capable of building useful and impactful solutions.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
