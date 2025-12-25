# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking
```

## Architecture Overview

### Route Groups and Layout Strategy

This project uses Next.js App Router with **route groups** to implement different layouts:

- **`app/(main)/`** - Pages with header and footer navigation (home, about, dashboard, contact)
  - Layout: `app/(main)/layout.tsx` - Wraps content with `<Header>` and `<Footer>`
  - Examples: `/`, `/about`, `/dashboard`, `/contact`

- **`app/(auth)/`** - Authentication pages with centered layout (login, register)
  - Layout: `app/(auth)/layout.tsx` - Centers content vertically with branded header
  - Examples: `/login`, `/register`

Route groups use parentheses `()` and don't affect URL structure - `/about` is still `/about`, not `/(main)/about`.

### Root Layout Pattern

`app/layout.tsx` is the root layout that:
1. Configures the Inter font via `next/font/google`
2. Wraps entire app with `<ThemeProvider>` from `next-themes`
3. Sets `suppressHydrationWarning` on `<html>` to prevent dark mode hydration errors

### Form Validation Pattern

All forms use React Hook Form + Zod with centralized schemas:

1. Define schemas in `lib/validations.ts` with inferred types:
   ```ts
   export const loginSchema = z.object({ ... });
   export type LoginFormData = z.infer<typeof loginSchema>;
   ```

2. Use in components with `zodResolver`:
   ```ts
   const form = useForm<LoginFormData>({
     resolver: zodResolver(loginSchema),
   });
   ```

3. Schemas include custom refinements (e.g., password confirmation matching)

### Component Organization

- **`components/ui/`** - shadcn/ui components (button, card, form, input, etc.)
  - Locally installed and customizable
  - Use `npx shadcn@latest add [component]` to add more

- **`components/`** (root) - Custom app components:
  - `header.tsx` - Site header with logo, navigation, theme toggle
  - `footer.tsx` - Site footer
  - `nav-menu.tsx` - Navigation links
  - `theme-provider.tsx` - Wrapper for `next-themes`
  - `theme-toggle.tsx` - Dark/light/system mode switcher

### Utilities

- **`lib/utils.ts`** - Contains `cn()` helper that merges Tailwind classes using `clsx` + `tailwind-merge`
- **`lib/validations.ts`** - Centralized Zod validation schemas and types
- **`types/index.ts`** - Shared TypeScript type definitions

## Key Technical Patterns

### Server vs Client Components

- Default to Server Components (no `"use client"` directive)
- Only add `"use client"` when needed:
  - Form components (React Hook Form)
  - Theme toggle (uses `useTheme` hook)
  - Event handlers (onClick, onChange)
  - Browser-only APIs

### TypeScript Configuration

Strict mode enabled with additional safety checks:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Path alias: `@/*` maps to repository root

### Dark Mode Implementation

- Managed by `next-themes` library
- ThemeProvider configured in root layout with `attribute="class"`
- Supports: `"light"`, `"dark"`, `"system"` modes
- Access via `useTheme()` hook in client components

## Adding New Features

### New Page in Main Layout
1. Create file in `app/(main)/[page-name]/page.tsx`
2. Add route to `components/nav-menu.tsx` if needed for navigation

### New Auth Page
1. Create file in `app/(auth)/[page-name]/page.tsx`
2. Use centered layout automatically

### New shadcn Component
```bash
npx shadcn@latest add [component-name]
```

### New Form
1. Define schema in `lib/validations.ts`
2. Export inferred type: `export type FormData = z.infer<typeof schema>`
3. Use with React Hook Form + `zodResolver` in component

## Project Context

This is a **Next.js 16.1 starter template** designed for small-scale applications with:
- App Router architecture
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui components
- Dark mode support
- Form validation with React Hook Form + Zod

Built for simplicity - intentionally minimal to avoid over-engineering.
