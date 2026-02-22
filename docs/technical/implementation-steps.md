1. Generate the initial scaffold with pnpm dlx create-t3-app (App Router + tRPC + Prisma + NextAuth + Tailwind).
2. Where in doubt, use standards and packages from a similar technical stack here /Users/briandavis/Developer/Projects/Ownstable/os-user-platform/app-web with the exception in this project we are also building the api and database layers.
2. Rename the project to app-web, run pnpm install, and generate the Prisma client.
3. Using the context docs in this project (see the docs folder), document the platform plan (actors, user stories, route map, data model, APIs) extending community-waste-platform.md.
4. Create Cursor skills (bootstrap-app, add-tailwind-section, add-shadcn-component, deploy-vercel) and the bootstrap-workflow subagent.
5. Upgrade dependencies to Next.js 16.1.6, React 19.2.4, Typescript 5.9.3, and set the Node engine to 22.20.0.
6. Build the marketing App Router pages (hero + feature sections) and route / through (marketing)/page.
7. Build the resident App Shell (sidebar/header), dashboard cards, collection timeline, and community challenge widget.
8. Implement the routes mentioned in the design
9. Add /scripts/bootstrap-template.ts to automate install + Prisma push and print Vercel CLI steps.
10. Diagnose outstanding work (lint config, Prisma schema rewrite, remaining routes, Cursor automation) and plan next actions.

---

## Implementation Status

### Implemented (complete)
- **Marketing:** `/`, `/about`, `/guides`, `/challenges` (public)
- **Auth:** `/login`, `/register`, `/signout`, `/auth/redirect` – Credentials (bcrypt), multi-actor roles
- **Resident:** `/dashboard`, `/bookings`, `/bookings/new`, `/bookings/[id]`, `/reports`, `/reports/new`, `/reports/[id]`, `/challenges/my`, `/profile`, `/profile/settings`, `/profile/household`, `/notices`, `/offline`
- **Crew:** `/crew/dashboard`, `/crew/jobs/[id]`, `/crew/routes`
- **Admin:** `/admin/dashboard`, `/admin/jobs`, `/admin/jobs/[id]`, `/admin/challenges`, `/admin/users`, `/admin/announcements`
- **tRPC:** `auth`, `health`, `challenge`, `household`, `job`, `noticeboard`, `offline`, `report`, `serviceRequest`, `admin`
- **Data:** Prisma schema, seed with users, household, challenge, job, noticeboard post