import { motion } from "framer-motion";

const experiences = [
  {
    role: "ICT Intern",
    company: "Ndabase Printing Solutions",
    duration: "Oct 2025 - Feb 2026",
    points: [
      "Developed backend modules for an enterprise device lifecycle management system using ASP.NET Core and Entity Framework Core.",
      "Designed workflows for device tracking, allocation, and dispatch operations.",
      "Optimized SQL Server queries and database structures to improve performance and data consistency.",
      "Translated operational requirements into scalable and maintainable system features.",
    ],
  },
  {
    role: "Programming Tutor",
    company: "Durban University of Technology",
    duration: "Apr 2025 - Oct 2025",
    points: [
      "Assisted first-year ICT students with programming fundamentals and problem-solving techniques.",
      "Delivered structured lessons on logic, control flow, and core coding principles.",
      "Improved understanding through practical examples and guided exercises.",
      "Strengthened technical communication by simplifying complex concepts for learners.",
    ],
  },
  {
    role: "Technical Support (Hackathon)",
    company: "KZN Tech Imbokodo Hackathon",
    duration: "Aug 2025",
    points: [
      "Provided real-time support in a high-pressure 48-hour development environment.",
      "Assisted teams with environment setup, debugging, and troubleshooting.",
      "Helped maintain stable development environments to keep workflows uninterrupted.",
      "Collaborated across multiple teams to resolve technical issues quickly.",
    ],
  },
  {
    role: "Software Development Projects",
    company: "Personal Work",
    duration: "Ongoing",
    points: [
      "Built practical systems including incident management platforms, SLA monitoring systems, and workflow tools.",
      "Designed backend architectures with role-based access, audit logging, and lifecycle management.",
      "Worked across FastAPI, Flask, ASP.NET Core, PostgreSQL, and React.",
      "Focused on solving operational problems through scalable, real-world system design.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-secondary-foreground/75 mt-4 max-w-2xl">
            Early-career roles and practical project work focused on building reliable systems, improving workflows, and solving real-world problems.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {experiences.map((item, i) => (
            <motion.article
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative rounded-2xl md:rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06] hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-primary/30 transition-all duration-300 group-hover:bg-primary/65"
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6 mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {item.role}
                  </h3>
                  <p className="text-muted-foreground">{item.company}</p>
                </div>
                <p className="text-sm text-secondary-foreground/80 md:text-right">{item.duration}</p>
              </div>

              <ul className="space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="text-sm md:text-base text-secondary-foreground/85 leading-relaxed pl-1">
                    - {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
