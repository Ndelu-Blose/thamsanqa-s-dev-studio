export type SiteNavItem = {
  label: string;
  href: string;
  /** Optional tooltip when the label is shortened (e.g. “Glance”). */
  title?: string;
};

/** Main header — order follows home scroll, then the Engineering hub, then Contact. */
export const NAV_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Building", href: "/#building", title: "Currently building — focus areas" },
  { label: "Glance", href: "/#status", title: "At a glance — quick snapshot before contact" },
  { label: "About", href: "/engineering#about" },
  { label: "Activity", href: "/engineering#activity" },
  { label: "Skills", href: "/engineering#skills" },
  { label: "Engineering", href: "/engineering" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Footer links only — no repeat of every header item.
 * About, activity, skills, and location live under Engineering.
 */
export const FOOTER_NAV_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Engineering", href: "/engineering" },
  { label: "Contact", href: "/#contact" },
];
