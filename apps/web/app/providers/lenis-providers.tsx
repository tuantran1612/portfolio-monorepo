"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // critical — use ScrollTrigger's scroll position not window scroll
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
    });

    // use gsap ticker to drive lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // tell ScrollTrigger to use lenis scroll position
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.scrollerProxy(document.body, undefined as any);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", () => lenis.resize());
    };
  }, []);

  return <>{children}</>;
}
