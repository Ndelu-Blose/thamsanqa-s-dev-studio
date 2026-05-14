/**
 * Single end-of-page pointer to Contact on the home page (avoids duplicating the full Contact section here).
 */
const EngineeringEndCta = () => {
  return (
    <section className="border-t border-border/50 py-10 sm:py-12" aria-label="How to get in touch">
      <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Hiring, internships, or collaboration?{" "}
          <a href="/#contact" className="font-medium text-primary hover:underline">
            Contact
          </a>{" "}
          on the home page — email and profiles are kept there so you only see them once.
        </p>
      </div>
    </section>
  );
};

export default EngineeringEndCta;
