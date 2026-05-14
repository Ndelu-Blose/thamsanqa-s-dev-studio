import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentlyBuildingTerminal from "@/components/sections/CurrentlyBuildingTerminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
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
