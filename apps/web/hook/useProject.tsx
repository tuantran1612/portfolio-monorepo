import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectService } from '@/services/project.service'
import type { CreateProjectDto, UpdateProjectDto } from '@portfolio/types'

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  filtered: (category?: string, featured?: boolean) =>
    ['projects', { category, featured }] as const,
  detail: (id: string) => ['projects', id] as const,
}

export function useProjects(category?: string, featured?: boolean) {
  return useQuery({
    queryKey: PROJECT_KEYS.filtered(category, featured),
    queryFn: () => projectService.getAll(category, featured),
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: PROJECT_KEYS.filtered(undefined, true),
    queryFn: () => projectService.getFeatured(),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => projectService.getOne(id),
    enabled: !!id,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => projectService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  })
}