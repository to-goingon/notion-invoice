import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Next.js Starter Kit",
  description: "Learn more about this Next.js starter kit",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">About This Starter Kit</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            A carefully crafted, minimal Next.js starter template for building modern web
            applications.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold">What's Included</h2>
          <ul className="space-y-2">
            <li>
              <strong>Next.js 16.1</strong> - Latest stable version with App Router and Turbopack
            </li>
            <li>
              <strong>TypeScript</strong> - Full type safety with strict mode enabled
            </li>
            <li>
              <strong>Tailwind CSS v4</strong> - Latest version with inline theming
            </li>
            <li>
              <strong>shadcn/ui</strong> - Beautiful, accessible component system
            </li>
            <li>
              <strong>React Hook Form + Zod</strong> - Performant form handling and validation
            </li>
            <li>
              <strong>Dark Mode</strong> - Built-in theme switching with next-themes
            </li>
            <li>
              <strong>ESLint & Prettier</strong> - Code quality and formatting
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">Philosophy</h2>
          <p>
            This starter kit follows a minimal approach, avoiding overengineering while providing
            essential tools for modern web development. We've chosen each dependency carefully to
            balance functionality with bundle size.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">Getting Started</h2>
          <p>
            Clone this template and start building your application. The project structure is
            organized with route groups for clean separation between main app and authentication
            pages.
          </p>
        </div>
      </div>
    </div>
  );
}
