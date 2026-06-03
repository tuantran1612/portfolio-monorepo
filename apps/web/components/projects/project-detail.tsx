// "use client";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link";
import type { Project } from "@portfolio/types";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const sanitizedContent = project.content
    ? DOMPurify.sanitize(project.content)
    : null;
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="secondary">{project.category.name}</Badge>
          {project.featured && (
            <Badge className="bg-amber-500/10 text-amber-600 border-0">
              Featured
            </Badge>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Hero image */}
      {project.imageUrl && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-10 border border-border/40">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      )}

      {/* Links + tech stack */}
      <div className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-border/40">
        <div className="flex flex-wrap gap-2 flex-1">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          {project.liveUrl && (
            <LinkButton href={project.liveUrl} target="_blank" size="sm">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Live demo
            </LinkButton>
          )}
          {project.repoUrl && (
            <LinkButton
              href={project.repoUrl}
              target="_blank"
              variant="outline"
              size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1.5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              Source code
            </LinkButton>
          )}
        </div>
      </div>

      {/* Rich content */}
      {sanitizedContent && (
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      )}
    </article>
  );
}
