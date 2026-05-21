import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@portfolio/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.length > 0 ? (
        <section className="py-12 featuredWrapper">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Featured Projects <sub>({projects.length})</sub>
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  A selection of my recent work
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/projects">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
