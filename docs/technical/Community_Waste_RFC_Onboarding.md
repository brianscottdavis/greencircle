# RFC: Community Waste Platform Engineering Onboarding

Generated: 22 February 2026

## Purpose

This document provides onboarding guidance for engineers building the
Community Waste Platform.

## Stack

-   Node 22+
-   Next.js 16.1+
-   React 19+
-   Prisma + PostgreSQL
-   tRPC 11

## Key Architectural Rules

-   Use App Router only.
-   Default to Server Components.
-   JSON must use PascalCase.
-   URIs must be lowercase.
-   Query params must use camelCase.

## Development Workflow

1.  Clone repository
2.  Install dependencies via pnpm
3.  Configure .env variables
4.  Run prisma migrate dev
5.  Run pnpm dev

## Testing

-   Unit tests: Vitest
-   E2E tests: Playwright

## Deployment

-   Build via next build
-   Start via next start

------------------------------------------------------------------------

End of RFC
