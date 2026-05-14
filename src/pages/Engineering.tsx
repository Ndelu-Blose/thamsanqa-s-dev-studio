import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import RecentActivityFeed from "@/components/sections/RecentActivityFeed";
import ProjectMetrics from "@/components/sections/ProjectMetrics";
import EngineeringNotes from "@/components/sections/EngineeringNotes";
import Skills from "@/components/Skills";
import NowSection from "@/components/sections/NowSection";
import LocationCard from "@/components/sections/LocationCard";
import Contact from "@/components/Contact";
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
      <main id="engineering" className="scroll-mt-20 pt-16 sm:pt-20">
        <About />
        <RecentActivityFeed />
        <ProjectMetrics />
        <EngineeringNotes />
        <Skills />
        <NowSection />
        <LocationCard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;
