import type { Metadata } from "next";
import { getAllInvoices } from "@/lib/services/invoice-service";
import { InvoiceListWithSearch } from "@/components/invoice-list-with-search";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "인보이스 목록 - Notion Invoice Manager",
  description: "Notion 데이터베이스의 모든 인보이스를 확인하세요",
};

export default async function InvoicesPage() {
  // Fetch invoices directly from Notion API
  const invoices = await getAllInvoices();

  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">인보이스 목록</h1>
          <p className="text-muted-foreground mt-2">
            Notion 데이터베이스의 모든 인보이스를 확인하세요.
          </p>
        </div>

        <InvoiceListWithSearch invoices={invoices} />
      </div>
    </div>
  );
}
