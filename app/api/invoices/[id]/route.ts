import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById } from "@/lib/services/invoice-service";
import {
  createSuccessResponse,
  createErrorResponse,
  HTTP_STATUS,
} from "@/lib/api-utils";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/invoices/[id]
 * Get a single invoice by ID
 *
 * Example:
 * - GET /api/invoices/2d72d35842098039afb1c2a5132d20f9
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        createErrorResponse("Invoice ID is required", "Bad request"),
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const invoice = await getInvoiceById(id);

    if (!invoice) {
      return NextResponse.json(
        createErrorResponse(
          `Invoice with ID ${id} not found`,
          "Invoice not found"
        ),
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json(
      createSuccessResponse(invoice, "Invoice fetched successfully"),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error("Error in GET /api/invoices/[id]:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch invoice";

    return NextResponse.json(
      createErrorResponse(errorMessage, "Internal server error"),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
