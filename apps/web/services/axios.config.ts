import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong'

    if (typeof window !== 'undefined') {
      switch (status) {
        case 401:
          Cookies.remove('access_token')
          window.location.href = '/login'
          break
        case 403:
          toast.error('Access denied', {
            description: 'You do not have permission to perform this action',
          })
          break
        case 404:
          toast.error('Not found', {
            description: message,
          })
          break
        case 429:
          toast.error('Too many requests', {
            description: 'Please slow down and try again shortly',
          })
          break
        case 500:
          toast.error('Server error', {
            description: 'Something went wrong on our end. Please try again.',
          })
          break
        default:
          if (status >= 400) {
            toast.error('Error', { description: message })
          }
      }
    }

    return Promise.reject(new Error(message))
  }
)

export default axiosInstance