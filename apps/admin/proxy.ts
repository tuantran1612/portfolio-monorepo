import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isRoot = request.nextUrl.pathname === '/'

  // redirect root to dashboard or login
  if (isRoot) {
    if (token) return NextResponse.redirect(new URL('/dashboard', request.url))
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // redirect to login if no token and trying to access dashboard
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // redirect to dashboard if already logged in and visiting login
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login'],
}