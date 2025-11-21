import { Icon } from "@iconify/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../indux";
import { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ---------- Types ----------
interface Framework {
  name: string;
}

interface Project {
  id: number | string;
  name: string;
  bgImage: string;
  image: string;
  frameworks: Framework[];
}

const Works: React.FC = () => {
  const overlayRefs = useRef<HTMLDivElement[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const mouse = useRef({ x: 0, y: 0 });

  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  // GSAP setup
  useGSAP(() => {
    if (!previewRef.current) return;

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".project-item", {
      y: 80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#work",
        start: "top 80%",
      },
    });
  }, []);

  // Mouse enter
  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.2,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // Mouse leave
  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // Mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;

    const x = e.clientX + 24;
    const y = e.clientY + 24;

    mouse.current = { x, y };

    moveX.current?.(x);
    moveY.current?.(y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle="Logic meets Aesthetics, Seamlessly"
        title="Works"
        text={text}
        textColor="text-black"
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project: Project, index: number) => (
          <div
            key={project.id}
            className="project-item relative flex flex-col gap-2 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                if (el) overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block bg-black -z-10"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            />

            {/* title */}
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="text-[26px] lg:text-[32px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="size-5 md:size-6" />
            </div>

            <div className="w-full h-0.5 bg-black/80" />

            {/* frameworks */}
            <div className="flex px-10 gap-x-5 text-xs md:text-sm uppercase transition-all duration-500 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.name}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* mobile preview */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-img`}
                className="absolute bg-center px-14 rounded-xl"
              />
            </div>
          </div>
        ))}

        {/* desktop floating preview */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none hidden md:block w-[960px] opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
