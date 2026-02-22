# Tailwind Plus Integration

GreenCircle uses [Tailwind Plus](https://tailwindcss.com/plus) (licensed) alongside shadcn/ui components.

## Stack

| Resource | Purpose |
|----------|---------|
| **Tailwind Plus** | Marketing blocks (heroes, CTAs, features, testimonials), templates |
| **shadcn/ui** | App UI (Button, Card, Input, forms, dialogs) |
| **Headless UI** | Dropdowns, dialogs, transitions (used by Tailwind Plus) |

## Where to place Tailwind Plus blocks

```
app-web/src/components/blocks/
├── marketing/     # Hero sections, CTAs, feature grids, footers
│   └── MarketingHeader.tsx  # Example header (replace with Plus block)
├── application/   # Navbars, sidebars, tables
└── README.md
```

## Adding a Tailwind Plus block

1. Copy the component from your Tailwind Plus library.
2. Paste into `src/components/blocks/marketing/` (or `application/`).
3. Update imports:
   - Use `~/lib/utils` for `cn()`
   - Use `~/components/ui/*` for Button, Card, etc.
4. Adapt colors to GreenCircle theme (emerald palette).

## Theme alignment

- **Primary:** `emerald-600`, `emerald-700`, `emerald-800`
- **Backgrounds:** `emerald-50`, `white`, `emerald-900` (dark)
- **Text:** `emerald-900`, `emerald-800`, `emerald-100` (on dark)

## Dependencies

- `@headlessui/react` — Tailwind Plus interactivity
- `lucide-react` — Icons
- `clsx`, `tailwind-merge`, `class-variance-authority` — Utilities
