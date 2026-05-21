import axiosInstance from './axios.config'
import type { Project, CreateProjectDto, UpdateProjectDto } from '@portfolio/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const projectService = {
  getAll: async (category?: string, featured?: boolean): Promise<Project[]> => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (featured !== undefined) params.append('featured', String(featured))
    const query = params.toString()
    const res = await fetch(`${API_URL}/projects${query ? `?${query}` : ''}`, {
      next: { revalidate: 30 },
    })
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },

  getFeatured: async (): Promise<Project[]> => {
    const res = await fetch(`${API_URL}/projects?featured=true`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch featured projects')
    return res.json()
  },

  getOne: (id: string): Promise<Project> =>
    axiosInstance.get(`/projects/${id}`),

  create: (data: CreateProjectDto): Promise<Project> =>
    axiosInstance.post('/projects', data),

  update: (id: string, data: UpdateProjectDto): Promise<Project> =>
    axiosInstance.patch(`/projects/${id}`, data),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/projects/${id}`),
}