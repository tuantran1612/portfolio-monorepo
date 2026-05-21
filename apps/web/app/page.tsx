import { projectService } from '@/services/project.service'
import { categoryService } from '@/services/category.service'
import { Hero } from '@/components/homepage/hero'
import { FeaturedProjects } from '@/components/homepage/featured-project'
import { CategoryBrowse } from '@/components/homepage/category-browse'
import { ShortBio } from '@/components/homepage/short-bio'

async function getFeaturedProjects() {
  try {
    return await projectService.getFeatured()
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [featuredProjects, categories] = await Promise.all([
    projectService.getFeatured().catch(() => []),
    categoryService.getAll().catch(() => []),
  ])

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <CategoryBrowse categories={categories} />
      <ShortBio />
    </>
  )
}