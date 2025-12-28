"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFDownloadButtonProps {
  invoiceId: string;
  invoiceNumber: string;
}

export function PDFDownloadButton({
  invoiceId,
  invoiceNumber,
}: PDFDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Fetch PDF from API
      const response = await fetch(`/api/invoices/${invoiceId}/pdf`);

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      // Get PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoiceNumber.replace(/[^a-zA-Z0-9-]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("PDF 다운로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label={`인보이스 ${invoiceNumber} PDF 다운로드`}
    >
      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
      {isDownloading ? "다운로드 중..." : "PDF 다운로드"}
    </Button>
  );
}
