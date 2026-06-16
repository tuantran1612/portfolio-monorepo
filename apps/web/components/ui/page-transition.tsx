"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const header = document.querySelector("header");

    if (isFirstRender.current) {
      isFirstRender.current = false;

      gsap.set(overlay, { scaleY: 0, transformOrigin: "top" });

      const targets = header ? [content, header] : [content];

      gsap.from(targets, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
        onComplete: () => {
          gsap.set(targets, { clearProps: "all" });
        },
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([content, ...(header ? [header] : [])], { clearProps: "all" });
      },
    });

    tl.set(overlay, { scaleY: 0, transformOrigin: "top" })
      .to(overlay, { scaleY: 1, duration: 0.4, ease: "power3.inOut" })
      .to(content, { opacity: 0, duration: 0.2, ease: "power2.in" }, "<");

    if (header) {
      tl.to(header, { opacity: 0, duration: 0.2, ease: "power2.in" }, "<");
    }

    tl.add(() => {
      setDisplayChildren(children);
    })
      .set(overlay, { transformOrigin: "bottom" })
      .to(overlay, { scaleY: 0, duration: 0.4, ease: "power3.inOut" })
      .fromTo(
        content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

    if (header) {
      tl.to(header, { opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.1");
    }

    return () => {
      tl.kill();
      // if tl is killed mid-animation, restore visibility
      gsap.set([content, ...(header ? [header] : [])], { clearProps: "all" });
    };
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-primary pointer-events-none"
        style={{ transform: "scaleY(0)", transformOrigin: "top" }}
      />
      <div ref={contentRef}>{displayChildren}</div>
    </>
  );
}
