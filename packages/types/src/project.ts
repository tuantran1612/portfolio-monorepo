import type { Category } from './category'

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  category: Category
  categoryId: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type CreateProjectDto = {
  title: string
  slug?: string
  description: string
  content?: string
  categoryId: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export type UpdateProjectDto = Partial<CreateProjectDto>