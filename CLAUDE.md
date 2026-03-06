# The Answer — Project Notes

## What it is
NBA & WNBA natural language stats search app. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Radix UI. Deployed on Vercel.

## Package manager
pnpm — do not use npm.

## Auth
Uses Auth.js v5 (next-auth@beta) with credentials provider + Neon Postgres.
- **Split config pattern is required**: `auth.config.ts` (edge-safe, used in middleware) and `auth.ts` (full config with PgAdapter + bcrypt, used in API routes/server components)
- Sign-up is a custom route at `app/api/auth/sign-up/route.ts` (Auth.js doesn't handle registration)
- Middleware excludes `/api/*` paths from the auth redirect
- JWT session strategy (not DB sessions), so only a `users` table is needed

## Key files
- `auth.config.ts` — edge-safe Auth.js config (pages, no providers/adapter)
- `auth.ts` — full Auth.js config (PgAdapter, Credentials provider, bcrypt)
- `lib/db.ts` — Neon serverless pool
- `middleware.ts` — route protection using edge-safe auth
- `app/api/auth/[...nextauth]/route.ts` — Auth.js handler
- `app/api/auth/sign-up/route.ts` — custom registration endpoint
- `db/migrations/` — SQL migration files

## DB
Neon Postgres. Connection via `DATABASE_URL` env var (use pooled connection URL).

## Required env vars
- `DATABASE_URL` — Neon connection pooling URL
- `AUTH_SECRET` — JWT signing secret (generate with `npx auth secret`)
