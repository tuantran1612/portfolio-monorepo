import axiosInstance from './axios.config'
import type { Contact, CreateContactDto } from '@portfolio/types'

export const contactService = {
  submit: (data: CreateContactDto): Promise<Contact> =>
    axiosInstance.post('/contacts', data),

  getAll: (): Promise<Contact[]> =>
    axiosInstance.get('/contacts'),

  markAsRead: (id: string): Promise<Contact> =>
    axiosInstance.patch(`/contacts/${id}/read`),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/contacts/${id}`),
}