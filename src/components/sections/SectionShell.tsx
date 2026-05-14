import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  /** Small uppercase label above the title; omit for a cleaner header. */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** Extra classes on the outer `<section>` */
  sectionClassName?: string;
  showDotPattern?: boolean;
};

/**
 * Shared vertical rhythm and optional dot backdrop for homepage sections.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  sectionClassName,
  showDotPattern = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-28 relative scroll-mt-20 sm:scroll-mt-24", sectionClassName)}
    >
      {showDotPattern ? (
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.12] pointer-events-none" aria-hidden />
      ) : null}
      <div className={cn("container mx-auto px-4 sm:px-6 relative z-10", className)}>
        <div className="mb-10 sm:mb-14">
          {eyebrow ? (
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{eyebrow}</p>
          ) : null}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
          {subtitle ? <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
