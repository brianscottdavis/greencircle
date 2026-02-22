# User Stories Coverage — GreenCircle

Mapping from `docs/requirements/2026_Term 1 UX Project Spec.md` (Core Features) to implemented screens.

---

## 1. Community User Dashboard

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Personalised dashboard | `/dashboard` | ✅ |
| Local waste and recycling info | `/dashboard`, `/guides` | ✅ |
| Collection schedules and guidelines | `/dashboard` (timeline), `/guides` | ✅ |
| Community challenges and progress | `/challenges`, `/challenges/my` | ✅ |

---

## 2. Waste Reporting & Data Collection Tools

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Report waste issues (overflow, contamination) | `/reports/new`, `/reports/[id]` | ✅ |
| Record household recycling habits | `/profile/household` | ⚠️ Scaffolded |
| Quick input, ease of use | Form flows | ✅ |
| Offline data entry | `/offline`, `/reports/new` | ⚠️ Partial |

---

## 3. Data Representation & Visualisation

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Graphs and charts | `/admin/dashboard`, resident dashboard | ⚠️ Pending |
| Community recycling trends | — | ❌ |
| Waste reduction progress | — | ⚠️ Data model ready |
| Location-based comparisons | — | ❌ |

---

## 4. Problem-Solving & Awareness Modules

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Scenario-based activities | `/guides` | ⚠️ Content only |
| Common waste problems | `/guides` | ✅ |
| Impact of incorrect disposal | Challenges | ⚠️ Implicit |
| Step-by-step guidance | `/guides`, collection instructions | ✅ |

---

## 5. Gamification & Community Incentives

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Points / recognition | `engagementScore`, `/challenges/my` | ✅ |
| Community milestones | `/challenges` | ✅ |
| Badges / acknowledgements | — | ⚠️ Data ready, UI pending |

---

## 6. Communication & Community Engagement Tools

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Community noticeboard | `/notices` | ✅ |
| Feedback channels | `/reports` (implicit) | ⚠️ |
| Discussion spaces | — | ❌ |

---

## 7. Offline Mode

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Downloadable guides and posters | `/offline` | ✅ |
| Printable sorting info | `/guides` | ⚠️ |
| Access without internet | `/~offline` | ⚠️ PWA not complete |

---

## 8. Council or Administrator View

| Spec Element | Screen(s) | Status |
|--------------|-----------|--------|
| Engagement trends overview | `/admin/dashboard` | ✅ |
| Aggregated data insights | `/admin/dashboard` | ⚠️ Scaffolded |
| Post updates or announcements | `/admin/announcements` | ✅ |

---

## Legend

- **✅** — Implemented
- **⚠️** — Partially implemented or scaffolded
- **❌** — Not implemented
