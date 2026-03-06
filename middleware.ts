import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isAuthed = !!req.auth
  const { pathname } = req.nextUrl

  if (!isAuthed && !pathname.startsWith('/auth') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
  if (isAuthed && (pathname.startsWith('/auth') || pathname === '/')) {
    return NextResponse.redirect(new URL('/app', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
