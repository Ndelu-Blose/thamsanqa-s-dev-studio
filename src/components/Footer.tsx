import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/content/site-links";
import { useCommandPaletteShortcutLabel } from "@/lib/useCommandPaletteShortcutLabel";
import { FOOTER_NAV_ITEMS } from "@/content/site-nav";

const cvLastUpdated = "May 2026";

const Footer = () => {
  const paletteHint = useCommandPaletteShortcutLabel();
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="text-center md:text-left max-w-md md:max-w-none">
            <a href="/#home" className="text-xl font-bold font-mono text-foreground">
              TN<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Software Developer · Building real-world systems
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              Durban, South Africa · CV updated {cvLastUpdated}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">Quick nav · {paletteHint}</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end" aria-label="Footer">
            {FOOTER_NAV_ITEMS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center px-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
            <a
              href={SITE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <span className="text-border hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <a
              href={SITE_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground/70">
            © 2026 Thamsanqa Ndelu
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Built By{" "}
            <a
              href="https://www.cliveux.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CliveUX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
