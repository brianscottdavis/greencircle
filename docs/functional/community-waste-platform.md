# Community Waste Management & Sustainability Platform

## 1. Project Synopsis
The platform helps local community members understand, monitor, and improve waste management practices. It blends educational content, gamified participation, and actionable workflows for both residents and council administrators. The experience must feel approachable for Year 9 UX designers to prototype while still mirroring the complexity of a real civic service.

## 2. Key Actors & Entities
| Actor / Entity | Description | Motivations & Needs |
| --- | --- | --- |
| **Home Owner / Resident** | Individuals living in the serviced community (teenagers through older adults). | Quickly learn local rules, book/bundle waste services, log recycling habits, earn rewards, stay informed even with low connectivity. |
| **Household Profile** | Data object representing an address, bin allocation, historical pickups, contamination warnings, and participation score. | Powers personalization, reminders, and offline packets (downloadable guides). |
| **Waste Service Job** | Discrete task such as bulky pickup, contamination inspection, education visit, or community challenge event. | Tracks lifecycle (requested → scheduled → assigned → completed), required equipment/staff, photos, resident feedback. |
| **Field Crew Member** | Council or contractor staff fulfilling scheduled jobs. | Needs mobile-friendly queue, routing info, ability to upload photos/notes even offline, safety checklists. |
| **Sustainability Ambassador** | Community champion role (student leaders, local volunteers). | Publishes challenges, moderates forums, highlights success stories, nudges low-engagement households. |
| **Council Administrator** | Oversees program performance, staffing, alerts, policy updates. | Wants dashboards of recycling trends, job backlog, heatmaps of contamination, broadcast channels for announcements. |
| **Data Sources** | IoT bin sensors, GPS from trucks, manual resident reports, uploaded photos, historical landfill stats. | Feed the dashboard, charts, alerts, scenario-based lessons, and gamified goals. |
| **Communication Surfaces** | Push notifications, SMS backups, printable guides, community noticeboard, discussion threads. | Ensure inclusive access (limited internet), while keeping all parties aligned on schedules and initiatives. |

## 3. Domain Concepts & Relationships
- **Household ⇄ Resident Accounts:** One household may have multiple resident logins; each resident inherits the household’s waste schedule plus personal challenge progress.
- **Job Lifecycle:** Request (resident or admin) → Triage (validate, bundle similar requests) → Assignment (crew + vehicle + date) → Execution (onsite workflow + evidence capture) → Completion (status + resident feedback).
- **Engagement Metrics:** Tracks participation points, contamination reductions, reporting streaks, community milestones. Admin view rolls these into trend charts for policy decisions.
- **Offline Mode Assets:** Cached schedules, QR-coded sorting posters, stored camera uploads that sync once online.

## 4. Primary User Stories
### 4.1 Home Owners Book & Track Services
1. **Request Bulky Pickup**  
   *As a homeowner, I want to log in, select “Bulky Waste Pickup,” add items (photos optional), pick available dates, and confirm, so I can prepare my waste without calling council.*
2. **Report Contamination or Missed Service**  
   *As a homeowner, I want a quick report form (with offline support) to flag overflowing bins or missed pickups so the council can respond promptly.*
3. **Follow Collection Guidance**  
   *As a homeowner, I want my dashboard to show upcoming collection types, tailored instructions, and downloadable guides/posters so my household avoids contamination fines.*
4. **Participate in Challenges**  
   *As a homeowner, I want to join community challenges (e.g., “Plastic-Free Week”), log my progress, and see my contribution to neighbourhood goals to stay motivated.*
5. **Track Job Status**  
   *As a homeowner, I want status updates (scheduled, en route, completed) with proof-of-service photos so I know when to place items out and trust the outcome.*

### 4.2 Company / Council Manages Jobs & Staff
1. **Triage Incoming Requests**  
   *As an operations coordinator, I want a consolidated queue of homeowner requests, automated validation (location, eligibility), and bundling suggestions so I can prioritize efficiently.*
2. **Schedule & Assign Crews**  
   *As a scheduler, I want to drag-and-drop jobs onto crew calendars, auto-generate optimized routes, and attach required equipment so staff know exactly what to do each day.*
3. **Field Execution Workflow**  
   *As a crew member, I want a mobile checklist with turn-by-turn directions, hazard notes, ability to capture photos/signatures offline, and sync later so documentation is complete.*
4. **Job Completion & Feedback Loop**  
   *As an operations coordinator, I want completed jobs to trigger resident notifications, collect satisfaction scores, and surface follow-up tasks (e.g., education visit) so service quality stays high.*
5. **Performance Dashboard**  
   *As a council administrator, I want dashboards showing community recycling trends, contamination hotspots, crew workload, and engagement metrics so I can adjust policies, staffing, or campaigns.*

## 5. Next Exploration Questions
- How should audience segmentation (demographic, behavioural, psychometric, geographic) adapt the onboarding flow and dashboard widgets?
- What accessibility standards (WCAG, plain language, multilingual support) are mandatory for Year 9 prototypes?
- Which datasets can realistically be obtained for students (e.g., anonymised council stats, open data) to drive their mock visualisations?
- What incentives/badges feel motivating yet feasible to administer (points, leaderboards, local sponsor rewards)?

