import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, FileDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCommandPaletteShortcutLabel } from "@/lib/useCommandPaletteShortcutLabel";
import { SITE_GITHUB_URL } from "@/content/site-links";
import { DESKTOP_NAV_BAR_ITEMS, getMobileNavSections } from "@/content/site-nav";
import { useHomeScrollSpySection } from "@/hooks/useHomeScrollSpySection";

function normalizeHash(hash: string): string {
  if (!hash) return "";
  return hash.startsWith("#") ? hash.slice(1) : hash;
}

function getActiveDesktopNavHref(pathname: string, hash: string, homeSpySectionId: string): string | null {
  const h = normalizeHash(hash).toLowerCase();
  if (pathname === "/cv") return null;
  if (pathname === "/engineering") return "/engineering";
  if (pathname !== "/") return null;
  if (h === "projects") return "/#projects";
  if (h === "contact") return "/#contact";
  if (h === "home") return "/#home";
  if (h) return "/#home";
  if (homeSpySectionId === "projects") return "/#projects";
  if (homeSpySectionId === "contact") return "/#contact";
  return "/#home";
}

function isMobileNavLinkActive(href: string, pathname: string, hash: string, homeSpySectionId: string): boolean {
  const h = normalizeHash(hash).toLowerCase();
  if (href.startsWith("/#")) {
    const id = href.slice(2).toLowerCase();
    if (pathname !== "/") return false;
    if (h) {
      if (id === "home") return h === "home" || h === "";
      return h === id;
    }
    if (id === "home") return homeSpySectionId === "home";
    return homeSpySectionId === id;
  }
  if (href === "/engineering") {
    return pathname === "/engineering" && h === "";
  }
  if (href.startsWith("/engineering#")) {
    const id = (href.split("#")[1] ?? "").toLowerCase();
    return pathname === "/engineering" && h === id;
  }
  return false;
}

const Navbar = () => {
  const { pathname, hash } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const paletteHint = useCommandPaletteShortcutLabel();
  const mobileSections = getMobileNavSections();
  const homeSpySectionId = useHomeScrollSpySection(pathname, hash);
  const activeDesktopHref = useMemo(
    () => getActiveDesktopNavHref(pathname, hash, homeSpySectionId),
    [pathname, hash, homeSpySectionId],
  );
  const onCvPage = pathname === "/cv";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/90 shadow-card"
            : "bg-background/40 backdrop-blur-md border-b border-border/40"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 min-h-14 sm:min-h-16 flex items-center justify-between">
          <a href="/#home" className="text-lg sm:text-xl font-bold font-mono text-foreground py-2 -my-0.5">
            TN<span className="text-primary">.</span>
          </a>

          {/* Desktop — compact primary nav; full list in menu + palette */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <nav className="flex items-center gap-4 lg:gap-5" aria-label="Primary">
              {DESKTOP_NAV_BAR_ITEMS.map((link) => {
                const active = activeDesktopHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    title={link.title ?? link.label}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium whitespace-nowrap py-2 rounded-md px-1.5 -mx-0.5 transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "text-primary font-semibold after:absolute after:left-1 after:right-1 after:bottom-1 after:h-0.5 after:rounded-full after:bg-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="flex items-center gap-2 pl-3 ml-1 border-l border-border/60">
              <span
                className="hidden lg:inline text-[11px] text-muted-foreground tabular-nums border border-border/80 rounded-md px-1.5 py-1"
                title="Open quick navigation (all sections)"
              >
                {paletteHint}
              </span>
              <a
                href={SITE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card hover:border-border transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-[1.125rem] w-[1.125rem]" />
              </a>
              <Button
                variant="hero"
                size="sm"
                className={cn("shadow-glow shrink-0 h-9 px-3", onCvPage && "ring-2 ring-primary/70 ring-offset-2 ring-offset-background")}
                asChild
              >
                <a href="/cv">
                  <FileDown className="w-4 h-4 mr-1" />
                  CV
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile — GitHub + menu (full nav + CV in drawer) */}
          <div className="flex md:hidden items-center gap-1.5">
            <a
              href={SITE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border/70 bg-card/80 text-muted-foreground hover:text-foreground active:bg-card"
              aria-label="GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl border border-border/70 bg-card/80 text-foreground active:bg-card"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
          />
          <div
            id="mobile-nav-menu"
            className="md:hidden fixed left-0 right-0 z-50 border-b border-border bg-background/98 backdrop-blur-xl shadow-lg top-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:top-[calc(4rem+env(safe-area-inset-top,0px))] max-h-[min(78dvh,calc(100dvh-4.5rem-env(safe-area-inset-top,0px)))] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 fade-in duration-200"
          >
            <div className="px-3 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {mobileSections.map((section, si) => (
                <div key={section.heading} className={si > 0 ? "mt-4 border-t border-border/60 pt-4" : ""}>
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.heading}
                  </p>
                  <ul className="space-y-0.5">
                    {section.items.map((link) => {
                      const active = isMobileNavLinkActive(link.href, pathname, hash, homeSpySectionId);
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            title={link.title}
                            onClick={() => setIsOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center rounded-xl px-3 text-[15px] font-medium active:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              active
                                ? "bg-primary/12 text-primary border border-primary/25"
                                : "text-foreground/90",
                            )}
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-2 px-1">
                <Button variant="hero" size="lg" className="w-full min-h-12 text-base" asChild>
                  <a href="/cv" onClick={() => setIsOpen(false)}>
                    <FileDown className="w-4 h-4 mr-2" />
                    Open CV
                  </a>
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Quick jump anywhere · {paletteHint}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Navbar;
