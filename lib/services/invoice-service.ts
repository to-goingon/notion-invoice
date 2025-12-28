import { notion, DATABASE_ID, ITEMS_DATABASE_ID } from "@/lib/notion";
import type { Invoice, InvoiceItem } from "@/types";

/**
 * Extract title property from Notion page
 */
function extractTitle(property: any): string {
  if (!property) return "";
  return property.title?.[0]?.plain_text || "";
}

/**
 * Extract rich text property from Notion page
 */
function extractRichText(property: any): string {
  if (!property) return "";
  return property.rich_text?.[0]?.plain_text || "";
}

/**
 * Extract date property from Notion page
 */
function extractDate(property: any): string {
  if (!property) return "";
  return property.date?.start || "";
}

/**
 * Extract number property from Notion page
 * Supports number, formula (number result), and rollup (number result) types
 */
function extractNumber(property: any): number {
  if (!property) return 0;

  // Direct number property
  if (property.number !== undefined && property.number !== null) {
    return property.number;
  }

  // Formula with number result
  if (property.formula?.number !== undefined && property.formula?.number !== null) {
    return property.formula.number;
  }

  // Rollup with number result
  if (property.rollup?.number !== undefined && property.rollup?.number !== null) {
    return property.rollup.number;
  }

  return 0;
}

/**
 * Extract select property from Notion page
 */
function extractSelect(property: any): string {
  if (!property) return "";
  return property.select?.name || "";
}

/**
 * Parse items JSON string to InvoiceItem array
 */
function parseItems(itemsJson: string): InvoiceItem[] {
  if (!itemsJson) return [];

  try {
    const parsed = JSON.parse(itemsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse items JSON:", error);
    return [];
  }
}

/**
 * Convert Notion page to InvoiceItem type
 */
function parseNotionPageToInvoiceItem(page: any): InvoiceItem {
  const props = page.properties;

  return {
    id: page.id.replace(/-/g, ""),
    name: extractTitle(props["항목명"]) || extractTitle(props["Name"]),
    quantity: extractNumber(props["수량"]) || extractNumber(props["Quantity"]) || 1,
    unit_price: extractNumber(props["단가"]) || extractNumber(props["UnitPrice"]) || 0,
    amount: extractNumber(props["금액"]) || extractNumber(props["Amount"]) || 0,
  };
}

/**
 * Fetch invoice items from Items database for a specific invoice
 */
async function getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]> {
  try {
    // Format invoice ID with hyphens for Notion API
    const formattedInvoiceId = invoiceId.includes("-")
      ? invoiceId
      : `${invoiceId.slice(0, 8)}-${invoiceId.slice(8, 12)}-${invoiceId.slice(12, 16)}-${invoiceId.slice(16, 20)}-${invoiceId.slice(20)}`;

    // Query Items database for items related to this invoice
    const response = await notion.databases.query({
      database_id: ITEMS_DATABASE_ID,
      filter: {
        property: "Invoices",
        relation: {
          contains: formattedInvoiceId,
        },
      },
    });

    return response.results.map(parseNotionPageToInvoiceItem);
  } catch (error) {
    console.error(`Failed to fetch items for invoice ${invoiceId}:`, error);
    return [];
  }
}

/**
 * Convert Notion page to Invoice type
 * This is a public function that can be reused in API routes
 */
export function parseNotionPageToInvoice(page: any): Invoice {
  const props = page.properties;

  // Extract items - Notion stores this as a relation or JSON text
  let items: InvoiceItem[] = [];

  // Try to get items from relation or rich text field
  const itemsProperty = props["항목"] || props["Items"];
  if (itemsProperty) {
    if (itemsProperty.rich_text) {
      items = parseItems(extractRichText(itemsProperty));
    } else if (itemsProperty.relation) {
      // If items are stored as relations, we'll need to fetch them separately
      // For now, return empty array
      items = [];
    }
  }

  return {
    id: page.id.replace(/-/g, ""), // Remove hyphens from page ID
    invoice_number:
      extractTitle(props["견적서 번호"]) || extractTitle(props["InvoiceNumber"]),
    client_name:
      extractRichText(props["클라이언트명"]) ||
      extractRichText(props["ClientName"]),
    issue_date:
      extractDate(props["발행일"]) || extractDate(props["IssueDate"]),
    due_date:
      extractDate(props["유효기간"]) || extractDate(props["DueDate"]),
    status: extractSelect(props["상태"]) || extractSelect(props["Status"]),
    total_amount:
      extractNumber(props["총 금액"]) || extractNumber(props["TotalAmount"]),
    currency: extractSelect(props["Currency"]) || "KRW",
    items,
    // Optional fields
    client_email: extractRichText(props["ClientEmail"]),
    client_address: extractRichText(props["ClientAddress"]),
    issuer_name: extractRichText(props["IssuerName"]),
    issuer_email: extractRichText(props["IssuerEmail"]),
    issuer_address: extractRichText(props["IssuerAddress"]),
    notes: extractRichText(props["Notes"]) || extractRichText(props["비고"]),
  };
}

/**
 * Get all invoices from Notion database
 * Sorted by issue date in descending order
 */
export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    // Query Notion database
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: "발행일",
          direction: "descending",
        },
      ],
    });

    return response.results.map(parseNotionPageToInvoice);
  } catch (error) {
    console.error("Failed to fetch invoices from Notion:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to fetch invoices: ${error.message}`);
    }

    throw new Error("Failed to fetch invoices from Notion");
  }
}

/**
 * Get a single invoice by ID from Notion
 */
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    // Notion page IDs should have hyphens
    const pageId = id.includes("-")
      ? id
      : `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;

    const page = await notion.pages.retrieve({ page_id: pageId });
    const invoice = parseNotionPageToInvoice(page);

    // Fetch related items from Items database
    const items = await getInvoiceItems(pageId);
    invoice.items = items;

    return invoice;
  } catch (error) {
    console.error(`Failed to fetch invoice ${id}:`, error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return null;
  }
}

/**
 * Search invoices by query string
 * Searches in invoice_number and client_name
 */
export async function searchInvoices(query: string): Promise<Invoice[]> {
  if (!query) {
    return getAllInvoices();
  }

  try {
    // Query Notion database with filter
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        or: [
          {
            property: "견적서 번호",
            title: {
              contains: query,
            },
          },
          {
            property: "클라이언트명",
            rich_text: {
              contains: query,
            },
          },
        ],
      },
      sorts: [
        {
          property: "발행일",
          direction: "descending",
        },
      ],
    });

    return response.results.map(parseNotionPageToInvoice);
  } catch (error) {
    console.error("Failed to search invoices:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to search invoices: ${error.message}`);
    }

    throw new Error("Failed to search invoices from Notion");
  }
}
