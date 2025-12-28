"use client";

import { useState, useMemo } from "react";
import { InvoiceTable } from "@/components/invoice-table";
import { InvoiceSearch } from "@/components/invoice-search";
import type { Invoice } from "@/types";

interface InvoiceListWithSearchProps {
  invoices: Invoice[];
}

export function InvoiceListWithSearch({
  invoices,
}: InvoiceListWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = useMemo(() => {
    if (!searchQuery) return invoices;

    const query = searchQuery.toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.invoice_number.toLowerCase().includes(query) ||
        invoice.client_name.toLowerCase().includes(query)
    );
  }, [searchQuery, invoices]);

  return (
    <div className="space-y-8">
      <div className="max-w-md">
        <InvoiceSearch onSearch={setSearchQuery} />
      </div>

      <InvoiceTable invoices={filteredInvoices} />

      <div className="text-sm text-muted-foreground">
        총 {filteredInvoices.length}개의 인보이스
        {searchQuery && invoices.length !== filteredInvoices.length && (
          <span> (전체 {invoices.length}개 중)</span>
        )}
      </div>
    </div>
  );
}
