import { categoryService } from '@/services/category.service'
import { ProjectsClient } from '@/components/projects/project-client'
import { projectService } from '@/services/project.service'

export default async function ProjectsPage() {
  const [initialProjects, categories] = await Promise.all([
    projectService.getAll().catch(() => []),
    categoryService.getAll().catch(() => []),
  ])

  return (
    <ProjectsClient
      initialProjects={initialProjects}
      categories={categories}
    />
  )
}