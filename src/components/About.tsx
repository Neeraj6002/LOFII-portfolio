import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";
import adithyanathImg from "@/assets/team/adithyanath.jpg";
import gauthamImg from "@/assets/team/gautham.jpg";
import neerajImg from "@/assets/team/neeraj.jpg";
import muhammedImg from "@/assets/team/muhammed.jpg";

const team = [
  {
    name: "Adithyanath S",
    role: "Creative Director",
    skills: "Branding, Design Strategy",
    image: adithyanathImg,
    linkedin: "https://www.linkedin.com/in/adithyanath-s-82200432b/",
    email: "lofiidigital@gmail.com",
  },
  {
    name: "Gautham Sankar P K",
    role: "Lead Designer",
    skills: "Graphic Design, UI/UX",
    image: gauthamImg,
    linkedin: "https://www.linkedin.com/in/gautham-sankar-p-k-74791235b/",
    email: "lofiidigital@gmail.com",
  },
  {
    name: "Neeraj J",
    role: "Web Developer",
    skills: "Web Development",
    image: neerajImg,
    linkedin: "https://www.linkedin.com/in/neeraj-26-j/",
    email: "lofiidigital@gmail.com",
  },
  {
    name: "Muhammed Sha",
    role: "Content Strategist",
    skills: "Copywriting, Social Media",
    image: muhammedImg,
    linkedin: "https://www.linkedin.com/in/muhammed-sha-s-41246335a/",
    email: "lofiidigital@gmail.com",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">LOFII</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a team of four passionate AI & ML BTech students who transformed our creative passion into a professional studio. With over 2 years of experience and 50+ successful projects, we bring innovative solutions to every challenge.
          </p>
        </motion.div>

        {/* Mission & Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20 p-8 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At LOFII, we believe in the power of creative design to transform brands and connect with audiences. Our mission is to deliver exceptional creative solutions that not only look stunning but also drive real results for our clients.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Based in Trivandrum, Kerala, we combine our technical expertise in AI & ML with our creative skills to offer unique, data-driven design solutions that stand out in today's digital landscape.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Meet the <span className="bg-gradient-primary bg-clip-text text-transparent">Team</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-primary-foreground" />
                    </a>
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-1">{member.name}</h4>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.skills}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
