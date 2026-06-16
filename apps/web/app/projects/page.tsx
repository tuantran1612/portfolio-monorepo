import { Skeleton } from "@/components/ui/skeleton";
import { categoryService } from "@/services/category.service";
import { projectService } from "@/services/project.service";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Projects",
  description:
    "A collection of projects built by Tuan Tran — full stack developer.",
};
const ProjectsClient = dynamic(
  () =>
    import("@/components/projects/project-client").then((m) => ({
      default: m.ProjectsClient,
    })),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-video rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    ),
  }
);
export default async function ProjectsPage() {
  const [initialProjects, categories] = await Promise.all([
    projectService.getAll().catch(() => []),
    categoryService.getAll().catch(() => []),
  ]);

  return (
    <ProjectsClient initialProjects={initialProjects} categories={categories} />
  );
}
