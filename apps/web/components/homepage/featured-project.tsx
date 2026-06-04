"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@portfolio/types";
import { Card, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectIndexRef = useRef<HTMLDivElement>(null);
  const projectImagesRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const [indexText, setIndexText] = useState(
    `01/${String(projects.length).padStart(2, "0")}`
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useGSAP(
    () => {
      if (isMobile) return;
      const section = sectionRef.current;
      const projectIndex = projectIndexRef.current;
      const projectImagesContainer = projectImagesRef.current;

      if (!section || !projectIndex || !projectImagesContainer) return;

      const totalProjectCount = projects.length;
      const spotlightHeight = section.offsetHeight;
      const spotlightPadding = parseFloat(getComputedStyle(section).paddingTop);
      const indexHeight = projectIndex.offsetHeight;
      const imagesHeight = projectImagesContainer.offsetHeight;
      const imgActivationThreshold = window.innerHeight / 2;

      const moveDistanceIndex =
        spotlightHeight - spotlightPadding * 2 - indexHeight;
      const moveDistanceImages = window.innerHeight - imagesHeight;

      ScrollTrigger.create({
        trigger: section,
        scroller: document.body,
        start: "top top",
        end: `+=${spotlightHeight * totalProjectCount}`,
        pin: true,
        pinType: "transform",
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // update index text — matches original exactly
          const currentIndex = Math.min(
            Math.floor(progress * totalProjectCount) + 1,
            totalProjectCount
          );
          setIndexText(
            `${String(currentIndex).padStart(2, "0")}/${String(
              totalProjectCount
            ).padStart(2, "0")}`
          );

          // move index and images container — matches original exactly
          gsap.set(projectIndex, {
            y: progress * moveDistanceIndex,
          });

          gsap.set(projectImagesContainer, {
            y: progress * moveDistanceImages,
          });

          // activate image based on viewport center — matches original forEach exactly
          imgRefs.current.forEach((img, i) => {
            if (!img) return;
            const imgRect = img.getBoundingClientRect();
            const imgTop = imgRect.top;
            const imgBottom = imgRect.bottom;

            if (
              imgTop <= imgActivationThreshold &&
              imgBottom >= imgActivationThreshold
            ) {
              gsap.set(img, { opacity: 1 });
              setActiveIndex(i);
            } else {
              gsap.set(img, { opacity: 0.5 });
            }
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  if (!projects.length) return null;

  return (
    <section
      ref={sectionRef}
      className="spotlight relative h-screen px-6 md:px-12 py-16">
      {/* Layout — number left, images right */}
      <div className="flex max-lg:flex-col h-[calc(100%-120px)] items-start justify-between">
        {/* Left — big scrolling number */}
        <h2
          ref={projectIndexRef}
          className="flex text-3xl md:text-4xl items-center gap-2 font-bold mb-4">
          <span className="text-foreground">Featured</span>
          <span className="text-sub">Work</span>
          <sup className="text-sm">({indexText})</sup>
        </h2>

        {/* Right — floating images */}
        <div
          ref={projectImagesRef}
          className="flex h-full overflow-hidden flex-col gap-4 w-56 md:w-120 shrink-0">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="relative w-full transition-all duration-500"
              style={{
                height: "300px",
              }}>
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full rounded-xl border border-border/40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    // <section ref={sectionRef} className="py-16 px-4 md:px-12 md:py-18">
    //   <div className="container mx-auto ">
    //     <div className="flex max-lg:flex-col items-start md:gap-12">
    //       {/* Eyebrow */}

    //       {/* Work list */}
    //       <div className="project__card-featured-list flex flex-col">
    //         {projects.map((project, i) => (
    //           <Card
    //             key={project.id}
    //             ref={projectImagesRef}
    //             className="flex flex-col h-full relative z-10 duration-300 project__card-featured gap-4"
    //             style={{
    //               opacity: i === activeIndex ? 1 : 0.3,
    //               transform: i === activeIndex ? "scale(1)" : "scale(0.95)",
    //             }}>
    //             <Link
    //               className="absolute top-0 bottom-0 left-0 right-0 z-20"
    //               href={`/projects/${project.slug}`}></Link>
    //             {project.imageUrl ? (
    //               <div className="aspect-video overflow-hidden rounded-t-lg relative">
    //                 <Image
    //                   src={project.imageUrl}
    //                   alt={project.title}
    //                   fill
    //                   className="object-cover group-hover:scale-105 transition-transform duration-500"
    //                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //                 />
    //               </div>
    //             ) : (
    //               <div className="aspect-video rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
    //                 <span className="text-4xl font-bold text-primary/30">
    //                   {project.title.charAt(0)}
    //                 </span>
    //               </div>
    //             )}
    //             <CardHeader className="pb-2 px-0">
    //               <div className="flex flex-col items-start justify-between gap-3">
    //                 <Link href={`/projects/${project.slug}`}>
    //                   <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
    //                     {project.title}
    //                   </h3>
    //                 </Link>
    //                 <div className="flex flex-wrap gap-2">
    //                   {project.techStack.slice(0, 4).map((tech) => (
    //                     <Badge
    //                       key={tech}
    //                       variant="outline"
    //                       className="text-xs rounded-md">
    //                       {tech}
    //                     </Badge>
    //                   ))}
    //                   {project.techStack.length > 4 && (
    //                     <Badge variant="outline" className="text-xs rounded-md">
    //                       +{project.techStack.length - 4}
    //                     </Badge>
    //                   )}
    //                 </div>
    //               </div>
    //             </CardHeader>
    //           </Card>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
