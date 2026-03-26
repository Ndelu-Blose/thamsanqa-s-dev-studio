import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, BookOpen } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Python", "FastAPI", "Flask", "Node.js"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "SQLAlchemy"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Docker", "Git", "GitHub", "VS Code", "Linux"],
  },
  {
    title: "Currently Learning",
    icon: BookOpen,
    skills: ["DevOps", "System Design", "CI/CD", "Cloud"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-glow transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <cat.icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/30 hover:text-primary transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
