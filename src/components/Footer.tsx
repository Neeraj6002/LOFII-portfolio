import { Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLocation = () => {
    window.open(
      "https://www.google.com/maps/place/Trivandrum,+Kerala",
      "_blank"
    );
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="LOFII" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LOFII
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Digital creative studio crafting experiences that inspire and engage.
            </p>
            <button
              onClick={openLocation}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Trivandrum, Kerala</span>
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Services", "Works", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Graphic Designing</li>
              <li>Branding</li>
              <li>Video Editing</li>
              <li>Photo Editing</li>
              <li>Content Writing</li>
              <li>Social Media</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:lofiidigital@gmail.com"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              lofiidigital@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>© {currentYear} LOFII. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
