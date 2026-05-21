import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import axiosInstance from '@/services/axios.config'
import type { LoginDto } from '@portfolio/types'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: (res) => {
      Cookies.set('access_token', res.access_token, { expires: 7 })
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.access_token}`
      toast.success('Welcome back!')
      router.push('/dashboard')
    },
    onError: () => {
      toast.error('Invalid email or password')
    },
  })
}

export function useLogout() {
  const router = useRouter()

  return () => {
    Cookies.remove('access_token')
    router.push('/login')
  }
}