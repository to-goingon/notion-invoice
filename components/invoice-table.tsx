import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Invoice } from "@/types";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>인보이스 번호</TableHead>
            <TableHead>발행일</TableHead>
            <TableHead className="hidden sm:table-cell">클라이언트</TableHead>
            <TableHead className="hidden md:table-cell">상태</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                인보이스가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="font-medium hover:underline"
                    aria-label={`인보이스 ${invoice.invoice_number} 상세 보기`}
                  >
                    {invoice.invoice_number}
                  </Link>
                </TableCell>
                <TableCell>
                  <time dateTime={invoice.issue_date}>
                    {new Date(invoice.issue_date).toLocaleDateString("ko-KR", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </time>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {invoice.client_name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={
                      invoice.status === "완료" ? "default" : "secondary"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {invoice.currency && invoice.currency !== "KRW"
                    ? `${invoice.currency} `
                    : "₩"}
                  {invoice.total_amount.toLocaleString("ko-KR")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
