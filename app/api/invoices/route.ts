import { NextRequest, NextResponse } from "next/server";
import { getAllInvoices, searchInvoices } from "@/lib/services/invoice-service";
import {
  createSuccessResponse,
  createErrorResponse,
  HTTP_STATUS,
} from "@/lib/api-utils";

/**
 * GET /api/invoices
 * Get all invoices or search by query parameter
 *
 * Query parameters:
 * - q: Search query (optional)
 *
 * Example:
 * - GET /api/invoices
 * - GET /api/invoices?q=INV-2025-001
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    let invoices;

    if (query) {
      invoices = await searchInvoices(query);
    } else {
      invoices = await getAllInvoices();
    }

    return NextResponse.json(
      createSuccessResponse(invoices, "Invoices fetched successfully"),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error("Error in GET /api/invoices:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch invoices";

    return NextResponse.json(
      createErrorResponse(errorMessage, "Internal server error"),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
