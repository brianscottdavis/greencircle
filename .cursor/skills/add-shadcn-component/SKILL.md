---
name: add-shadcn-component
description: Add or configure shadcn/ui components in the GreenCircle app-web. Use when adding buttons, cards, dialogs, forms, or other UI primitives from the shadcn ecosystem.
---

# Add shadcn Component

## Setup (if not installed)

GreenCircle app-web may not have shadcn pre-installed. To add:

```bash
cd app-web && pnpm dlx shadcn@latest init
```

Then add components:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
# etc.
```

## Conventions

- Components live in `src/components/ui/`
- Use `cn()` from `~/lib/utils` for class merging
- Follow the project's existing component patterns
- Prefer composition over configuration

## Common components

| Component | Use case |
|-----------|----------|
| Button | CTAs, form actions |
| Card | Feature blocks, dashboard widgets |
| Input, Label | Forms |
| Dialog | Modals, confirmations |
| DropdownMenu | Context menus |
| Select | Dropdowns |
| Tabs | Section switching |

## References

- shadcn/ui: https://ui.shadcn.com
- Ownstable reference: `/Users/briandavis/Developer/Projects/Ownstable/os-user-platform/app-web` (if using similar patterns)
