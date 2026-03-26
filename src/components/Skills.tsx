import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Flask", "Node.js"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "SQLAlchemy"],
  },
  {
    title: "Tools",
    skills: ["Docker", "Git", "GitHub", "VS Code", "Linux"],
  },
  {
    title: "Currently Learning",
    skills: ["DevOps", "System Design", "CI/CD", "Cloud"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="font-semibold text-primary font-mono text-sm uppercase tracking-wider mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
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
