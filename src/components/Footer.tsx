const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-bold text-gradient font-mono">
              TN.
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Software Developer · Building real-world systems
            </p>
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
            <a href="https://github.com/Ndelu-Blose" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <span className="text-border">·</span>
            <a href="https://www.linkedin.com/in/thamsanqa-ndelu" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
