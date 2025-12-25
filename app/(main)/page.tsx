import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-6xl lg:leading-[1.1]">
          Welcome to Next.js Starter Kit
        </h1>
        <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
          A modern, minimal starter template built with Next.js 16, shadcn/ui, and TypeScript.
          Perfect for small-scale applications.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Next.js 16</CardTitle>
            <CardDescription>Latest stable version</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Built with the App Router, React Server Components, and Turbopack for blazing-fast
              development.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui</CardTitle>
            <CardDescription>Beautiful components</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Accessible, customizable components built with Radix UI and Tailwind CSS. Copy and
              paste into your project.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Mode</CardTitle>
            <CardDescription>Built-in theme support</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Seamless dark mode integration with next-themes. Try toggling the theme using the
              button in the header!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
