"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import type { Project } from "@portfolio/types";
import dynamic from "next/dynamic";
import { ScrollIndicator } from "../ui/scroll-indicator";
gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
  nextProject: Project | null;
  prevProject: Project | null;
}
// load wave only on client — avoids hydration mismatch from Math.sin() float differences
const WaveBackground = dynamic(
  () =>
    import("./../ui/wave-background").then((m) => ({
      default: m.WaveBackground,
    })),
  { ssr: false }
);

export function ProjectDetail({ project }: ProjectDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sanitizedContent = project.content || "";

  useGSAP(
    () => {
      // hero title entrance
      gsap.from(".detail-title", {
        opacity: 0,
        y: 60,
        duration: 1.0,
        ease: "power3.out",
      });

      gsap.from(".detail-meta-col", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".detail-scroll-hint", {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "power2.out",
      });

      // image reveal
      gsap.from(".detail-image-wrap", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".detail-image-wrap",
          scroller: document.body,
          start: "top 85%",
          once: true,
        },
      });
      // description
      gsap.fromTo(
        ".detail-description",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-description",
            start: "top 85%",
            once: true,
          },
        }
      );

      // rich content
      gsap.from(".detail-prose", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".detail-prose",
          scroller: document.body,
          start: "top 85%",
          once: true,
        },
      });
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "bottom 80%",
            end: "bottom 42%",
            scrub: true,
          },
        });
      }
    },
    { scope: ref }
  );

  return (
    <>
      <BackButton />

      <div ref={ref}>
        {/* ── PHASE 1: HERO ── */}
        <div
          ref={heroRef}
          className="relative min-h-[95vh] flex flex-col overflow-hidden bg-background">
          <WaveBackground />

          <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 md:pt-48">
            {/* Title */}
            <h1 className="detail-title text-primary text-[clamp(36px,6vw,80px)] font-medium leading-[1.0] tracking-tight max-w-4xl mb-16 md:mb-24">
              {project.title}
            </h1>
          </div>
          {/* Metadata strip — no borders, wide spacing */}
          <div className="relative z-10 px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
            <div className="flex max-md:flex-col md:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-16">
              <div className="detail-meta-col grow-0 shrink-0 flex-auto">
                <p className="text-sub text-sm text-muted-foreground/50 uppercase tracking-widest mb-2">
                  Category
                </p>
                <p className="text-base font-medium">{project.category.name}</p>
              </div>
              <div className="detail-meta-col grow-0 shrink-0 flex-auto">
                <p className="text-sub text-sm text-muted-foreground/50 uppercase tracking-widest mb-2">
                  Year
                </p>
                <p className="text-base font-medium">
                  {new Date(project.createdAt).getFullYear()}
                </p>
              </div>
              <div className="detail-meta-col grow-0 shrink-0 flex-auto">
                <p className="text-sub text-sm text-muted-foreground/50 uppercase tracking-widest mb-2">
                  Tech stack
                </p>
                <div className="flex flex-col gap-1">
                  {project.techStack.map((tech) => (
                    <p key={tech} className="text-base font-medium">
                      {tech}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="detail-scroll-hint absolute bottom-10
            left-0 right-0 flex items-center gap-3 mt-16 md:mt-20">
            <ScrollIndicator></ScrollIndicator>
          </div>
        </div>
        <div className="bg-[#141414] px-6 md:px-16 lg:px-24  py-12 md:py-16 lg:py-24">
          {/* ── PHASE 2: IMAGE ── */}
          <div className="detail-image-wrap mb-4 lg:mb-8">
            {project.imageUrl ? (
              <div
                className="detail-hero-img relative w-full overflow-hidden rounded-2xl"
                style={{ maxWidth: 1280, maxHeight: 640, margin: "0 auto" }}>
                <div style={{ paddingTop: "50%" }} className="relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                </div>
              </div>
            ) : (
              <div
                className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center"
                style={{
                  maxWidth: 1280,
                  margin: "0 auto",
                  height: 480,
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--primary)/0.02))",
                }}>
                <span
                  className="font-bold text-primary/10"
                  style={{ fontSize: "clamp(80px,15vw,180px)" }}>
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* ── PHASE 2: CONTENT ── */}
          <div className="detail-content">
            <div className="max-w-3xl mx-auto">
              {/* Short description */}
              <h4 className="text-white uppercase tracking-widest mb-4">
                Background
              </h4>
              <p className="detail-description text-white/60 text-xl font-light text-muted-foreground leading-relaxed mb-16">
                {project.description}
              </p>
              {/* Rich content from TinyMCE */}
              {sanitizedContent ? (
                <div
                  className="detail-prose prose prose-slate dark:prose-invert max-w-none
                  prose-headings:font-medium prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-5
                  prose-h3:text-lg prose-h3:mt-10 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-muted-foreground prose-ul:pl-4
                  prose-li:mb-2 prose-li:text-base
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  [&_img]:rounded-xl [&_img]:w-full [&_img]:my-12
                  [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-6 [&_blockquote]:text-muted-foreground [&_blockquote]:not-italic
                "
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              ) : (
                /* Example content structure hint when no content */
                <div className="flex flex-col gap-12 text-muted-foreground/40">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-4">
                      Background
                    </p>
                    <div className="h-4 bg-current rounded opacity-20 mb-2 w-full" />
                    <div className="h-4 bg-current rounded opacity-20 mb-2 w-4/5" />
                    <div className="h-4 bg-current rounded opacity-20 w-3/5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-4">
                      Challenge
                    </p>
                    <div className="h-4 bg-current rounded opacity-20 mb-2 w-full" />
                    <div className="h-4 bg-current rounded opacity-20 w-2/3" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-4">
                      Key results
                    </p>
                    <div className="h-4 bg-current rounded opacity-20 mb-2 w-full" />
                    <div className="h-4 bg-current rounded opacity-20 w-3/4" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
