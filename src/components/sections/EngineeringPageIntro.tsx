import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandPaletteShortcutLabel } from "@/lib/useCommandPaletteShortcutLabel";

const STORAGE_KEY = "engineering-hub-tip-dismissed-v2";
const LEGACY_SESSION_KEY = "engineering-hub-tip-dismissed";

/**
 * Optional one-time tip: dismissible, stored in localStorage (not per tab).
 * Animation is non-blocking — Dismiss ends it immediately.
 */
const EngineeringPageIntro = () => {
  const prefersReducedMotion = useReducedMotion();
  const paletteHint = useCommandPaletteShortcutLabel();
  const dismissedRef = useRef(false);
  const [phase, setPhase] = useState<"pending" | "show" | "gone">("pending");

  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
      try {
        sessionStorage.removeItem(LEGACY_SESSION_KEY);
      } catch {
        /* ignore */
      }
    }
    setPhase("gone");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1" || sessionStorage.getItem(LEGACY_SESSION_KEY) === "1") {
      if (sessionStorage.getItem(LEGACY_SESSION_KEY) === "1") {
        localStorage.setItem(STORAGE_KEY, "1");
      }
      setPhase("gone");
      return;
    }
    setPhase("show");
  }, []);

  useEffect(() => {
    if (phase !== "show" || !prefersReducedMotion) return;
    const id = window.setTimeout(() => {
      if (dismissedRef.current) return;
      dismiss();
    }, 8000);
    return () => window.clearTimeout(id);
  }, [phase, prefersReducedMotion, dismiss]);

  if (phase === "pending" || phase === "gone") return null;

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 max-w-3xl mt-6 mb-2 sm:mt-7 sm:mb-3 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: [0, 1, 1, 1, 0.38, 1, 1, 1, 1, 0],
              y: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.35, ease: "easeOut" }
          : {
              duration: 10.5,
              times: [0, 0.05, 0.1, 0.2, 0.28, 0.36, 0.48, 0.62, 0.82, 1],
              ease: "easeInOut",
            }
      }
      onAnimationComplete={() => {
        if (prefersReducedMotion || dismissedRef.current) return;
        localStorage.setItem(STORAGE_KEY, "1");
        setPhase("gone");
      }}
    >
      <div className="relative rounded-xl border border-primary/25 bg-card px-4 py-4 pr-12 sm:px-5 sm:py-4 sm:pr-14 shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={dismiss}
          aria-label="Dismiss tip"
        >
          <X className="h-4 w-4" />
        </Button>
        <p className="text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed text-center sm:text-left">
          <span className="text-foreground/90 font-medium">Tip —</span> open{" "}
          <a className="text-primary font-medium hover:underline" href="/#projects">
            Projects
          </a>{" "}
          or{" "}
          <a className="text-primary font-medium hover:underline" href="/#contact">
            Contact
          </a>{" "}
          on the home page for repo cards and email. Press <span className="font-mono text-foreground/90">{paletteHint}</span>{" "}
          anytime for quick navigation.
        </p>
      </div>
    </motion.div>
  );
};

export default EngineeringPageIntro;
