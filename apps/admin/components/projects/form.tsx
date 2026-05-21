"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";
import type { Project } from "@portfolio/types";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean(), // remove .default(false) — handle in defaultValues instead
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  defaultValues?: Partial<Project>;
  onSubmit: (values: ProjectFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
}

export function ProjectForm({
  defaultValues,
  onSubmit,
  isPending,
  onCancel,
}: ProjectFormProps) {
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      categoryId: defaultValues?.categoryId || "",
      techStack: defaultValues?.techStack?.join(", ") || "",
      imageUrl: defaultValues?.imageUrl || "",
      liveUrl: defaultValues?.liveUrl || "",
      repoUrl: defaultValues?.repoUrl || "",
      featured: defaultValues?.featured ?? false, // always boolean never undefined
    },
  });

  function handleFormSubmit(values: ProjectFormValues) {
    onSubmit({
      ...values,
      techStack: values.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .join(", ") as any,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="My awesome project"
            {...register("title")}
            className={cn(errors.title && "border-destructive")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Category</label>
          <select
            {...register("categoryId")}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              errors.categoryId && "border-destructive",
            )}
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          placeholder="Describe your project..."
          className={cn(
            "min-h-24 resize-none",
            errors.description && "border-destructive",
          )}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Tech stack</label>
        <Input
          placeholder="Next.js, TailwindCSS, TypeScript"
          {...register("techStack")}
          className={cn(errors.techStack && "border-destructive")}
        />
        <p className="text-xs text-muted-foreground">Comma separated values</p>
        {errors.techStack && (
          <p className="text-xs text-destructive">{errors.techStack.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Image URL</label>
          <Input placeholder="https://..." {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-xs text-destructive">
              {errors.imageUrl.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Live URL</label>
          <Input placeholder="https://..." {...register("liveUrl")} />
          {errors.liveUrl && (
            <p className="text-xs text-destructive">{errors.liveUrl.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Repo URL</label>
          <Input
            placeholder="https://github.com/..."
            {...register("repoUrl")}
          />
          {errors.repoUrl && (
            <p className="text-xs text-destructive">{errors.repoUrl.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          {...register("featured")}
          className="w-4 h-4 rounded border-input"
        />
        <label
          htmlFor="featured"
          className="text-sm font-medium cursor-pointer"
        >
          Featured project
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save project"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
