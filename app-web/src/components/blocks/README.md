# Tailwind Plus UI Blocks

Place [Tailwind Plus](https://tailwindcss.com/plus) components here.

## Structure

- `marketing/` — Hero sections, CTAs, feature grids, testimonials, footers
- `application/` — Navbars, sidebars, tables, forms, modals
- `ecommerce/` — Product cards, carts, checkout (if needed)

## Integration

Tailwind Plus components use:
- **Tailwind CSS v4**
- **Headless UI** (`@headlessui/react`) for dropdowns, dialogs, etc.
- **React** + **Next.js**

Import and adapt blocks into your pages. Use the project's `cn()` utility from `~/lib/utils` for class merging.

## Example

```tsx
// src/components/blocks/marketing/hero-split.tsx
// Copied from Tailwind Plus → Marketing → Hero Sections
import { cn } from "~/lib/utils";

export function HeroSplit() {
  return (
    <section className="...">
      {/* Your block markup */}
    </section>
  );
}
```
