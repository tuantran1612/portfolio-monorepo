export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'staff'
  createdAt: string
}

export type CreateUserDto = {
  name: string
  email: string
  password: string
  role: 'admin' | 'staff'
}