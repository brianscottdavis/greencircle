---
name: add-tailwind-section
description: Add a Tailwind CSS section or component using Tailwind v4 utility classes. Use when building marketing sections, feature blocks, or styled layouts in the GreenCircle app-web.
---

# Add Tailwind Section

## Conventions

- Use Tailwind v4 (`@tailwindcss/postcss`, `tailwindcss` ^4.x)
- Prefer semantic class names: `text-balance`, `rounded-lg`, `gap-4`, etc.
- Mobile-first: base styles for mobile, `sm:`/`md:`/`lg:` for larger screens
- Use `cn()` or `clsx` when merging conditional classes

## Patterns

### Feature section
```tsx
<section className="py-16 px-4 md:px-6">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-2xl font-bold md:text-3xl">Section Title</h2>
    <p className="mt-2 text-muted-foreground">Description</p>
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* cards */}
    </div>
  </div>
</section>
```

### Hero block
```tsx
<section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/80 px-4 text-white">
  <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Headline</h1>
  <p className="mt-4 max-w-2xl text-center text-lg text-white/90">Subheadline</p>
</section>
```

## References

- Tailwind v4 docs: https://tailwindcss.com/docs
- Project styling: `app-web/src/styles/globals.css`
