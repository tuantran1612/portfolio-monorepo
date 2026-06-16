import { notFound } from "next/navigation";
import { projectService } from "@/services/project.service";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { Project } from "@portfolio/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await projectService.getBySlug(slug);
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.imageUrl ? [{ url: project.imageUrl }] : [],
      },
    };
  } catch {
    return { title: "Project not found" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await projectService.getBySlug(slug);
  } catch {
    notFound();
  }

  const [related, nextProject] = await Promise.all([
    projectService
      .getRelated(project.category.slug, slug)
      .catch(() => [] as Project[]),
    projectService.getNextProject(slug).catch(() => null),
  ]);
  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectDetail
        project={project}
        related={related}
        nextProject={nextProject}
      />
    </>
  );
}
