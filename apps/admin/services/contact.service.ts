import axiosInstance from './axios.config'
import type { Contact, CreateContactDto } from '@portfolio/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const contactService = {
  submit: (data: CreateContactDto): Promise<Contact> =>
    axiosInstance.post('/contacts', data),

  getAll: async (): Promise<Contact[]> => {
    const res = await fetch(`${API_URL}/contacts`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch contacts')
    return res.json()
  },

  markAsRead: (id: string): Promise<Contact> =>
    axiosInstance.patch(`/contacts/${id}/read`),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/contacts/${id}`),
}