---
*Draft prepared for review — Community Waste Management & Sustainability Platform.*


## 6. Next.js App Router Outline
- `/` (landing), `/about`, `/guides`, `/challenges`
- `/login`, `/register`
- `/dashboard` (resident), `/bookings` (plus `/bookings/new`, `/bookings/[id]`), `/reports` (plus `/reports/new`, `/reports/[id]`)
- `/challenges/my`, `/profile`, `/profile/settings`, `/profile/household`, `/notices`, `/offline`
- `/crew/dashboard`, `/crew/jobs/[id]`, `/crew/routes`
- `/admin/dashboard`, `/admin/jobs`, `/admin/jobs/[id]`, `/admin/challenges`, `/admin/users`, `/admin/announcements`

## 7. Data Model Sketch
Core tables: `users`, `households`, `household_members`, `service_requests`, `reports`, `jobs`, `job_assignments`, `job_events`, `crew_members`, `vehicles`, `challenges`, `challenge_participation`, `engagement_metrics`, `announcements`, `noticeboard_posts`, `offline_assets`, `activity_logs`.

## 8. API Surface (REST/tRPC)
- **Auth & profile**: `POST /api/auth/*`, `GET /api/me`, `PATCH /api/me/preferences`, `GET /api/households/:id`
- **Service requests & reports**: CRUD for `/api/service-requests` and `/api/reports`
- **Jobs & crew**: `/api/jobs`, `/api/jobs/:id`, `/api/jobs/:id/complete`, `/api/crew/schedule`
- **Challenges & engagement**: `/api/challenges`, `/api/challenges/:id/join`, `/api/challenges/:id/progress`, `/api/engagement/summary`
- **Announcements & noticeboard**: `/api/announcements`, `/api/noticeboard/*`
- **Analytics & offline**: `/api/admin/metrics`, `/api/admin/heatmaps`, `/api/offline/assets`

---

## 9. Platform Plan (Technical)

### 9.1 Route Map (App Router)

| Group | Route | Purpose |
|-------|-------|---------|
| Marketing | `/(marketing)/` | Landing, hero, feature sections |
| Marketing | `/(marketing)/about` | About page |
| Marketing | `/(marketing)/guides` | Sorting guides |
| Marketing | `/(marketing)/challenges` | Public challenges list |
| Auth | `/(auth)/login` | Login |
| Auth | `/(auth)/register` | Register |
| Resident | `/(protected)/dashboard` | Resident dashboard (household, collections, challenges) |
| Resident | `/(protected)/bookings`, `/bookings/new`, `/bookings/[id]` | Service bookings |
| Resident | `/(protected)/reports`, `/reports/new`, `/reports/[id]` | Reports |
| Resident | `/(protected)/challenges/my` | My challenge participation |
| Resident | `/(protected)/profile`, `/profile/settings`, `/profile/household` | Profile |
| Resident | `/(protected)/notices` | Noticeboard |
| Resident | `/(protected)/offline` | Offline assets |
| Crew | `/(protected)/crew/dashboard` | Crew job queue |
| Crew | `/(protected)/crew/jobs/[id]` | Job detail |
| Crew | `/(protected)/crew/routes` | Routing view |
| Admin | `/(protected)/admin/dashboard` | Admin dashboard |
| Admin | `/(protected)/admin/jobs`, `/admin/jobs/[id]` | Job management |
| Admin | `/(protected)/admin/challenges` | Challenge management |
| Admin | `/(protected)/admin/users` | User management |
| Admin | `/(protected)/admin/announcements` | Announcements |

### 9.2 Data Model (Prisma)

Core tables from Section 7 plus NextAuth: `users`, `accounts`, `sessions`, `verification_tokens`, `households`, `household_members`, `service_requests`, `service_request_events`, `jobs`, `job_assignments`, `job_events`, `reports`, `challenges`, `challenge_participation`, `challenge_events`, `engagement_metrics`, `announcements`, `noticeboard_posts`, `offline_assets`, `audit_logs`, `attachments`, `collection_schedules`.

### 9.3 Identity: Multi-Actor Login

The identity system must support four login-capable actors (see §2):

| Actor | Role | Default route after login |
|-------|------|---------------------------|
| Home Owner / Resident | `resident` | `/dashboard` |
| Field Crew Member | `crew` | `/crew/dashboard` |
| Sustainability Ambassador | `ambassador` | `/admin/challenges` |
| Council Administrator | `admin` | `/admin/dashboard` |

- Single sign-in at `/login`; post-login redirect goes to `/auth/redirect`, which reads `session.user.role` and redirects to the role-appropriate dashboard.
- Role-based route guards: `crew` and `admin` can access `/crew/*`; `admin` and `ambassador` can access `/admin/*`.

### 9.4 Stack Targets

- Node.js: 22.20.0
- Next.js: 16.1.6
- React: 19.2.4
- TypeScript: 5.9.3
- tRPC: 11.x
- Prisma: latest stable
- PostgreSQL
