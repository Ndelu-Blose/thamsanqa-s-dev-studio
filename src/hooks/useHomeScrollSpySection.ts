import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "experience", "projects", "building", "contact"] as const;

function normalizeHash(hash: string): string {
  if (!hash) return "";
  return hash.startsWith("#") ? hash.slice(1) : hash;
}

/**
 * Tracks which homepage section is most aligned with the viewport center.
 * Disabled when the URL hash targets a specific section (hash wins for nav).
 */
export function useHomeScrollSpySection(pathname: string, hash: string): string {
  const [sectionId, setSectionId] = useState<string>("home");

  useEffect(() => {
    if (pathname !== "/") {
      setSectionId("home");
      return;
    }

    const h = normalizeHash(hash).toLowerCase();
    const useSpy = h === "" || h === "home";
    if (!useSpy) {
      return;
    }

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    if (elements.length === 0) return;

    const pickStrongest = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((e) => e.isIntersecting && e.target.id);
      if (visible.length === 0) return;
      visible.sort((a, b) => {
        const ra = a.intersectionRatio ?? 0;
        const rb = b.intersectionRatio ?? 0;
        if (rb !== ra) return rb - ra;
        return SECTION_IDS.indexOf(a.target.id as (typeof SECTION_IDS)[number]) -
          SECTION_IDS.indexOf(b.target.id as (typeof SECTION_IDS)[number]);
      });
      setSectionId(visible[0].target.id);
    };

    const observer = new IntersectionObserver(pickStrongest, {
      root: null,
      rootMargin: "-38% 0px -32% 0px",
      threshold: [0, 0.08, 0.15, 0.25, 0.35, 0.5, 0.65, 0.8, 1],
    });

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname, hash]);

  return sectionId;
}
