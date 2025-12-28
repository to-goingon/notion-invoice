import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { getInvoiceById } from "@/lib/services/invoice-service";
import { InvoicePDF } from "@/lib/pdf/invoice-template";
import { HTTP_STATUS, createErrorResponse } from "@/lib/api-utils";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/invoices/[id]/pdf
 * Generate and download invoice PDF
 *
 * Example:
 * - GET /api/invoices/2d72d35842098039afb1c2a5132d20f9/pdf
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

    // Fetch invoice data
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

    // Generate PDF buffer using React.createElement
    const pdfElement = React.createElement(InvoicePDF, { invoice });
    // Type assertion needed due to @react-pdf/renderer type limitations
    const stream = await renderToStream(pdfElement as any);

    // Convert stream to buffer
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }

    const buffer = Buffer.concat(chunks);

    // Create filename (sanitize invoice number)
    const filename = `invoice-${invoice.invoice_number.replace(/[^a-zA-Z0-9-]/g, "_")}.pdf`;

    // Return PDF as download
    return new NextResponse(buffer, {
      status: HTTP_STATUS.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/invoices/[id]/pdf:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate PDF";

    return NextResponse.json(
      createErrorResponse(errorMessage, "Internal server error"),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
