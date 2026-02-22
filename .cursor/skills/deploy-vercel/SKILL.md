---
name: deploy-vercel
description: Deploy the GreenCircle app-web to Vercel. Use when preparing for production, setting up CI/CD, or configuring Vercel project settings.
---

# Deploy to Vercel

## Prerequisites

- Vercel account
- Project linked to GitHub (or manual deploy)

## Commands

```bash
cd app-web
pnpm dlx vercel
```

For production:
```bash
pnpm dlx vercel --prod
```

## Environment Variables

Set in Vercel dashboard (Settings → Environment Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string (from Neon integration) |
| AUTH_SECRET | Yes | NextAuth secret ✓ already set |
| NEXTAUTH_URL | Optional | Auto-set by Vercel; override if needed |

**Add database (Neon):** Vercel Dashboard → Project → Storage tab → Add Database → Neon. Connect to the project; it provisions Postgres and injects env vars. Ensure `DATABASE_URL` is set (Neon may add `POSTGRES_PRISMA_URL` — use that value for `DATABASE_URL` if so).

## Build settings

- Framework Preset: Next.js
- Root Directory: `app-web` (if repo root is GreenCircle)
- Build Command: `pnpm build`
- Install Command: `pnpm install`

## CLI steps (from bootstrap)

Run `scripts/bootstrap-template.ts` for automated setup and Vercel CLI instructions.
