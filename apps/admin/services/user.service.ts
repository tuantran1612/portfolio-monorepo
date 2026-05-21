import axiosInstance from './axios.config'
import type { User, CreateUserDto } from '@portfolio/types'

export const userService = {
  getAll: (): Promise<User[]> =>
    axiosInstance.get('/users'),

  create: (data: CreateUserDto): Promise<User> =>
    axiosInstance.post('/users', data),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/users/${id}`),
}