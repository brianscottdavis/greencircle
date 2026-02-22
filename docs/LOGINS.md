# GreenCircle — Demo Logins

All demo accounts use the same password: **demo123**

| Email | Role | Default route |
|-------|------|---------------|
| demo@greencircle.example | Resident | /dashboard |
| crew@greencircle.example | Crew | /crew/dashboard |
| ambassador@greencircle.example | Ambassador | /admin/challenges |
| admin@greencircle.example | Admin | /admin/dashboard |

**Note:** Run `pnpm db:seed` in `app-web` to create these accounts. The demo resident has a linked household at 123 Demo Street, Greentown.
