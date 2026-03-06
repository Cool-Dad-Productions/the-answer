import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [],
} satisfies NextAuthConfig
