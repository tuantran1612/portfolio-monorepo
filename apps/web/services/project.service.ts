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
  getOne: async (id: string): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects/${id}`);

    if (!res.ok) {
      throw new Error("Project not found");
    }

    return res.json();
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
  getProjectNavigation: async (currentSlug: string) => {
    const res = await fetch(`${API_URL}/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        prevProject: null,
        nextProject: null,
      };
    }

    const projects: Project[] = await res.json();

    const sortedProjects = [...projects].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const currentIndex = sortedProjects.findIndex(
      (p) => p.slug === currentSlug
    );

    if (currentIndex === -1) {
      return {
        prevProject: null,
        nextProject: null,
      };
    }

    const prevIndex =
      currentIndex === 0
        ? sortedProjects.length - 1
        : currentIndex - 1;

    const nextIndex =
      (currentIndex + 1) % sortedProjects.length;

    return {
      prevProject: sortedProjects[prevIndex],
      nextProject: sortedProjects[nextIndex],
    };
  },
  create: (data: CreateProjectDto): Promise<Project> =>
    axiosInstance.post('/projects', data),

  update: (id: string, data: UpdateProjectDto): Promise<Project> =>
    axiosInstance.patch(`/projects/${id}`, data),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/projects/${id}`),
}
