/**
 * One-time orientation so visitors know what lives on this route vs the home page.
 */
const EngineeringPageIntro = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl pb-8 sm:pb-10 pt-2">
      <p className="text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed">
        <span className="text-foreground/90 font-medium">This page</span> is for story, activity, skills, and location.
        Featured repos and the main contact block stay on the{" "}
        <a className="text-primary font-medium hover:underline" href="/">
          home page
        </a>{" "}
        under{" "}
        <a className="text-primary font-medium hover:underline" href="/#projects">
          Projects
        </a>{" "}
        and{" "}
        <a className="text-primary font-medium hover:underline" href="/#contact">
          Contact
        </a>
        .
      </p>
    </div>
  );
};

export default EngineeringPageIntro;
