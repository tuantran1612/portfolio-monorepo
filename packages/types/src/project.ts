import type { Category } from './category'

export interface Project {
  id: string
  title: string
  description: string
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
  description: string
  categoryId: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export type UpdateProjectDto = Partial<CreateProjectDto>