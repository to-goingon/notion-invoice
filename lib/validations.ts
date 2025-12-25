import { z } from "zod";

// Invoice search form validation schema
export const invoiceSearchSchema = z.object({
  query: z.string().optional(),
});

export type InvoiceSearchFormData = z.infer<typeof invoiceSearchSchema>;
