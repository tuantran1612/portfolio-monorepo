import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactService } from '@/services/contact.service'
import { toast } from 'sonner'

export const CONTACT_KEYS = {
  all: ['contacts'] as const,
}

export function useContacts() {
  return useQuery({
    queryKey: CONTACT_KEYS.all,
    queryFn: () => contactService.getAll(),
  })
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => contactService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.all })
      toast.success('Marked as read')
    },
    onError: () => toast.error('Failed to update'),
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => contactService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.all })
      toast.success('Contact deleted')
    },
    onError: () => toast.error('Failed to delete'),
  })
}