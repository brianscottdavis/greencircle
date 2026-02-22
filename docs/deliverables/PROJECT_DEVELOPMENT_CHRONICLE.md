# Project Development Chronicle — GreenCircle

This document summarizes the full development journey: agent transcripts, git history, and project structure.

---

## Overview

GreenCircle is a community waste management and sustainability platform built with Next.js 16, React 19, Prisma, tRPC, NextAuth, and Tailwind CSS. It supports multiple actor types (Resident, Field Crew, Sustainability Ambassador, Council Administrator) with role-based access and i18n (English, Hindi, Chinese, French, Spanish).

---

## Git History

**Repository:** Initialized February 22, 2026

| Commit | Date | Description |
|--------|------|-------------|
| `3100092` | 2026-02-22 | Initial commit: GreenCircle community waste platform |
| `734f98a` | 2026-02-22 | Locale support, admin features, charts, seed data, user management |
| `0d8d49e` | 2026-02-22 | Add language picker to mobile: marketing menu + AppShell header |

All development occurred on February 22, 2026, with three commits representing major milestones.

---

## Development Phases (from Agent Transcripts)

### Phase 1: Initial Scaffold & Setup

- Created T3 scaffold (App Router + tRPC + Prisma + NextAuth + Tailwind)
- Upgraded dependencies (Next.js 16.1.6, React 19.2.4, TypeScript 5.9.3, Node 22.20.0)
- Set up project structure (`app-web/`)
- Created Cursor skills (bootstrap-app, add-tailwind-section, add-shadcn-component, deploy-vercel)
- Built marketing landing page with hero and feature sections
- Implemented resident App Shell (sidebar, header, dashboard)
- Added ESLint configuration
- Implemented NextAuth with Credentials provider (bcrypt) and multi-actor role support
- Integrated Tailwind Plus and shadcn/ui components
- Created Prisma schema with domain models (Households, ServiceRequests, Reports, Jobs, Challenges, etc.)
- Set up Docker Compose for PostgreSQL
- Implemented all routes (marketing, auth, resident, crew, admin)

**Key decisions:** Multi-actor identity (Resident, Crew, Ambassador, Admin), role-based post-login redirects, JWT strategy (no database sessions).

---

### Phase 2: Internationalization (i18n)

- Implemented `next-intl` for 5 locales: `en`, `hi`, `zh`, `fr`, `es`
- Restructured app under `[locale]` route group
- Added locale switcher in marketing header
- Translated marketing pages, auth pages, guides, about, challenges
- Created translation files in `messages/` directory
- Implemented locale-aware navigation and redirects
- Added locale to AppShell header for logged-in users

Routes now support: `/{locale}/`, `/{locale}/guides`, `/{locale}/login`, `/{locale}/dashboard`, etc.

---

### Phase 3: Core Functionality Implementation

- Implemented `/bookings/new` and `/reports/new` forms
- Added tRPC routers: `household`, `serviceRequest`, `report`, `challenge`, `job`, `admin`
- Implemented booking and report deletion/cancellation
- Added Google Places API integration for address search (Australian bias)
- Implemented household CRUD (add, edit, delete)
- Added debounced address search with Google Places
- Fixed cache invalidation for React Query after mutations

---

### Phase 4: Admin Features & Data Visualization

- Added Recharts integration for admin dashboard
- Created 5 chart visualizations:
  - Service requests by type (bar chart)
  - Jobs by status (pie chart)
  - Reports by type (bar chart)
  - Service requests by status (horizontal bar)
  - Reports by status (pie chart)
- Expanded seed data (11 residents, 8 households, 45+ service requests, 35 reports)
- Implemented user management (`/admin/users`) with edit/delete
- Added color palette beyond green (sky blue, violet, orange, red, amber)

---

### Phase 5: UI/UX Refinements

- Converted PNG logo to vector SVG using potrace
- Improved SVG with gradients and color matching
- Updated logo usage across the app
- Added "GreenCircle" wordmark with two-tone styling (emerald-800 + lime-600)
- Added white circular background for logo on green pages
- Redesigned login page with large SVG background and white card
- Added Unsplash hero image (`killari-hotaru-aK859Jaekls-unsplash.jpg`)
- Fixed mobile language picker visibility
- Added wordmark to dashboard AppShell

---

### Phase 6: Challenges & Authentication

- Made challenges browse page session-aware
- Added "Join" functionality for logged-in users
- Updated marketing header to show Dashboard/Sign out when logged in
- Implemented registration (`/register`) with NextAuth sign-in after creation

---

### Phase 7: Deliverables Documentation

- Created `docs/deliverables/` folder
- Converted PDF spec to Markdown (`2026_Term 1 UX Project Spec.md`)
- Created compliance report against UX project spec
- Generated implementation summary, screens reference, user stories coverage
- Added presentation guide and success criteria documents
- Created this project development chronicle

