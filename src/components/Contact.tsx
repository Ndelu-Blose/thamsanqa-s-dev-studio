import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Build Something{" "}
            <span className="text-gradient">Impactful</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            I'm currently open to internship and graduate opportunities. If you're looking for a developer who's hungry to learn and ready to contribute — let's connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-base px-10 h-13" asChild>
              <a href="mailto:thamsanqa.ndelu@example.com">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-10 h-13" asChild>
              <a href="https://www.linkedin.com/in/thamsanqa-ndelu" target="_blank" rel="noopener noreferrer">
                <ArrowRight className="w-4 h-4 mr-2" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-5">
            {[
              { href: "https://github.com/Ndelu-Blose", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/thamsanqa-ndelu", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:thamsanqa.ndelu@example.com", icon: Mail, label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group p-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-glow transition-all duration-500"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
