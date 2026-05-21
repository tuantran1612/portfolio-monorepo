export interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
  _count?: {
    projects: number
  }
}

export type CreateCategoryDto = Omit<Category, 'id' | 'createdAt' | '_count'>
export type UpdateCategoryDto = Partial<CreateCategoryDto>