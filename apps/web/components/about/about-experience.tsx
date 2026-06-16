"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2022 — 2025",
    role: "Frontend Developer",
    company: "Rainbow Ecommerce Ltd.",
    description:
      "Led the development of reusable frontend systems and CMS components, improving product consistency, performance, and user experience across multiple B2B web platforms.",
    current: false,
  },
  {
    period: "Jun — Sept 2021",
    role: "Frontend Developer",
    company: "FPT Telecom JSC",
    description:
      "Crafted user-centered SaaS experiences from interface design to feature delivery, working closely with engineering teams to ensure scalability and product quality.",
    current: false,
  },
  {
    period: "Jun — Sept 2021",
    role: "Web Developer",
    company: "Data Design Vietnam CO Ltd.",
    description:
      "Developed and maintained a centralized CMS platform and custom WordPress plugins, managing software licenses and digital assets.",
    current: false,
  },
  {
    period: "2021 — Present",
    role: "Freelance Developer",
    description:
      "Delivered end-to-end web solutions by designing user experiences, building scalable frontend architectures, and integrating backend services through APIs.",
    current: true,
  },
];

const education = [
  {
    period: "2018 — 2021",
    role: "Associate Degree in Software Engineering",
    company: "International College Ho Chi Minh",
    description: "",
    current: false,
  },
];

export function AboutExperience() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-header", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          scroller: document.body,
          start: "top 85%",
          once: true,
        },
      });

      const rows = gsap.utils.toArray<HTMLElement>(".exp-row");
      gsap.set(rows, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ref.current,
        scroller: document.body,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="px-6 md:px-12 py-16 border-b border-border/40">
      {/* Experience */}
      <div className="mb-0">
        <div className="exp-header flex flex-col gap-3 mb-5">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            EXEPERIENCE
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-primary">
            <span className="text-sub">I'm</span> work on
          </h2>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="exp-row grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6 lg:gap-3 py-6 border-b border-border/40 last:border-b-0 last:border-border/40 group">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {exp.current && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  )}
                  <span className="font-mono text-xs xl:text-[1.125rem] text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <h3 className="font-semibold text-xl xl:text-[1.75rem] text-primary mb-1">
                  {exp.role}
                </h3>
                {exp.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                )}
              </div>

              <div className="md:text-right">
                <span className="font-mono text-xs xl:text-[1.125rem] text-muted-foreground">
                  {exp.company ? exp.company : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      {/* <div>
        <div className="exp-header flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Education
          </span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <div className="flex flex-col">
          {education.map((edu, i) => (
            <div
              key={i}
              className="exp-row grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-2 md:gap-8 py-6 border-t border-border/40 last:border-b last:border-border/40">
              <span className="font-mono text-xs text-muted-foreground">
                {edu.period}
              </span>
              <h3 className="font-medium text-base">{edu.role}</h3>
              <span className="font-mono text-xs text-muted-foreground md:text-right">
                {edu.company}
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
