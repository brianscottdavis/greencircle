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
| DATABASE_URL | Yes | PostgreSQL connection string |
| AUTH_SECRET | Yes | NextAuth secret |
| AUTH_GOOGLE_ID | Optional | OAuth |
| AUTH_GOOGLE_SECRET | Optional | OAuth |
| NEXTAUTH_URL | Yes (prod) | e.g. https://yourapp.vercel.app |

## Build settings

- Framework Preset: Next.js
- Root Directory: `app-web` (if repo root is GreenCircle)
- Build Command: `pnpm build`
- Install Command: `pnpm install`

## CLI steps (from bootstrap)

Run `scripts/bootstrap-template.ts` for automated setup and Vercel CLI instructions.
