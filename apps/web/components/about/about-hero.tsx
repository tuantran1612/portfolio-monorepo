"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const BIO_IMAGE = "/image-bio-about.png";
export function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(".about-hero-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".about-hero-meta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: ref }
  );
  useGSAP(() => {
    if (!introRef.current) return;

    gsap.to(introRef.current, {
      opacity: 0,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: introRef.current,
        start: "top top",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });

  return (
    <div
      ref={ref}
      className="px-6 md:px-12 pt-16 pb-4 md:pt-0 lg:h-[92vh] lg:pb-0">
      <div
        ref={introRef}
        className="relative h-full flex flex-col justify-end lg:max-w-xl">
        <div className="bio-image-wrap relative mb-4">
          <div className="relative w-full aspect-square max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl">
            <Image
              src={BIO_IMAGE}
              alt="Tuan Tran"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="flex items-end max-md:justify-center justify-between flex-wrap gap-4">
          <h1 className="about-hero-title text-[clamp(48px,8vw,96px)] text-sub font-bold leading-none tracking-tight">
            <span className="text-primary">Adrian</span> Tran
          </h1>
        </div>
      </div>
    </div>
  );
}
