import axiosInstance from './axios.config'
import type { LoginDto, AuthResponse } from '@portfolio/types'

export const authService = {
  login: (data: LoginDto): Promise<AuthResponse> =>
    axiosInstance.post('/auth/login', data),
}