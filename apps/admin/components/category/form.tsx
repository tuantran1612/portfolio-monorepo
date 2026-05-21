"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Category } from "@portfolio/types";

const categorySchema = z.object({
  name: z.string().min(3, "Name category must be at least 3 characters"),
  slug: z.string().min(1, "Slug is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  defaultValues?: Partial<Category>;
  onSubmit: (values: CategoryFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  isPending,
  onCancel,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      slug: defaultValues?.slug || "",
    },
  });

  function handleFormSubmit(values: CategoryFormValues) {
    onSubmit({
      ...values,
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
            placeholder="My awesome category"
            {...register("name")}
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            placeholder="Define the link category of project"
           {...register("slug")}
            className={cn(errors.slug && "border-destructive")}
          />
          {errors.slug && (
            <p className="text-xs text-destructive">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Category"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
