import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, BookOpen } from "lucide-react";
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiFlask,
  SiNodedotjs,
  SiPostgresql,
  SiSqlalchemy,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiGooglecloud,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FiSettings, FiLayers } from "react-icons/fi";

const SKILL_ICONS: Record<string, { icon: ElementType; color: string }> = {
  React: { icon: SiReact, color: "#61DAFB" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#1572B6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  Flask: { icon: SiFlask, color: "#ffffff" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  SQLAlchemy: { icon: SiSqlalchemy, color: "#CC0000" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#ffffff" },
  "VS Code": { icon: VscCode, color: "#007ACC" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  DevOps: { icon: FiSettings, color: "#94A3B8" },
  "System Design": { icon: FiLayers, color: "#94A3B8" },
  "CI/CD": { icon: FiSettings, color: "#94A3B8" },
  Cloud: { icon: SiGooglecloud, color: "#4285F4" },
};

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

interface SkillPillProps {
  skill: string;
}

const SkillPill = ({ skill }: SkillPillProps) => {
  const meta = SKILL_ICONS[skill];
  const Icon = meta?.icon;

  return (
    <span className="group/pill flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-default">
      {Icon && (
        <Icon
          size={15}
          style={{ color: meta.color, flexShrink: 0 }}
          className="opacity-[0.85] group-hover/pill:opacity-100 transition-opacity duration-200"
        />
      )}
      {skill}
    </span>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-28 scroll-mt-nav sm:scroll-mt-nav-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-glow transition-all duration-500"
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
                  <SkillPill key={skill} skill={skill} />
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
