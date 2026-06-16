"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// replace with your actual Cloudinary URL after upload

export function AboutBio() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // image clip-path reveal — same as tamakiyoshida
      gsap.from(".bio-image-wrap", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          scroller: document.body,
          start: "top 80%",
          once: true,
        },
      });

      // text stagger after image
      gsap.from(".bio-text-item", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          scroller: document.body,
          start: "top 70%",
          once: true,
        },
        delay: 0.3,
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="px-6 md:px-12 pt-0 pb-12 lg:pt-6 lg:pb-24 border-b border-border/40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:gap-20 items-start lg:max-w-md xl:max-w-xl lg:ml-auto">
          {/* Right — bio text */}
          <div className="flex flex-col grid-cols-2 gap-4">
            <div className="bio-text-item max-lg:hidden">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                About Me
              </h2>
            </div>
            <p className="bio-text-item max-md:text-center text-base xl:text-lg text-muted-foreground leading-relaxed">
              Creating intuitive experiences from complex ideas is what drives
              me every day as a Frontend Developer.
            </p>
            <p className="bio-text-item max-md:text-center text-base xl:text-lg text-muted-foreground leading-relaxed">
              I focus on building websites and SaaS products with a strong
              product mindset, balancing visual design, user experience, and
              scalable architecture. I believe great design is more than
              aesthetics—it should solve problems, simplify interactions, and
              support long-term business growth.
            </p>
            <p className="bio-text-item max-md:text-center text-base xl:text-lg text-muted-foreground leading-relaxed">
              For me, every project is an opportunity to research, learn, and
              refine ideas. By understanding the core needs of users and
              stakeholders, I strive to create solutions that not only meet
              expectations but deliver value beyond them.
            </p>
            <div className="bio-text-item max-md:text-center">
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                Download CV ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
