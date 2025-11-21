import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero3DBackground } from "@/components/Hero3DBackground";
import linkedinWorkshop from "@/assets/works/linkedin-workshop.png";
import execomCall from "@/assets/works/execom-call.png";
import politicalCampaign from "@/assets/works/political-campaign.jpg";
import carPhotography from "@/assets/works/car-photography.jpg";

const projects = [
  {
    id: "linkedin-workshop",
    title: "LinkedIn Workshop Poster",
    category: "Event Design",
    description: "Professional event poster design for IEEE Student Branch workshop on resume and LinkedIn creation",
    image: linkedinWorkshop,
    details: "Created an engaging event poster for a LinkedIn and Resume Creation Workshop hosted by IEEE Student Branch MCET. The design features modern gradients, clean typography, and professional branding elements to attract student participation. The poster effectively communicates the workshop details including date, time, and registration information while maintaining the IEEE brand identity."
  },
  {
    id: "execom-call",
    title: "Executive Committee Recruitment",
    category: "Event Design",
    description: "Eye-catching recruitment poster for IEEE EXECOM 2026 with bold typography and modern aesthetics",
    image: execomCall,
    details: "Designed a compelling Call for EXECOM poster for IEEE Student Branch MCET. The design emphasizes leadership opportunity with the tagline 'Step up. Lead. Inspire.' featuring contemporary purple gradients and clear call-to-action elements. The poster includes deadline information and QR code for easy application access, creating an effective recruitment tool."
  },
  {
    id: "political-campaign",
    title: "Political Campaign Poster",
    category: "Political Design",
    description: "Professional political campaign poster with traditional party colors and strong visual hierarchy",
    image: politicalCampaign,
    details: "Created a high-impact political campaign poster featuring candidate photography, party branding, and clear messaging. The design incorporates traditional BJP colors (orange, green) and includes key contact information for voter engagement. The composition balances professional imagery with bold typography to create maximum impact and voter recognition."
  },
  {
    id: "car-photography",
    title: "Automotive Photography",
    category: "Photography",
    description: "Professional automotive photography showcasing modified cars with dynamic composition",
    image: carPhotography,
    details: "Captured stunning automotive photography featuring custom-modified vehicles. The shoot highlights the craftsmanship and attention to detail in car modification culture, with professional lighting and composition that brings out the vibrant colors and design elements. The photography showcases both the technical modifications and aesthetic appeal of the vehicles."
  },
  {
    id: "brand-identity",
    title: "Brand Identity Design",
    category: "Branding",
    description: "Complete brand identity for a tech startup",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    details: "Developed a comprehensive brand identity system including logo design, color palette, typography, and brand guidelines for an innovative tech startup. The identity reflects modern design principles while maintaining professional credibility and scalability across all touchpoints."
  },
  {
    id: "social-media",
    title: "Social Media Campaign",
    category: "Social Media",
    description: "Engaging content strategy and design",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    details: "Created a cohesive social media campaign with engaging visuals, strategic content planning, and consistent brand messaging across multiple platforms. The campaign successfully increased engagement and brand awareness through creative storytelling and targeted content."
  },
];

const WorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="fixed inset-0 -z-10">
          <Hero3DBackground />
        </div>
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <Hero3DBackground />
      </div>
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Works
            </Button>

            <div className="max-w-5xl mx-auto">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                {project.category}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12">
                {project.description}
              </p>

              <div className="rounded-2xl overflow-hidden mb-12 border border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.details}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-xl font-bold mb-6">More Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.id !== project.id)
                    .slice(0, 3)
                    .map((relatedProject) => (
                      <div
                        key={relatedProject.id}
                        onClick={() => navigate(`/work/${relatedProject.id}`)}
                        className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:shadow-elegant transition-all"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-primary mb-2">
                            {relatedProject.category}
                          </p>
                          <h4 className="font-bold">{relatedProject.title}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkDetail;
