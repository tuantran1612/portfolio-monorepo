import { projectService } from '@/services/project.service'
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
  const featuredProjects = await getFeaturedProjects()

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <CategoryBrowse />
      <ShortBio />
    </>
  )
}