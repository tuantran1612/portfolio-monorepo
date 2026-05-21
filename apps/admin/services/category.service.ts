import axiosInstance from './axios.config'
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '@portfolio/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  },

  create: (data: CreateCategoryDto): Promise<Category> =>
    axiosInstance.post('/categories', data),

  update: (id: string, data: UpdateCategoryDto): Promise<Category> =>
    axiosInstance.patch(`/categories/${id}`, data),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/categories/${id}`),

  seed: (): Promise<{ message: string; count: number }> =>
    axiosInstance.post('/categories/seed'),
}