import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import Services from "@/components/Services";   // ✅ fixed
import  Works  from "@/components/Works";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero3DBackground } from "@/components/Hero3DBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <Hero3DBackground />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Services />   {/* ✅ Works now */}
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
