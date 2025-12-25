import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Next.js Starter</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex md:flex-1">
            <NavMenu />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
