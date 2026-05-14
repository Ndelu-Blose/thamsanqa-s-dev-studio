import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/content/site-links";
import { useCommandPaletteShortcutLabel } from "@/lib/useCommandPaletteShortcutLabel";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/engineering#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/engineering#skills" },
  { label: "Contact", href: "/#contact" },
];

const cvLastUpdated = "Mar 2026";

const Footer = () => {
  const paletteHint = useCommandPaletteShortcutLabel();
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
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

          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            <a href={SITE_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <span className="text-border">·</span>
            <a href={SITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
