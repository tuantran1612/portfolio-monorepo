import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import type { LoginDto } from '@portfolio/types'

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: (res) => {
      localStorage.setItem('access_token', res.access_token)
      router.push('/dashboard')
    },
  })
}