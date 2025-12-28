import { Client } from "@notionhq/client";
import { env } from "./env";

/**
 * Notion API client instance
 * Configured with the API key from environment variables
 */
export const notion = new Client({
  auth: env.NOTION_API_KEY,
});

/**
 * Notion database ID for invoices
 * This is the main database containing all invoice data
 */
export const DATABASE_ID = env.NOTION_DATABASE_ID;

/**
 * Notion database ID for invoice items
 * This database contains the line items for each invoice
 */
export const ITEMS_DATABASE_ID = env.NOTION_ITEMS_DATABASE_ID;
