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
 * Desktop header only — short row so the bar stays calm. All sections remain
 * reachable from the mobile drawer, footer, and Command Palette (Ctrl/Cmd+K).
 */
export const DESKTOP_NAV_BAR_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
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

/** Mobile drawer: two groups so links are easier to scan than one long list. */
export function getMobileNavSections(): { heading: string; items: SiteNavItem[] }[] {
  const home: SiteNavItem[] = [];
  const engineering: SiteNavItem[] = [];
  for (const item of NAV_ITEMS) {
    if (item.href.startsWith("/#")) {
      home.push(item);
    } else if (item.href.startsWith("/engineering")) {
      engineering.push(item);
    }
  }
  return [
    { heading: "Portfolio home", items: home },
    { heading: "Engineering hub", items: engineering },
  ];
}
