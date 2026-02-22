# Implementation Status

**Last updated:** 22 February 2026

## Completed

- [x] T3 scaffold (App Router + tRPC + Prisma + NextAuth + Tailwind)
- [x] Project named app-web, pnpm install, Prisma client generation
- [x] Platform plan documented (community-waste-platform.md §9)
- [x] Cursor skills: bootstrap-app, add-tailwind-section, add-shadcn-component, deploy-vercel, bootstrap-workflow
- [x] Dependencies: Next.js 16.1.6, React 19.2.4, TypeScript 5.9.3, Node 22.20.0
- [x] Marketing pages: hero + feature sections at `/`
- [x] Resident App Shell: sidebar, header, dashboard cards
- [x] Routes: `/`, `/register`, `/dashboard`, `/bookings`, `/reports`, `/challenges/my`, `/profile`, `/notices`
- [x] `scripts/bootstrap-template.ts`
- [x] Build and typecheck pass

## Outstanding Work

### Lint config
- No ESLint config in app-web (T3 scaffold may have used Biome). Add `.eslintrc` or `eslint.config.*` if team uses ESLint.
- Prettier not configured; consider adding for consistency with Ownstable.

### Prisma schema
- Current schema: T3 boilerplate (Post, User, Account, Session, VerificationToken).
- Needs rewrite per `docs/technical/prisma/schema.prisma` and `docs/functional/community-waste-platform.md` §7:
  - `households`, `household_members`, `service_requests`, `reports`, `jobs`, `challenges`, etc.

### Remaining routes
- `/about`, `/guides`, `/challenges` (public)
- `/bookings/new`, `/bookings/[id]`, `/reports/new`, `/reports/[id]`
- `/profile/settings`, `/profile/household`, `/offline`
- Crew: `/crew/dashboard`, `/crew/jobs/[id]`, `/crew/routes`
- Admin: `/admin/dashboard`, `/admin/jobs`, etc.

### Cursor automation
- bootstrap-workflow subagent: integrate with MCP `mcp_task` if available.
- Consider add-shadcn-component: run `shadcn init` and add common components.

### Auth
- NextAuth uses DiscordProvider; env vars optional for build. Add CredentialsProvider or Google for production.
- Protected layout redirects unauthenticated users to `/api/auth/signin`.

## Next Actions

1. **Prisma schema rewrite** – Replace boilerplate with domain model (households, service_requests, jobs, challenges, etc.).
2. **Add ESLint** – Mirror Ownstable config; add `lint` and `lint:fix` scripts.
3. **Implement booking/report forms** – `/bookings/new`, `/reports/new` with tRPC mutations.
4. **Dashboard widgets** – Collection timeline, community challenge widget (from resident-dashboard.md spec).
5. **i18n** – Add locale routing and translations per `docs/technical/i18n.md`.
6. **Copy logo** – Add `docs/design/logo.png` to `app-web/public` for favicon/hero.
