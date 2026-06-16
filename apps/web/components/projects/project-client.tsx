"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useProjects } from "@/hook/useProject";
import type { Project, Category } from "@portfolio/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export function ProjectsClient({
  initialProjects,
  categories,
}: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { data: projects, isLoading } = useProjects(
    activeCategory,
    initialProjects
  );
  useGSAP(
    () => {
      gsap.from(".page-intro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!projects?.length || isLoading) return;
      const rows = gsap.utils.toArray<HTMLElement>(".project-list-row");
      gsap.set(rows, { opacity: 0 });
      gsap.to(rows, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3,
      });
    },
    { scope: containerRef, dependencies: [projects, isLoading] }
  );
  useGSAP(() => {
    if (!introRef.current) return;

    gsap.to(introRef.current, {
      opacity: 0,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: introRef.current,
        start: "top top",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });
  return (
    <div ref={containerRef}>
      {/* Page intro */}
      <div
        ref={introRef}
        className="px-6 flex flex-col justify-end md:px-12 pt-20 pb-24 lg:pt-0 lg:pb-16 lg:h-[93vh]">
        <div className="bio-image-wrap relative mb-6">
          <div className="relative w-full aspect-video max-w-lg mx-auto md:mx-0 overflow-hidden rounded-2xl">
            <Image
              src="/bg-project.png"
              alt="Tuan Tran"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-sub mb-3">
          Here is some of my <span className="text-primary">Work</span>
        </h1>
        <p className="page-intro text-base text-muted-foreground">
          For any questions regarding other work, feel free to reach out.
        </p>
      </div>
      {/* Work header + count */}
      <div className="px-6 md:px-12 pb-6 md:pb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
          Project{" "}
          <sup className="font-mono text-lg text-muted-foreground">
            ({projects?.length ?? initialProjects.length})
          </sup>
        </h2>
        {/* Category filter */}
        <div className="flex gap-1 mt-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory(undefined)}
            className={`text-sm px-4 transition-all duration-200 py-2 rounded-xs transition-all whitespace-nowrap ${
              activeCategory === undefined
                ? "bg-primary text-white"
                : " hover:bg-black hover:text-white"
            }`}>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`text-sm px-4 transition-all duration-200 py-2 rounded-xs transition-all whitespace-nowrap ${
                activeCategory === cat.slug
                  ? "bg-primary text-white"
                  : "hover:bg-black hover:text-white"
              }`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      {/* Project list */}
      <div className="px-6 md:px-12 pb-24">
        {isLoading && (
          <div className="flex flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="py-6">
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}
        {!isLoading && projects?.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              No projects in this category.
            </p>
            <button
              onClick={() => setActiveCategory(undefined)}
              className="mt-4 font-mono text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground">
              Clear filter
            </button>
          </div>
        )}

        {!isLoading && projects && projects.length > 0 && (
          <div className="project-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-12">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="project-list-row group">
                <div className=" flex flex-col gap-2 md:gap-3 items-baseline justify-between transition-all duration-200">
                  {project.imageUrl ? (
                    <div className="w-full aspect-video overflow-hidden rounded-md relative">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between w-full gap-1">
                    <div className="flex-1 min-w-0">
                      <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-mono text-base lg:text-sm text-muted-foreground">
                        {project.category.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
