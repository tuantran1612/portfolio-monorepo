"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => router.push("/projects")}
      className={`fixed bottom-8 left-6 md:left-12 z-50 flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-full border border-border/50 bg-background/90 backdrop-blur text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
      <ArrowLeft className="h-3 w-3" />
      Back
    </button>
  );
}
