import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "engineering-hub-tip-dismissed";

/**
 * Short orientation that fades in, briefly dims to catch attention, then fades out
 * so the rest of the page reads cleanly. Shown once per browser tab session.
 */
const EngineeringPageIntro = () => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"pending" | "show" | "gone">("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setPhase("gone");
      return;
    }
    setPhase("show");
  }, []);

  useEffect(() => {
    if (phase !== "show" || !prefersReducedMotion) return;
    const id = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("gone");
    }, 3200);
    return () => window.clearTimeout(id);
  }, [phase, prefersReducedMotion]);

  if (phase === "pending" || phase === "gone") return null;

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 max-w-3xl pb-6 sm:pb-8"
      initial={{ opacity: 0, y: 14 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: [0, 1, 1, 0.35, 1, 1, 0],
              y: [14, 0, 0, 0, 0, 0, -8],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.35, ease: "easeOut" }
          : {
              duration: 6.4,
              times: [0, 0.06, 0.17, 0.27, 0.38, 0.7, 1],
              ease: "easeInOut",
            }
      }
      onAnimationComplete={() => {
        if (prefersReducedMotion) return;
        sessionStorage.setItem(STORAGE_KEY, "1");
        setPhase("gone");
      }}
    >
      <div className="rounded-xl border border-border/60 bg-muted/15 px-4 py-4 sm:px-5 sm:py-4">
        <p className="text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed text-center sm:text-left">
          <span className="text-foreground/90 font-medium">This hub</span> is for story, activity, skills, and notes.
          Featured repos and the main contact block stay on the{" "}
          <a className="text-primary font-medium hover:underline" href="/">
            home page
          </a>{" "}
          under{" "}
          <a className="text-primary font-medium hover:underline" href="/#projects">
            Projects
          </a>{" "}
          and{" "}
          <a className="text-primary font-medium hover:underline" href="/#contact">
            Contact
          </a>
          .
        </p>
      </div>
    </motion.div>
  );
};

export default EngineeringPageIntro;
