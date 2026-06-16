"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "SASS", "GSAP"],
  },
  {
    category: "Backend",
    items: ["NestJS", "Node.js", "PHP", "Laravel", "REST API"],
  },
  {
    category: "Database & ORM",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Docker",
      "GitHub Actions",
      "Railway",
      "Vercel",
      "Git",
      "Figma",
      "VS Code",
    ],
  },
];

export function AboutStack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".stack-row");
      gsap.set(rows, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ref.current,
        scroller: document.body,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="px-6 md:px-12 py-16 border-b border-border/40">
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Tech stack
        </span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      <div className="flex flex-col">
        {stack.map((group) => (
          <div
            key={group.category}
            className="stack-row grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-6 border-t border-border/40 last:border-b last:border-border/40">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {group.category}
              </span>
              <span className="font-mono text-xs text-muted-foreground/50">
                ({group.items.length})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs px-3 py-1.5 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
