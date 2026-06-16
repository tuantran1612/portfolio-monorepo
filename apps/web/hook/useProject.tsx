import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import type {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from "@portfolio/types";

export const PROJECT_KEYS = {
  all: ["projects"] as const,
  filtered: (category?: string, featured?: boolean) =>
    ["projects", { category }] as const,
  detail: (id: string) => ["projects", id] as const,
};

export function useProjects(category?: string, initialData?: Project[]) {
  return useQuery({
    queryKey: PROJECT_KEYS.filtered(category),
    queryFn: () => projectService.getAllClient(category),
    initialData: !category ? initialData : undefined,
    staleTime: 30 * 1000,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: PROJECT_KEYS.filtered(undefined, true),
    queryFn: () => projectService.getFeatured(),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => projectService.getOne(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectService.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectService.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all }),
  });
}
