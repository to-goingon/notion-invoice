"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/" as const,
    label: "Home",
  },
  {
    href: "/invoices" as const,
    label: "Invoices",
  },
] as const;

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "hover:text-primary text-sm font-medium transition-colors",
            pathname === route.href ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
