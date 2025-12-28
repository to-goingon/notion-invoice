import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <FileX className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-3xl font-bold">인보이스를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground max-w-md">
          요청하신 인보이스가 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <Link href="/invoices" className="mt-6">
          <Button size="lg">인보이스 목록으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
