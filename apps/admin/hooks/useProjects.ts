import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectService } from '@/services/project.service'
import type { CreateProjectDto, UpdateProjectDto } from '@portfolio/types'
import { toast } from 'sonner'

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  detail: (id: string) => ['projects', id] as const,
}

export function useProjects() {
  return useQuery({
    queryKey: PROJECT_KEYS.all,
    queryFn: () => projectService.getAll(),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      toast.success('Project created')
    },
    onError: () => toast.error('Failed to create project'),
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      toast.success('Project updated')
    },
    onError: () => toast.error('Failed to update project'),
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => projectService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      toast.success('Project deleted')
    },
    onError: () => toast.error('Failed to delete project'),
  })
}