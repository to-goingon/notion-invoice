import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Database } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-6xl lg:leading-[1.1]">
          Notion Invoice Manager
        </h1>
        <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
          Manage your invoices with Notion as CMS. Create invoices in Notion, view them on the
          web, and download as PDF.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/invoices">
            <Button size="lg">View Invoices</Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Notion Integration</CardTitle>
            </div>
            <CardDescription>Powered by Notion API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Use Notion as your invoice database. Create and manage invoices directly in Notion,
              and they&apos;ll automatically appear here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Invoice Management</CardTitle>
            </div>
            <CardDescription>Browse and view invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              View all your invoices in a clean, organized list. Click any invoice to see detailed
              information including items, amounts, and client details.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <CardTitle>PDF Export</CardTitle>
            </div>
            <CardDescription>Download and share</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Generate professional PDF invoices with one click. Perfect for sharing with clients
              or keeping records.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
        <div className="text-muted-foreground space-y-2 text-left">
          <p>1. Set up your Notion database with invoice information</p>
          <p>2. Configure the Notion API credentials in your environment</p>
          <p>3. Create invoices in Notion - they&apos;ll automatically sync here</p>
          <p>4. Share invoice links with clients or download as PDF</p>
        </div>
      </div>
    </div>
  );
}
