import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import PgAdapter from '@auth/pg-adapter'
import { pool } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PgAdapter(pool),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { rows } = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials.email],
        )
        const user = rows[0]
        if (!user?.password) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        return valid ? user : null
      },
    }),
  ],
})
