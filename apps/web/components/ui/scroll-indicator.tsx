"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ScrollIndicator() {
  useGSAP(() => {
    gsap.to(".cursor", {
      y: 8,
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
  return (
    <div className="absolute bottom-[15px] left-[50%] flex flex-col items-center gap-2">
      {/* outer ring */}
      <div
        className="w-5 h-7 rounded-full mouse border-2 border-current flex items-start justify-center pt-2"
        style={{ color: "hsl(var(--muted-foreground))" }}>
        {/* inner dot that bounces */}
        <div className="w-1 h-1 rounded-full bg-current cursor" />
      </div>
    </div>
  );
}
