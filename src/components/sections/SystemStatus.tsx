import { motion } from "framer-motion";

type StatusRow = {
  label: string;
  value: string;
  state: "ok" | "idle";
};

const ROWS: StatusRow[] = [
  { label: "Portfolio API", value: "Reachable", state: "ok" },
  { label: "GitHub sync", value: "Pinned repos + activity", state: "ok" },
  { label: "Current focus", value: "Systems that ship calmly", state: "ok" },
  { label: "Availability", value: "Selective new engagements", state: "idle" },
  { label: "Learning track", value: "AI tooling without losing craft", state: "ok" },
];

const SystemStatus = () => {
  return (
    <section id="status" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            At a <span className="text-primary">glance</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed">
            Quick snapshot — updated manually when your situation changes.
          </p>
          <dl className="mt-6 sm:mt-8 divide-y divide-border/60">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-0.5 py-3.5 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <dt className="flex items-center gap-2.5 min-w-0 text-[0.9375rem] sm:text-sm font-medium text-foreground">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.state === "ok" ? "bg-primary" : "bg-muted-foreground/45"}`}
                    aria-hidden
                  />
                  <span className="leading-snug">{row.label}</span>
                </dt>
                <dd className="text-muted-foreground text-sm sm:text-right sm:max-w-[58%] leading-snug pl-3.5 sm:pl-0">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemStatus;
