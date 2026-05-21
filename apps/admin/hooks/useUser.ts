import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import type { CreateUserDto } from '@portfolio/types'
import { toast } from 'sonner'

export const USER_KEYS = {
  all: ['users'] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: () => userService.getAll(),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all })
      toast.success('User created')
    },
    onError: () => toast.error('Failed to create user'),
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => userService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all })
      toast.success('User deleted')
    },
    onError: () => toast.error('Failed to delete user'),
  })
}