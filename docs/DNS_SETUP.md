# DNS Setup for greencircle.team

Configure these records at your domain registrar (where you bought greencircle.team).

## Required Records

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 3600 (or default) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 (or default) |

### Notes by registrar

**If your registrar uses different Name formats:**
- For the **apex/root** (greencircle.team): use `@`, `.`, or leave Name blank
- For **www**: use `www` as the Name

**Alternative for www** (if CNAME isn't available for subdomains):
- Use `A` record: Name `www`, Value `76.76.21.21`

## After Adding Records

1. **Propagation** – DNS changes can take a few minutes up to 48 hours.
2. **Verification** – Vercel will verify automatically and email you when the domain is active.
3. **HTTPS** – Vercel provisions SSL automatically once DNS resolves.

## Check Status

```bash
cd app-web
vercel domains inspect greencircle.team
```
