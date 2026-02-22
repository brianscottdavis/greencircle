---
name: bootstrap-app
description: Bootstrap the GreenCircle app-web. Run pnpm install, Prisma generate, and db push. Use when setting up a new dev environment, after cloning, or when dependencies or schema change.
---

# Bootstrap App

## Steps

1. **Install dependencies**
   ```bash
   cd app-web && pnpm install
   ```

2. **Generate Prisma client**
   ```bash
   pnpm exec prisma generate
   ```
   (Also runs automatically via postinstall)

3. **Push schema** (requires DATABASE_URL in .env)
   ```bash
   pnpm db:push
   ```

4. **Start dev server**
   ```bash
   pnpm dev
   ```

## Prerequisites

- Node.js 22.20.0 (see package.json engines)
- `.env` with `DATABASE_URL` for PostgreSQL
- Optional: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` for NextAuth
