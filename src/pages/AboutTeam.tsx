import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero3DBackground } from "@/components/Hero3DBackground";
import { useEffect } from "react";

const AboutTeam = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <Hero3DBackground />
      </div>
      <Navbar />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutTeam;
