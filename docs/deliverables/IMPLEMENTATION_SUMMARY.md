# Implementation Summary — GreenCircle

**Last updated:** 22 February 2026

---

## What’s Built

### Scaffold & Tooling

- T3 stack: App Router, tRPC, Prisma, NextAuth, Tailwind
- Project name: `app-web`; pnpm, Node 22.20.0
- Cursor skills: bootstrap-app, add-tailwind-section, add-shadcn-component, deploy-vercel, bootstrap-workflow
- `scripts/bootstrap-template.ts` for install + Prisma push + Vercel CLI

### Marketing & Public

- Hero + feature sections at `/`
- `/about`, `/guides`, `/challenges` (public)
- Locale routing: `en`, `hi`, `zh`, `fr`, `es`

### Auth & Identity

- NextAuth v5 with Credentials provider (bcrypt)
- Roles: `resident`, `crew`, `ambassador`, `admin`
- Post-login redirect by role: `/auth/redirect` → `/dashboard`, `/crew/dashboard`, `/admin/challenges`, or `/admin/dashboard`
- Routes: `/login`, `/register`, `/signout`

### Resident

- App shell: sidebar, header, dashboard cards
- `/dashboard` — household summary, collections, challenges, announcements
- `/bookings`, `/bookings/new`, `/bookings/[id]`
- `/reports`, `/reports/new`, `/reports/[id]`
- `/challenges/my`, `/profile`, `/profile/settings`, `/profile/household`
- `/notices`, `/offline`

### Crew

- `/crew/dashboard` — job queue
- `/crew/jobs/[id]` — job detail
- `/crew/routes` — routing view

### Admin

- `/admin/dashboard`
- `/admin/jobs`, `/admin/jobs/[id]`
- `/admin/challenges`, `/admin/users`, `/admin/announcements`

### Data & API

- Prisma schema: users, households, service requests, reports, jobs, challenges, announcements, noticeboard, offline assets, etc.
- tRPC routers: auth, health, challenge, household, job, noticeboard, offline, report, serviceRequest, admin
- Seed script with demo users and household

---

## Outstanding Work

1. **Lint** — ESLint / Prettier not configured
2. **Forms & mutations** — Booking/report forms scaffolded; tRPC mutations need full wiring
3. **Dashboard widgets** — Collection timeline and challenge widgets from spec
4. **i18n** — Locale structure in place; copy may need expansion
5. **Logo / favicon** — Copy `docs/design/logo.png` to `app-web/public`
6. **Offline mode** — PWA / sync behaviour not fully implemented
7. **Admin metrics** — Analytics, heatmaps APIs not built

---

## Demo Credentials

| Email | Role | Route |
|-------|------|-------|
| demo@greencircle.example | Resident | /dashboard |
| crew@greencircle.example | Crew | /crew/dashboard |
| ambassador@greencircle.example | Ambassador | /admin/challenges |
| admin@greencircle.example | Admin | /admin/dashboard |

Password: **demo123**  
Run `pnpm db:seed` in `app-web` to create accounts.
