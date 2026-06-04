"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: "01",
    title: "Frontend Development",
    description:
      "Building modern web applications with a focus on scalability, maintainability, and performance. From responsive layouts to reusable component architectures, every detail is crafted to deliver a seamless experience across all devices.",
  },
  {
    num: "02",
    title: "Motion & Interaction",
    description:
      "Designing meaningful animations and interactive experiences that guide users naturally through a product. Smooth transitions, micro-interactions, and scroll-based effects are used to create interfaces that feel engaging and intuitive.",
  },
  {
    num: "03",
    title: "Optimization",
    description:
      "Creating fast, accessible, and search-friendly websites that perform reliably in real-world conditions. From Core Web Vitals and SEO best practices to accessibility standards, every project is optimized for both users and businesses.",
  },
];

export function Values() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".value-row").forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 50%",
          end: "bottom 50%",
          toggleClass: "is-visible",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="values-header flex items-start justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
            What I can
            <br />
            <em className="font-light text-muted-foreground not-italic">
              help you with
            </em>
          </h2>
          <span className="font-mono text-xs text-muted-foreground mt-2">
            02 · services
          </span>
        </div>

        {/* List */}
        <div className="value-list flex flex-col">
          {values.map((value) => (
            <div
              key={value.num}
              className="value-row grid grid-cols-[56px_1fr_40px] md:grid-cols-[64px_1fr_48px] items-start gap-6  group transition-all duration-200 mb-4 lg:mb-0">
              <div className="value-block relative">
                {/* Number */}
                <span className="font-mono value-num text-lg font-medium text-border absolute pt-1">
                  {value.num}
                </span>
                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {value.title}
                  </h3>
                  <p className="text-base opacity-70 leading-relaxed max-w-lg mb-4">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
