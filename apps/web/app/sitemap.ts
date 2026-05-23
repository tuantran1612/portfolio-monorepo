import { MetadataRoute } from 'next'
import { projectService } from '@/services/project.service'

const BASE_URL = 'https://portfolio-monorepo-ten.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await projectService.getAll().catch(() => [])

  const projectUrls = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...projectUrls,
  ]
}