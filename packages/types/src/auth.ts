export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    role: string
  }
}