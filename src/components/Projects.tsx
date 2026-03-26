import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AutoEdge",
    description: "A practical system demonstrating problem-solving and structured application development.",
    tech: ["React", "Node.js", "REST API"],
    github: "https://github.com/Ndelu-Blose",
  },
  {
    title: "OLI",
    description: "A system focused on operational workflows, tracking, and real-world system architecture.",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Ndelu-Blose",
  },
  {
    title: "HawkEye",
    description: "A community-driven incident reporting and analytics platform designed for real-world impact.",
    tech: ["Flask", "SQLAlchemy", "Postgres"],
    github: "https://github.com/Ndelu-Blose",
  },
  {
    title: "FleetHub",
    description: "A fleet/logistics management concept system showcasing system thinking and scalability.",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/Ndelu-Blose",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl border border-border bg-card p-6 shadow-card hover:border-primary/40 hover:shadow-glow transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Button variant="heroOutline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
