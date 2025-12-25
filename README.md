# Next.js Starter Kit

A modern, minimal Next.js starter template built with the latest technologies for building small-scale applications. This starter kit provides a solid foundation with essential features while avoiding overengineering.

## Features

- **Next.js 16.1** - Latest stable version with App Router and Turbopack
- **TypeScript** - Full type safety with strict mode enabled
- **Tailwind CSS v4** - Latest version with inline theming
- **shadcn/ui** - Beautiful, accessible component system
- **Dark Mode** - Built-in theme switching with next-themes
- **Form Handling** - React Hook Form with Zod validation
- **ESLint & Prettier** - Code quality and formatting
- **Inter Font** - Modern, readable typography

## Tech Stack

### Core

- [Next.js 16.1](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety

### UI & Styling

- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [Lucide React](https://lucide.dev/) - Icon library

### Forms & Validation

- [React Hook Form](https://react-hook-form.com/) - Performant form handling
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Form validation integration

### Utilities

- [Day.js](https://day.js.org/) - Lightweight date library (2KB)
- [clsx](https://github.com/lukeed/clsx) - Conditional className utility
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, pnpm, or yarn

### Installation

1. Clone or use this repository:

```bash
git clone <your-repo-url>
cd nextjs-stater
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
nextjs-stater/
├── app/
│   ├── (auth)/              # Authentication pages (centered layout)
│   │   ├── login/
│   │   └── register/
│   ├── (main)/              # Main app pages (with header/footer)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   └── page.tsx         # Home page
│   ├── api/                 # API routes
│   │   └── hello/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── not-found.tsx        # 404 page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── header.tsx           # Site header
│   ├── footer.tsx           # Site footer
│   ├── nav-menu.tsx         # Navigation menu
│   ├── theme-provider.tsx   # Theme context provider
│   └── theme-toggle.tsx     # Dark mode toggle
├── lib/
│   ├── utils.ts             # Utility functions
│   └── validations.ts       # Zod validation schemas
├── types/
│   └── index.ts             # TypeScript type definitions
└── public/                  # Static assets
```

### Route Groups

This starter uses Next.js route groups to organize pages with different layouts:

- `(main)` - Pages with header and footer (home, about, dashboard, contact)
- `(auth)` - Authentication pages with centered layout (login, register)

Route groups don't affect the URL structure, so `/about` is still `/about`, not `/(main)/about`.

## Key Features Explained

### Dark Mode

Dark mode is implemented using `next-themes` and configured in the root layout. The theme toggle button is available in the header.

```tsx
// Toggle theme programmatically
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or "light" or "system"
```

### Form Validation

Forms use React Hook Form with Zod for validation. Schemas are centralized in `lib/validations.ts`:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";

const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

### shadcn/ui Components

Components are installed locally in `components/ui/`. To add more components:

```bash
npx shadcn@latest add [component-name]
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com/).

### TypeScript Configuration

Strict mode is enabled for better type safety:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

### API Routes

Example API route is available at `/api/hello`. API routes follow the App Router pattern:

```ts
// app/api/hello/route.ts
export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Customization

### Adding New Pages

1. Create a new file in `app/(main)/` for main pages or `app/(auth)/` for auth pages
2. Add the route to `components/nav-menu.tsx` if needed

### Adding More shadcn Components

```bash
npx shadcn@latest add dialog toast alert
```

### Environment Variables

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your-database-url
```

Access them in your code:

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Extending This Starter

This starter is intentionally minimal. Consider adding:

### Authentication

- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Clerk](https://clerk.dev/) - Complete user management
- [Supabase Auth](https://supabase.com/auth) - Open source auth

### Database

- [Prisma](https://www.prisma.io/) - TypeScript ORM
- [Drizzle](https://orm.drizzle.team/) - Lightweight ORM
- [Supabase](https://supabase.com/) - PostgreSQL database

### State Management

- [Zustand](https://zustand-demo.pmnd.rs/) - Minimal state management
- [Jotai](https://jotai.org/) - Primitive state management

### Testing

- [Vitest](https://vitest.dev/) - Unit testing
- [React Testing Library](https://testing-library.com/react) - Component testing
- [Playwright](https://playwright.dev/) - E2E testing

### Monitoring & Analytics

- [Vercel Analytics](https://vercel.com/analytics) - Performance analytics
- [Sentry](https://sentry.io/) - Error tracking
- [PostHog](https://posthog.com/) - Product analytics

### Additional Tools

- [React Query](https://tanstack.com/query) - Data fetching
- [date-fns](https://date-fns.org/) - More comprehensive date library
- [React Email](https://react.email/) - Email templates

## Best Practices

### Server vs Client Components

- Use Server Components by default (no "use client")
- Only add "use client" when you need:
  - Event handlers (onClick, onChange)
  - Hooks (useState, useEffect, useTheme)
  - Browser-only APIs

### Performance

- Images: Use `next/image` for automatic optimization
- Fonts: Already configured with `next/font`
- Bundle size: Check with `npm run build`

### Type Safety

- Define types in `types/index.ts`
- Infer types from Zod schemas when possible
- Use TypeScript strict mode

### Code Quality

- Run `npm run lint` before committing
- Format code with `npm run format`
- Enable TypeScript in your editor

## Troubleshooting

### Hydration Errors

If you see hydration errors with dark mode:

- Ensure `suppressHydrationWarning` is on the `<html>` tag
- ThemeProvider should have `disableTransitionOnChange`

### TypeScript Errors

Run type checking:

```bash
npm run type-check
```

### Build Errors

Clear cache and rebuild:

```bash
rm -rf .next
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and shadcn/ui
