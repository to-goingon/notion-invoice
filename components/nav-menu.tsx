"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/" as const,
    label: "홈",
    labelEn: "Home",
  },
  {
    href: "/invoices" as const,
    label: "인보이스",
    labelEn: "Invoices",
  },
] as const;

interface NavMenuProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function NavMenu({ mobile = false, onNavigate }: NavMenuProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={onNavigate}
            className={cn(
              "hover:text-primary block rounded-md px-3 py-2 text-base font-medium transition-colors",
              pathname === route.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            )}
            aria-current={pathname === route.href ? "page" : undefined}
          >
            {route.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className="flex items-center space-x-6" aria-label="주요 메뉴">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "hover:text-primary text-sm font-medium transition-colors",
            pathname === route.href ? "text-foreground" : "text-muted-foreground"
          )}
          aria-current={pathname === route.href ? "page" : undefined}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
