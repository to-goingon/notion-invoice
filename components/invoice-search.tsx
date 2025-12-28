"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InvoiceSearchProps {
  onSearch: (query: string) => void;
}

export function InvoiceSearch({ onSearch }: InvoiceSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="인보이스 번호 또는 클라이언트명 검색..."
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}
