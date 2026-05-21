export interface Contact {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export type CreateContactDto = Omit<Contact, 'id' | 'read' | 'createdAt'>