"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import type { Project } from "@portfolio/types";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
  related: Project[];
  nextProject: Project | null;
}

export function ProjectDetail({
  project,
  related,
  nextProject,
}: ProjectDetailProps) {
  const ref = useRef<HTMLDivElement>(null);

  // sanitize content client side
  const sanitizedContent = project.content || "";

  useGSAP(
    () => {
      // title entrance
      gsap.from(".detail-title", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
      });

      // metadata strip
      gsap.from(".detail-meta-col", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // hero image parallax
      if (project.imageUrl) {
        gsap.to(".detail-hero-inner", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".detail-hero",
            scroller: document.body,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // content fade in
      gsap.from(".detail-content", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".detail-content",
          scroller: document.body,
          start: "top 85%",
          once: true,
        },
      });

      // next project
      gsap.from(".next-project", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".next-project",
          scroller: document.body,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <>
      <BackButton />

      <div ref={ref}>
        {/* Title section */}
        <div className="px-6 md:px-12 pt-16 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/projects"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Work
            </Link>
            <span className="font-mono text-xs text-muted-foreground">/</span>
            <span className="font-mono text-xs text-muted-foreground">
              {project.category.name}
            </span>
          </div>

          <h1 className="detail-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] max-w-4xl mb-10">
            {project.title}
          </h1>

          {/* Metadata strip — 3 columns like Edwin Le */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-border/40">
            <div className="detail-meta-col">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Category
              </p>
              <p className="text-sm font-medium">{project.category.name}</p>
            </div>

            <div className="detail-meta-col">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Year
              </p>
              <p className="text-sm font-medium">
                {new Date(project.createdAt).getFullYear()}
              </p>
            </div>

            <div className="detail-meta-col">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Tech stack
              </p>
              <div className="flex flex-col gap-0.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <p key={tech} className="text-sm font-medium">
                    {tech}
                  </p>
                ))}
              </div>
            </div>

            <div className="detail-meta-col flex flex-col gap-2">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Links
              </p>
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
                  Live site ↗
                </Link>
              )}
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
                  Source code ↗
                </Link>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>
        </div>

        {/* Hero image — full bleed, edge to edge */}
        {project.imageUrl && (
          <div
            className="detail-hero relative w-full overflow-hidden"
            style={{ height: "65vh" }}>
            <div className="detail-hero-inner absolute inset-0 scale-110">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        )}

        {/* No image fallback */}
        {!project.imageUrl && (
          <div
            className="w-full flex items-center justify-center"
            style={{
              height: "40vh",
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))",
            }}>
            <span
              className="font-bold text-primary/10"
              style={{ fontSize: "clamp(80px, 15vw, 160px)" }}>
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Description + rich content */}
        <div className="detail-content px-6 md:px-12 py-16">
          <div className="max-w-2xl">
            {/* Short description */}
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-12">
              {project.description}
            </p>

            {/* TinyMCE rich content */}
            {sanitizedContent && (
              <div
                className="prose prose-slate dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-muted-foreground prose-li:mb-2
                  prose-img:w-full prose-img:rounded-none prose-img:my-12
                  [&_img]:!max-w-none [&_img]:-mx-6 [&_img]:md:-mx-12 [&_img]:w-[calc(100%+48px)] [&_img]:md:w-[calc(100%+96px)]
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            )}
          </div>
        </div>

        {/* Next project */}
        {nextProject && (
          <div className="next-project border-t border-border/40 px-6 md:px-12">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-between py-10 hover:pl-2 transition-all duration-200">
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Next project
                </p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <span className="text-2xl text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                ↗
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