---

## Project Structure

```
GreenCircle/
├── app-web/                    # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   └── [locale]/       # i18n route group
│   │   │       ├── (marketing)/  # Public pages
│   │   │       ├── (auth)/      # Login, register, signout
│   │   │       └── (protected)/  # Authenticated routes
│   │   ├── components/          # React components
│   │   │   ├── blocks/          # Tailwind Plus blocks
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── i18n/                # next-intl config
│   │   ├── server/              # tRPC routers, auth config
│   │   └── lib/                # Utilities
│   ├── messages/                # Translation files (5 locales)
│   ├── prisma/
│   │   ├── schema.prisma        # Full domain model
│   │   └── seed.ts              # Seed data
│   └── public/                  # Static assets
├── docs/
│   ├── deliverables/           # Project documentation
│   ├── design/                  # Logo, images
│   ├── functional/              # Functional specs
│   ├── requirements/            # Project brief
│   └── technical/              # Implementation docs
└── .cursor/
    └── skills/                  # Cursor agent skills
```

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| UI | React 19.2.4 |
| Language | TypeScript 5.9.3 |
| Database | PostgreSQL (Prisma ORM) |
| API | tRPC 11.0.0 |
| Auth | NextAuth 5.0.0-beta.25 (Credentials, JWT) |
| Styling | Tailwind CSS v4, Tailwind Plus, shadcn/ui |
| i18n | next-intl 4.8.3 |
| Charts | Recharts 3.7.0 |
| Package Manager | pnpm 10.16.1 |
| Node | 22.20.0 |

---

## Key Features Implemented

### Authentication & Authorization
- Multi-actor login (Resident, Crew, Ambassador, Admin)
- Role-based route guards
- Post-login redirects by role
- Registration with email/password
- Session management (24h max, 5min update)

### Resident Features
- Dashboard with collection timeline and challenges
- Service request booking (Bulky Pickup, Overflow, Missed Service)
- Report submission (Contamination, Missed Pickup, Overflow)
- Challenge participation tracking
- Household management (add, edit, delete)
- Profile settings, noticeboard, offline assets

### Crew Features
- Job queue dashboard
- Job detail with completion workflow
- Route planning

### Admin Features
- Dashboard with 5 data visualizations
- Job management
- User management (CRUD)
- Challenge management
- Announcement creation
- Noticeboard moderation

### Marketing & Public
- Landing page with hero and features
- About page
- Sorting guides (8 categories, 5 languages)
- Public challenges list
- Multi-language support (EN, HI, ZH, FR, ES)

---

## Database Schema

**Core Models:** User (with roles), Household, HouseholdMember, ServiceRequest, ServiceRequestEvent, Report, Job, JobAssignment, JobEvent, Challenge, ChallengeParticipation, ChallengeEvent, CrewMember, Vehicle, Announcement, NoticeboardPost, EngagementMetric, OfflineAsset, Attachment, ActivityLog, AuditLog, CollectionSchedule.

**NextAuth:** Account, Session, VerificationToken

---

## Seed Data

- 11 demo users (all roles, password: `demo123`)
- 8 households across Greentown, Greenvale, Greenside
- 45+ service requests, 35 reports
- Jobs linked to service requests
- Active challenge: "Plastic-Free Week"
- Sample noticeboard post

---

## Deployment

- **Platform:** Vercel
- **URL:** https://greencircle.team
- **Database:** Neon PostgreSQL
- Migrations applied during build; auto-deploy on push to `main`

---

## Key Architectural Decisions

1. **Multi-actor identity** — Single login flow with role-based routing
2. **i18n** — `next-intl` with locale-aware `[locale]` route group
3. **API** — tRPC for type-safe client-server communication
4. **Auth** — NextAuth with Credentials provider (no OAuth)
5. **Styling** — Tailwind CSS v4 with Tailwind Plus and shadcn/ui
6. **State** — React Query for server state, tRPC for mutations

---

## Outstanding Work

- Full offline data entry (partial implementation)
- Location-based comparisons
- Discussion spaces/forums
- Badges UI (gamification)
- Full WCAG accessibility audit
- Advanced analytics (heatmaps, trends)

---

## Timeline Summary

All development occurred on February 22, 2026, across 7+ agent sessions:

1. Initial scaffold and setup
2. i18n implementation
3. Core functionality (bookings, reports, households)
4. Admin features and charts
5. UI/UX refinements (logo, branding)
6. Challenges and auth improvements
7. Deliverables documentation

The project went from scaffold to a deployed, multi-language platform with full CRUD, role-based access, and data visualizations in a single day.
