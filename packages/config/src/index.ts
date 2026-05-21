export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const ENDPOINTS = {
  // public
  projects: `${API_URL}/projects`,
  contact: `${API_URL}/contacts`,
  // admin
  auth: {
    login: `${API_URL}/auth/login`,
    seed: `${API_URL}/auth/seed`,
  },
} as const