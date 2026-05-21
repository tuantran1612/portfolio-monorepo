"use client";

import { useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDeleteProject } from "@/hooks/useProjects";
import type { Project } from "@portfolio/types";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
}

export function ProjectTable({ projects, onEdit }: ProjectTableProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    deleteProject(id, {
      onSettled: () => setDeletingId(null),
    });
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-border/50 rounded-xl">
        <p>No projects yet.</p>
      </div>
    );
  }
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border/50">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Title
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Category
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Tech stack
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Featured
            </th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr
              key={project.id}
              className={cn(
                "border-b border-border/30 transition-colors hover:bg-muted/30",
                i === projects.length - 1 && "border-b-0",
              )}
            >
              <td className="px-4 py-3">
                <p className="font-medium">{project.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {project.description}
                </p>
              </td>
              <td className="px-4 py-3">
                <Badge variant="secondary" className="text-xs">
                  {project.category.name}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1 max-w-48">
                  {project.techStack.slice(0, 3).map((tech) => {
                    return (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    );
                  })}
                </div>
              </td>
              <td className="px-4 py-3">
                {project.featured && (
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(project)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
