import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "../ui/link";
import { Category } from "@portfolio/types";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
      {/* Image */}
      {project.imageUrl ? (
        <div className="aspect-video overflow-hidden rounded-t-lg relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
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

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">
            {project.title}
          </h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {project.category.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        {project.liveUrl && (
          <LinkButton
            href={project.liveUrl!}
            size="sm"
            className="flex-1"
            target="_blank"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Live
          </LinkButton>
        )}
        {project.repoUrl && (
          <LinkButton
            href={project.repoUrl!}
            variant="outline"
            size="sm"
            className="flex-1"
            target="_blank"
          >
            Code
          </LinkButton>
        )}
      </CardFooter>
    </Card>
  );
}
