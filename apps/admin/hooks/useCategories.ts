import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import type { CreateCategoryDto, UpdateCategoryDto } from '@portfolio/types'
import { toast } from 'sonner'

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_KEYS.all,
    queryFn: () => categoryService.getAll(),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all })
      toast.success('Category created')
    },
    onError: () => toast.error('Failed to create category'),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all })
      toast.success('Category updated')
    },
    onError: () => toast.error('Failed to update category'),
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => categoryService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all })
      toast.success('Category deleted')
    },
    onError: (error: any) => toast.error(error.message || 'Failed to delete category'),
  })
}

export function useSeedCategories() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => categoryService.seed(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all })
      toast.success('Categories seeded')
    },
    onError: () => toast.error('Failed to seed categories'),
  })
}