"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link";
import type { Project } from "@portfolio/types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectFeatured({ project }: ProjectCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".project__card-featured");
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: document.body, // use body as scroller for lenis
          start: "top top",
          end: `+=${cards.length * 400}`,
          pin: true,
          pinType: "transform", // use transform not fixed for lenis compat
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1, // prevents jump when pin starts
        },
      });

      cards.forEach((card) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    },
    { scope: sectionRef, dependencies: [] }
  );
  return (
    <Card className="flex flex-col h-full relative z-10 duration-300 project__card-featured gap-4">
      <Link
        className="absolute top-0 bottom-0 left-0 right-0 z-20"
        href={`/projects/${project.slug}`}></Link>
      {project.imageUrl ? (
        <div className="aspect-video overflow-hidden rounded-t-lg relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/30">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
      <CardHeader className="pb-2 px-0">
        <div className="flex flex-col items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs rounded-md">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="outline" className="text-xs rounded-md">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
