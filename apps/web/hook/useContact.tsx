import { useMutation } from '@tanstack/react-query'
import { contactService } from '@/services/contact.service'
import type { CreateContactDto } from '@portfolio/types'

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: CreateContactDto) => contactService.submit(data),
  })
}