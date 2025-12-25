import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

interface HelloData {
  message: string;
  timestamp: string;
}

export async function GET() {
  const response: ApiResponse<HelloData> = {
    success: true,
    data: {
      message: "Hello from the API!",
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
