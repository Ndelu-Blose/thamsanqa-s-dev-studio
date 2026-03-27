import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AutoEdge",
    description: "A practical system demonstrating problem-solving and structured application development with a modern frontend and robust backend architecture.",
    tech: ["React", "Node.js", "REST API"],
    github: "https://github.com/Ndelu-Blose",
    demo: "https://github.com/Ndelu-Blose",
    color: "174 62% 47%",
  },
  {
    title: "OLI",
    description: "A system focused on operational workflows, tracking, and real-world system architecture with containerized deployment.",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Ndelu-Blose/OLI.git",
    demo: "https://github.com/Ndelu-Blose/OLI.git",
    color: "190 70% 50%",
  },
  {
    title: "HawkEye",
    description: "A community-driven incident reporting and analytics platform designed for real-world impact and data-driven insights.",
    tech: ["Flask", "SQLAlchemy", "Postgres"],
    github: "https://github.com/Ndelu-Blose/hawkeye-incident-system.git",
    demo: "https://hawkeye-incident-system.onrender.com",
    color: "200 65% 50%",
  },
  {
    title: "FleetHub",
    description: "A fleet and logistics management concept system showcasing system thinking, scalability, and efficient resource tracking.",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/Ndelu-Blose/Fleet_Rental_System.git",
    demo: "https://fleet-rental-system.vercel.app/",
    livePreview: true,
    color: "180 60% 45%",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-28 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Project thumbnail */}
              <div className="h-44 sm:h-48 bg-secondary/50 relative overflow-hidden">
                {project.livePreview && project.demo ? (
                  <>
                    <iframe
                      title={`${project.title} live preview`}
                      src={project.demo}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur">
                      Live Preview
                    </span>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
                        <Folder className="w-10 h-10 text-primary/70" />
                      </div>
                    </div>
                  </>
                )}
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, hsl(${project.color} / 0.1), transparent)`,
                  }}
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/8 text-primary/90 border border-primary/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <Button variant="heroOutline" size="sm" className="w-full sm:w-auto justify-center" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto justify-center text-muted-foreground hover:text-primary" asChild>
                    <a href={project.demo ?? project.github} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
