import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/content/site-links";
import { BrandGithubMark, BrandLinkedInMark } from "@/components/icons/contact-brand-icons";

const MAIL = "mailto:thamsanqandelu0210@gmail.com";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 relative scroll-mt-nav sm:scroll-mt-nav-sm">
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-6 text-foreground">
            Let&apos;s Build Something <span className="text-primary">Impactful</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">
            Open to internship and graduate roles. If you want someone curious, dependable, and focused on real systems —
            reach out.
          </p>
          <p className="text-sm sm:text-base text-secondary-foreground/80 leading-relaxed mb-8 sm:mb-10">
            I enjoy work that improves workflows, cuts friction, and holds up in production.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 mb-8 sm:mb-10 max-w-lg sm:max-w-3xl mx-auto w-full">
            <Button variant="hero" size="lg" className="text-base px-6 min-h-12 h-auto py-3 w-full gap-2" asChild>
              <a href={MAIL}>
                <Mail className="w-5 h-5 shrink-0 opacity-95" />
                Email me
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-6 min-h-12 h-auto py-3 w-full gap-2 border-[#0A66C2]/55 bg-[#0A66C2]/08 text-[#0A66C2] hover:bg-[#0A66C2]/14 hover:text-[#084d97] hover:border-[#0A66C2]"
              asChild
            >
              <a href={SITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <BrandLinkedInMark className="w-5 h-5 shrink-0 text-[#0A66C2]" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-6 min-h-12 h-auto py-3 w-full gap-2 border-white/20 bg-white/[0.06] text-foreground hover:bg-white/[0.1] hover:text-foreground hover:border-white/35"
              asChild
            >
              <a href={SITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <BrandGithubMark className="w-5 h-5 shrink-0 text-foreground" />
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
