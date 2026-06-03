"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (isFirstRender.current) {
      // on first load — just fade content in
      isFirstRender.current = false;
      gsap.set(overlay, { scaleY: 0, transformOrigin: "top" });
      gsap.from(content, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
      return;
    }

    // on route change — wipe in then wipe out
    const tl = gsap.timeline();

    // overlay wipes down
    tl.set(overlay, { scaleY: 0, transformOrigin: "top" })
      .to(overlay, {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.inOut",
      })
      // content fades out during wipe
      .to(
        content,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "<"
      )
      // overlay wipes up revealing new content
      .set(overlay, { transformOrigin: "bottom" })
      .to(overlay, {
        scaleY: 0,
        duration: 0.4,
        ease: "power3.inOut",
      })
      // content fades in
      .fromTo(
        content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-primary pointer-events-none"
        style={{ transform: "scaleY(0)", transformOrigin: "top" }}
      />

      {/* Page content */}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
