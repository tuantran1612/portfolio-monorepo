"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const items = [
  "NestJS",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Prisma",
  "REST API",
  "CI/CD",
  "Railway",
  "Vercel",
  "GSAP",
  "TailwindCSS",
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  return (
    <div className="border-t border-b border-border/40 py-3 overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-0 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 font-mono text-xs text-muted-foreground flex-shrink-0">
            <span>{item}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
