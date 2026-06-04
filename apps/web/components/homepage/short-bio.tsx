"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "@/components/ui/link";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "3+", label: "years of experience" },
  { num: "10+", label: "projects shipped" },
  { num: "5", label: "core technologies" },
];

export function ShortBio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bio-left", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: document.body,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".bio-stat", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: document.body,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-foreground ">
      <div className=" md:px-12 py-16 container mx-auto px-6 text-background grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div className="bio-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-background/20" />
            <span className="font-mono text-sm md:text-base text-background/40">
              About me
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5 text-background">
            Mid-level engineer
            <br />
            based in Ho Chi Minh
            <br />
            City, Vietnam.
          </h2>
          <p className="text-sm text-background/60 leading-relaxed mb-6 max-w-sm">
            I specialise in full stack development — from API architecture to
            polished UIs. I care about clean code, fast delivery, and products
            that work for real users.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-background border border-background/20 rounded-full px-5 py-2.5 hover:bg-background/10 transition-colors">
            More about me ↗
          </a>
        </div>

        {/* Right — stats */}
        <div className="flex gap-0">
          {stats.map((stat) => (
            <div
              key={stat.num}
              className="bio-stat border-r last:border-r-0 border-background/10 px-6">
              <div className="text-4xl font-bold tracking-tight text-background mb-1">
                {stat.num}
              </div>
              <div className="font-mono text-base text-background/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
