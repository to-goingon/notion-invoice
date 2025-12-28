import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Notion Invoice Manager",
  description: "Notion을 CMS로 활용한 인보이스 관리 시스템",
};

export default function HomePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-6xl lg:leading-[1.1]">
          Notion Invoice Manager
        </h1>
        <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
          Notion을 CMS로 활용하여 인보이스를 작성하고, 웹에서 조회하며 PDF로
          다운로드하세요.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/invoices">
            <Button size="lg">인보이스 보기</Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Notion 연동</CardTitle>
            </div>
            <CardDescription>Notion API 기반</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Notion을 인보이스 데이터베이스로 활용하세요. Notion에서 직접
              인보이스를 생성하고 관리하면 자동으로 웹에 표시됩니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>인보이스 관리</CardTitle>
            </div>
            <CardDescription>목록 조회 및 상세 보기</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              깔끔하고 정돈된 목록에서 모든 인보이스를 확인하세요. 인보이스를
              클릭하면 항목, 금액, 클라이언트 정보 등 상세 내용을 볼 수
              있습니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <CardTitle>PDF 내보내기</CardTitle>
            </div>
            <CardDescription>다운로드 및 공유</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              클릭 한 번으로 전문적인 PDF 인보이스를 생성하세요. 클라이언트와
              공유하거나 기록 보관에 완벽합니다.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">사용 방법</h2>
        <div className="text-muted-foreground space-y-2 text-left">
          <p>1. Notion 데이터베이스에 인보이스 정보 설정</p>
          <p>2. 환경 변수에 Notion API 인증 정보 구성</p>
          <p>3. Notion에서 인보이스 작성 - 자동으로 웹에 동기화됨</p>
          <p>4. 클라이언트에게 인보이스 링크 공유 또는 PDF 다운로드</p>
        </div>
      </div>
    </div>
  );
}
