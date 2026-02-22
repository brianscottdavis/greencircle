# Screens Reference — GreenCircle

All routes are prefixed with `/{locale}` where locale is `en`, `hi`, `zh`, `fr`, or `es`.

---

## Marketing (Public)

| Route | Purpose |
|-------|---------|
| `/` | Landing: hero, feature sections, entry to login/register |
| `/about` | About the platform |
| `/guides` | Waste sorting guides |
| `/challenges` | Public challenges list |

---

## Auth

| Route | Purpose |
|-------|---------|
| `/login` | Sign-in (Credentials) |
| `/register` | Registration |
| `/signout` | Sign-out |
| `/auth/redirect` | Post-login redirect by role |

---

## Resident (Protected)

| Route | Purpose |
|-------|---------|
| `/dashboard` | Household summary, next collections, active challenges, announcements |
| `/bookings` | List of service requests |
| `/bookings/new` | New bulky pickup / service request |
| `/bookings/[id]` | Service request detail and status |
| `/reports` | List of reports |
| `/reports/new` | New contamination / missed pickup report |
| `/reports/[id]` | Report detail |
| `/challenges/my` | My challenge participation |
| `/profile` | Profile overview |
| `/profile/settings` | Account settings |
| `/profile/household` | Household details |
| `/notices` | Community noticeboard |
| `/offline` | Offline assets / downloadable guides |

---

## Crew (Protected)

| Route | Purpose |
|-------|---------|
| `/crew/dashboard` | Job queue for assigned crew |
| `/crew/jobs/[id]` | Job detail, checklist, execution |
| `/crew/routes` | Route planning / map view |

---

## Admin (Protected)

| Route | Purpose |
|-------|---------|
| `/admin/dashboard` | Admin overview, metrics |
| `/admin/jobs` | Job management list |
| `/admin/jobs/[id]` | Job detail, assignment, status |
| `/admin/challenges` | Challenge management |
| `/admin/users` | User management |
| `/admin/announcements` | Announcements management |

---

## Special

| Route | Purpose |
|-------|---------|
| `/~offline` | Offline fallback page |

---

## File Locations

- Marketing: `app/[locale]/(marketing)/**/page.tsx`
- Auth: `app/[locale]/(auth)/**/page.tsx`
- Resident/Crew/Admin: `app/[locale]/(protected)/**/page.tsx`
- Redirect: `app/[locale]/auth/redirect/page.tsx`
