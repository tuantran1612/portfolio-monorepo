"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator } from "../ui/scroll-indicator";
import { LinkButton } from "@/components/ui/link";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1000px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-badge", { opacity: 0, y: 10, duration: 0.5 })
          .from(".hero-line-1", { opacity: 0, y: 40, duration: 0.7 }, "-=0.3")
          .from(".hero-line-2", { opacity: 0, y: 40, duration: 0.7 }, "-=0.5")
          .from(
            ".hero-bottom-left",
            { opacity: 0, y: 20, duration: 0.6 },
            "-=0.4"
          )
          .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");

        // scroll out — fades and moves up as hero leaves viewport
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -60,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: document.body,
            start: "top top",
            end: "bottom 42%",
            scrub: 1,
          },
        });
      });

      return () => {
        mm.revert();
      };
      // entrance
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="container mx-auto px-4 lg:px-12 relative">
      <div className="md:min-h-[93vh] flex flex-col justify-center pt-32 pb-24 md:py-0 max-w-4xl">
        {/* Badge */}
        <div className="hero-badge mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          Available for work · Ho Chi Minh City
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
          <span className="hero-line-1 block text-muted-foreground">
            Hi, I'm <span className="text-foreground">Adrian Tran</span>
          </span>
          <span className="hero-line-2 block text-muted-foreground">
            I'm a <span className="text-foreground">Frontend Developer</span>
          </span>
        </h1>

        {/* Description + CTAs */}
        <div className="hero-bottom-left flex flex-col gap-6 max-w-lg">
          <p className="text-base text-muted-foreground leading-relaxed">
            I build scalable web applications — from API design to pixel-perfect
            UI. NestJS, Next.js, TypeScript, end to end.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll max-lg:hidden mt-12">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
