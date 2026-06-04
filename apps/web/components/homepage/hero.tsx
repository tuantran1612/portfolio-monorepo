"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin();

const techStack = [
  "NestJS",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Prisma",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        ".hero-line-1",
        { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", y: 100, duration: 0.7 },
        "-=0.4"
      ).from(".hero-line-2", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="container mx-auto px-4 md:px-12">
      <div className=" lg:min-h-[93vh] flex flex-col justify-center py-32 md:py-0 max-w-4xl">
        <div className="hero-badge mb-2 md:mb-4 font-mono">
          <p>Available for work</p> · <p>Ho Chi Minh City</p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="hero-line-1 block text-sub">
            Hi,I'm <span className="text-foreground">Adrian Tran</span>
          </span>
          <span className="hero-line-2 block text-sub">
            I'm <span className="text-foreground">Frontend Developer</span>
          </span>
        </h1>

        {/* Bottom */}
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="hero-bottom-left flex flex-col gap-4">
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              I build scalable web applications — from API design to
              pixel-perfect UI. NestJS, Next.js, TypeScript, end to end.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
