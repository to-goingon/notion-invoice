import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-muted-foreground text-center text-sm">
          © {currentYear} Notion Invoice Manager. Built with Next.js and Notion API.
        </p>
        <div className="flex gap-4">
          <Link
            href="/invoices"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Invoices
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
