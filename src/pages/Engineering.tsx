import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import RecentActivityFeed from "@/components/sections/RecentActivityFeed";
import ProjectMetrics from "@/components/sections/ProjectMetrics";
import EngineeringNotes from "@/components/sections/EngineeringNotes";
import Skills from "@/components/Skills";
import EngineeringPageIntro from "@/components/sections/EngineeringPageIntro";
import EngineeringEndCta from "@/components/sections/EngineeringEndCta";
import Footer from "@/components/Footer";

const Engineering = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== "/engineering") return;
    const id = hash.replace(/^#/, "");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="engineering" className="scroll-mt-nav sm:scroll-mt-nav-sm pt-[calc(3.75rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4.25rem+env(safe-area-inset-top,0px))]">
        <header className="container mx-auto px-4 sm:px-6 border-b border-border/50 pb-6 sm:pb-8">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Engineering hub</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Engineering
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Same destination as the <span className="text-foreground/85 font-medium">Engineering</span> link in the nav —
            background, activity, skills, and notes. Featured repos and the main contact block stay on the home
            page.
          </p>
        </header>
        <EngineeringPageIntro />
        <About />
        <RecentActivityFeed />
        <ProjectMetrics />
        <EngineeringNotes />
        <Skills />
        <EngineeringEndCta />
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;
