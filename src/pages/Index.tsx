import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentlyBuildingTerminal from "@/components/sections/CurrentlyBuildingTerminal";
import SystemStatus from "@/components/sections/SystemStatus";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ArchitectureShowcase from "@/components/sections/ArchitectureShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CurrentlyBuildingTerminal />
      <SystemStatus />
      <Experience />
      <Projects />
      <ArchitectureShowcase />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
