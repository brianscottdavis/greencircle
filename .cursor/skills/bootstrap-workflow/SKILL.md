---
name: bootstrap-workflow
description: Orchestrate the bootstrap-workflow subagent or equivalent multi-step setup. Use when performing full app bootstrap, scaffolding routes, or running the bootstrap-template script.
---

# Bootstrap Workflow

## Overview

The bootstrap workflow automates: install → Prisma generate → db push → optional Vercel steps.

## Option 1: Script

```bash
cd app-web
pnpm tsx scripts/bootstrap-template.ts
```

The script prints:
1. Install status
2. Prisma client generation
3. `pnpm db:push` result
4. Vercel CLI commands for linking and deploy

## Option 2: Manual sequence

1. `pnpm install`
2. `pnpm exec prisma generate`
3. `pnpm db:push`
4. `pnpm dev` (local) or `pnpm dlx vercel` (deploy)

## Subagent usage

When using an MCP or Cursor subagent for bootstrap:

- **Explore** subagent: Use for discovering project structure and config
- **generalPurpose** subagent: Use for running the bootstrap script and interpreting output
- Provide context: `app-web` path, `docs/functional/community-waste-platform.md` for requirements

## Success criteria

- `pnpm build` succeeds
- `pnpm typecheck` passes
- Database schema is in sync (no migrate drift)
