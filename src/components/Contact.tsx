import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/content/site-links";
import { BrandGithubMark, BrandLinkedInMark, BrandMailMark } from "@/components/icons/contact-brand-icons";

const MAIL = "mailto:thamsanqandelu0210@gmail.com";

const socialTiles = [
  {
    href: SITE_GITHUB_URL,
    label: "GitHub profile",
    tileClass:
      "bg-[#f0f3f6] text-[#1a1e22] border-[#d8dee4] hover:bg-white hover:border-[#afb8c1] shadow-sm hover:shadow-md",
    icon: <BrandGithubMark className="w-7 h-7 sm:w-8 sm:h-8" />,
  },
  {
    href: SITE_LINKEDIN_URL,
    label: "LinkedIn profile",
    tileClass: "bg-[#0A66C2] text-white border-[#0A66C2] hover:bg-[#004182] hover:border-[#004182] shadow-sm hover:shadow-md",
    icon: <BrandLinkedInMark className="w-7 h-7 sm:w-8 sm:h-8" />,
  },
  {
    href: MAIL,
    label: "Send email",
    tileClass:
      "bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:border-primary-hover shadow-sm hover:shadow-md",
    icon: <BrandMailMark className="w-7 h-7 sm:w-8 sm:h-8" />,
  },
] as const;

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-6 text-foreground">
            Let&apos;s Build Something <span className="text-primary">Impactful</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">
            Open to internship and graduate roles. If you want someone curious, dependable, and focused on real systems —
            reach out.
          </p>
          <p className="text-sm sm:text-base text-secondary-foreground/80 leading-relaxed mb-8 sm:mb-10">
            I enjoy work that improves workflows, cuts friction, and holds up in production.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 max-w-lg mx-auto">
            <Button variant="hero" size="lg" className="text-base px-8 h-12 sm:h-13 w-full sm:flex-1 gap-2" asChild>
              <a href={MAIL}>
                <Mail className="w-5 h-5 shrink-0 opacity-95" />
                Email me
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 sm:h-13 w-full sm:flex-1 gap-2 border-[#0A66C2]/55 bg-[#0A66C2]/08 text-[#0A66C2] hover:bg-[#0A66C2]/14 hover:text-[#084d97] hover:border-[#0A66C2]"
              asChild
            >
              <a href={SITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <BrandLinkedInMark className="w-5 h-5 shrink-0 text-[#0A66C2]" />
                LinkedIn
              </a>
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4">Or open a profile directly</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {socialTiles.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={`group flex min-h-[3.25rem] min-w-[3.25rem] items-center justify-center rounded-xl border p-3.5 sm:p-4 transition-all duration-300 ${link.tileClass}`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
