import { pool } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const hash = await bcrypt.hash(password as string, 12)
  try {
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hash],
    )
    return Response.json({ ok: true })
  } catch (e: unknown) {
    const pgError = e as { code?: string }
    if (pgError.code === '23505') {
      return Response.json({ error: 'An account with that email already exists' }, { status: 409 })
    }
    return Response.json({ error: 'Sign up failed' }, { status: 500 })
  }
}
