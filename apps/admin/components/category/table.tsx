"use client";

import { useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDeleteCategory } from "@/hooks/useCategories";
import type { Category } from "@portfolio/types";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
}

export function CategoryTable({ categories, onEdit }: CategoryTableProps) {
  const { mutate: deleteProject, isPending } = useDeleteCategory();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setDeletingId(id);
    deleteProject(id, {
      onSettled: () => setDeletingId(null),
    });
  }

  if (categories.length === 0) {
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
              Name
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Projects
            </th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr
              key={category.id}
              className={cn(
                "border-b border-border/30 transition-colors hover:bg-muted/30",
                i === categories.length - 1 && "border-b-0",
              )}
            >
              <td className="px-4 py-3">
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {category.slug}
                </p>
              </td>
              <td className="px-4 py-3">
                {category._count?.projects && (
                    category._count.projects
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(category)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
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
