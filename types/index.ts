// Invoice item from Notion Items database
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

// Invoice data structure from Notion Invoices database
export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  issue_date: string;
  due_date: string;
  status: string;
  total_amount: number;
  items: InvoiceItem[];
  // Optional fields for future expansion
  client_email?: string;
  client_address?: string;
  issuer_name?: string;
  issuer_email?: string;
  issuer_address?: string;
  currency?: string;
  notes?: string;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
