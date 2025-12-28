import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoiceById } from "@/lib/services/invoice-service";
import { InvoiceDetailActions } from "@/components/invoice-detail-actions";

// Enable ISR with 5 minute revalidation
export const revalidate = 300;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    return {
      title: "인보이스를 찾을 수 없습니다 - Notion Invoice Manager",
      description: "요청하신 인보이스가 존재하지 않습니다",
    };
  }

  return {
    title: `인보이스 ${invoice.invoice_number} - Notion Invoice Manager`,
    description: `${invoice.client_name}에 대한 인보이스`,
  };
}

export default async function InvoiceDetailPage({ params }: Props) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 헤더 섹션 */}
        <InvoiceDetailActions
          invoiceId={invoice.id}
          invoiceNumber={invoice.invoice_number}
        />

        {/* 인보이스 내용 (print-friendly) */}
        <div className="print:shadow-none rounded-lg border bg-card p-8">
          {/* 인보이스 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">인보이스</h1>
            <p className="text-muted-foreground mt-2">
              {invoice.invoice_number}
            </p>
          </div>

          {/* 발행자 & 클라이언트 정보 */}
          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">발행자</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                {invoice.issuer_name && (
                  <p className="font-medium">{invoice.issuer_name}</p>
                )}
                {invoice.issuer_email && (
                  <p className="text-muted-foreground">{invoice.issuer_email}</p>
                )}
                {invoice.issuer_address && (
                  <p className="text-muted-foreground">
                    {invoice.issuer_address}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">클라이언트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{invoice.client_name}</p>
                {invoice.client_email && (
                  <p className="text-muted-foreground">{invoice.client_email}</p>
                )}
                {invoice.client_address && (
                  <p className="text-muted-foreground">
                    {invoice.client_address}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 발행일 및 유효기간 */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">발행일</p>
              <p className="text-muted-foreground text-sm">
                {new Date(invoice.issue_date).toLocaleDateString("ko-KR")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">유효기간</p>
              <p className="text-muted-foreground text-sm">
                {new Date(invoice.due_date).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </div>

          {/* 청구 항목 테이블 */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">청구 항목</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>항목</TableHead>
                    <TableHead className="text-right">수량</TableHead>
                    <TableHead className="text-right">단가</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{item.unit_price.toLocaleString("ko-KR")}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{item.amount.toLocaleString("ko-KR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* 총액 */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-bold">총액</span>
                <span className="text-lg font-bold">
                  {invoice.currency && invoice.currency !== "KRW"
                    ? `${invoice.currency} `
                    : "₩"}
                  {invoice.total_amount.toLocaleString("ko-KR")}
                </span>
              </div>
            </div>
          </div>

          {/* 비고 */}
          {invoice.notes && (
            <div className="mt-8 rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">비고</p>
              <p className="text-muted-foreground mt-1 text-sm">
                {invoice.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
