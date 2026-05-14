import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentlyBuildingTerminal from "@/components/sections/CurrentlyBuildingTerminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const id = hash.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <CurrentlyBuildingTerminal />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
