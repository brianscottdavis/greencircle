# GreenCircle — Agent Memory

- **Identity system must support multiple actors** (per community-waste-platform spec): Resident, Field Crew Member, Sustainability Ambassador, Council Administrator. Each actor logs in with the same credentials flow but gets routed to a different dashboard and has different route access.
- Role-based post-login redirect: resident → `/dashboard`, crew → `/crew/dashboard`, ambassador → `/admin/challenges` or dedicated ambassador area, admin → `/admin/dashboard`.
