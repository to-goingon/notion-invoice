"use client";

import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PDFDownloadButton } from "@/components/pdf-download-button";

interface InvoiceDetailActionsProps {
  invoiceId: string;
  invoiceNumber: string;
}

export function InvoiceDetailActions({
  invoiceId,
  invoiceNumber,
}: InvoiceDetailActionsProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex items-center justify-between no-print">
      <Link href="/invoices">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Button>
      </Link>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          인쇄
        </Button>
        <PDFDownloadButton
          invoiceId={invoiceId}
          invoiceNumber={invoiceNumber}
        />
      </div>
    </div>
  );
}
