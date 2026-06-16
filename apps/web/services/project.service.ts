import axiosInstance from "./axios.config";
import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from "@portfolio/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const projectService = {
  getFeatured: async (): Promise<Project[]> => {
    const res = await fetch(`${API_URL}/projects?featured=true`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch featured projects')
    return res.json()
  },

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

  // client-side version for filtering
  getAllClient: (category?: string): Promise<Project[]> => {
    const params: Record<string, string> = {}
    if (category) params.category = category
    return axiosInstance.get('/projects', { params })
  },

  getBySlug: async (slug: string): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects/slug/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Project not found')
    return res.json()
  },

  getRelated: async (categorySlug: string, excludeSlug: string): Promise<Project[]> => {
    const res = await fetch(`${API_URL}/projects?category=${categorySlug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const projects: Project[] = await res.json()
    return projects.filter((p) => p.slug !== excludeSlug).slice(0, 3)
  },
}
