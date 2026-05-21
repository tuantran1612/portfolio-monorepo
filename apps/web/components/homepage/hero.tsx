import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="py-24 md:py-32 lg:pt-64 lg:pb-32 lg:min-h-[100vh] heroImgWrapper">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="text-xs border-0 px-0 text-green-500 mb-0"
            >
              Available for work
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Hi, I'm <span className="text-primary">Tuan Tran</span>
              <br />
              Front-end Developer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            I build scalable web applications with modern technologies.
            Passionate about clean code, great UX, and solving real problems.
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {[
              "NestJS",
              "Next.js",
              "TypeScript",
              "MongoDB",
              "Docker",
              "Prisma",
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
