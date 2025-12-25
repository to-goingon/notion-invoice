import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices - Notion Invoice Manager",
  description: "Browse all invoices from your Notion database",
};

export default function InvoicesPage() {
  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all your invoices from Notion.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Invoice list will be implemented here. This page will fetch invoices from your Notion
            database and display them in a searchable table.
          </p>
        </div>
      </div>
    </div>
  );
}
