"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function AboutCta() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          scroller: document.body,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="px-6 md:px-12 py-20 bg-foreground text-background">
      <div className="cta-content max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-background mb-6">
          Have a project in mind?
          <br />
          <span className="text-primary">Let's build it together.</span>
        </h2>

        <p className="text-base text-background/60 leading-relaxed mb-8 max-w-md">
          I'm currently available for freelance work and full-time
          opportunities. Feel free to reach out — I'd love to hear about your
          project.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-full bg-background text-foreground hover:bg-background/90 transition-colors font-medium">
            Get in touch
          </Link>
          <a
            href="mailto:thatuan.1612@gmail.com"
            className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-full border border-background/20 text-background hover:bg-background/10 transition-colors">
            thatuan.1612@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
