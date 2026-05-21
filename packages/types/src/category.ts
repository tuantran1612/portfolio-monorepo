export interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
  _count?: {
    projects: number
  }
}

export type CreateCategoryDto = {
  name: string
  slug?: string  // optional — auto-generated if not provided
}

export type UpdateCategoryDto = {
  name?: string
  slug?: string
}