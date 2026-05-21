import axiosInstance from "./axios.config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const categoryService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  },
}
