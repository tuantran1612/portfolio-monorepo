import axios from 'axios'
import Cookies from 'js-cookie'

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
    const message = error.response?.data?.message || 'Something went wrong'
    if (error.response?.status === 401) {
      Cookies.remove('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(new Error(message))
  }
)

export default axiosInstance