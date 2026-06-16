"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { LinkButton } from "@/components/ui/link";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "3+", label: "years of experience" },
  { num: "10+", label: "projects shipped" },
  { num: "5", label: "core technologies" },
];
type SplitRef = {
  wordSplit: SplitText;
};
const config = {
  colorInitial: "#1e1e1e",
  colorAccent: "#bbbbbb",
  colorFinal: "#ffffff",
  pinned: false,
  pinStart: "center center",
  pinEnd: "bottom 50%",
  stagger: 0.1,
};
export function ShortBio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitRef[]>([]);
  const lastScrollProgress = useRef(0);
  const colorTransitionTimer = useRef(new Map());
  const completeWords = useRef(new Set());
  useGSAP(
    () => {
      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;
      if (!sectionRef.current) return;

      splitRefs.current = [];
      lastScrollProgress.current = 0;
      colorTransitionTimer.current.forEach((timer) => clearTimeout(timer));
      colorTransitionTimer.current.clear();
      completeWords.current.clear();

      let elements = [];
      if (!isMobile) {
        if (sectionRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(sectionRef.current.children);
        } else {
          elements = [sectionRef.current];
        }

        elements.forEach((ele) => {
          const wordSplit = SplitText.create(ele, {
            type: "words",
            wordClass: "word",
          });
          splitRefs.current.push({ wordSplit });
        });

        const allWords: HTMLElement[] = splitRefs.current.flatMap(
          ({ wordSplit }) => wordSplit.words as HTMLElement[]
        );
        gsap.set(allWords, { color: config.colorInitial });

        const scheduleFinalTransition = (word: HTMLElement, index: number) => {
          const existingTimer = colorTransitionTimer.current.get(index);

          if (existingTimer) {
            clearTimeout(existingTimer);
          }

          const timer = setTimeout(() => {
            if (!completeWords.current.has(index)) {
              gsap.to(word, {
                duration: 0.05,
                ease: "none",
                color: config.colorFinal,
                onComplete: () => {
                  completeWords.current.add(index);
                },
              });
            }

            colorTransitionTimer.current.delete(index);
          }, 0);

          colorTransitionTimer.current.set(index, timer);
        };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: config.pinned ? config.pinStart : "top 80%",
          end: config.pinned ? config.pinEnd : "top 20%",
          scrub: 1,
          pin: config.pinned,
          pinSpacing: config.pinned,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalWords = allWords.length;
            const isScrollingdown = progress >= lastScrollProgress.current;
            const currentWordIndex = Math.floor(progress * totalWords);

            allWords.forEach((word, index) => {
              if (!isScrollingdown && index >= currentWordIndex) {
                if (colorTransitionTimer.current.has(index)) {
                  clearTimeout(colorTransitionTimer.current.get(index));
                  colorTransitionTimer.current.delete(index);
                }
                completeWords.current.delete(index);
                gsap.set(word, {
                  color: config.colorInitial,
                });
                return;
              }
              if (completeWords.current.has(index)) {
                return;
              }
              if (index <= currentWordIndex) {
                gsap.set(word, { color: config.colorAccent });
                if (!colorTransitionTimer.current.has(index)) {
                  scheduleFinalTransition(word, index);
                }
              } else {
                gsap.set(word, { color: config.colorInitial });
              }
            });
            lastScrollProgress.current = progress;
          },
        });
        gsap.fromTo(
          ".bio-right",
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 50%",
              scrub: 1, // ties animation to scroll position
            },
          }
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [
        config.colorInitial,
        config.colorAccent,
        config.colorFinal,
        config.pinned,
        config.pinStart,
        config.pinEnd,
      ],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-foreground lg:h-pin relative"
      data-copy-wrapper="true">
      <div className=" md:px-12 py-16 lg:py-32 h-full flex container mx-auto px-6 max-lg:flex-col text-background gap-8 items-center">
        {/* Left */}
        <div className="bio-left relative z-20 max-w-4xl max-lg:order-2">
          <h2 className="text-2xl lg:text-4xl text-background leading-8 lg:leading-11 mb-6">
            I design and build digital products that are fast, intuitive, and
            built to scale. My focus is on frontend development, product
            thinking, and creating experiences users genuinely enjoy. And when
            my user's happy,I always have fun on it.
          </h2>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-background border border-background/20 rounded-sm px-5 py-2.5 hover:bg-background/10 transition-colors">
            More about me ↗
          </Link>
        </div>

        {/* Right — stats */}
        <div className="flex gap-0">
          <div className="max-lg:order-1 mb-4 lg:absolute lg:top-[-120px] right-50 bottom-0 flex items-center m-auto z-10 bio-right">
            <Image
              className="rounded-2xl block m-auto lg:w-[500px] lg:h-[450px]"
              width="400"
              height="350"
              src="/image-bio-about.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
