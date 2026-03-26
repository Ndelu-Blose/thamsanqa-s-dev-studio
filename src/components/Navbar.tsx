import { useState, useEffect } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border/90 shadow-card"
            : "bg-background/35 backdrop-blur-md border-b border-border/40"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-gradient font-mono">
          TN.
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="shadow-glow" asChild>
            <a href="#contact">
              <FileDown className="w-4 h-4 mr-1" />
              CV
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border/70 bg-card/70 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      </nav>

      {/* Mobile menu */}
      {isOpen ? (
        <button
          type="button"
          aria-label="Close mobile menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      ) : null}
      <div
        id="mobile-nav-menu"
        className={`md:hidden fixed top-16 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-2xl px-6 pb-6 pt-4 space-y-1 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-[130%] pointer-events-none"
        }`}
      >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-3 text-base text-muted-foreground hover:text-primary hover:bg-card transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="default" className="w-full mt-3" asChild>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <FileDown className="w-4 h-4 mr-1" />
              CV
            </a>
          </Button>
      </div>
    </>
  );
};

export default Navbar;
