// Invoice line item
export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

// Invoice data structure
export interface Invoice {
  id: string;
  invoice_number: string;
  issue_date: string;
  client_name: string;
  client_email: string;
  client_address: string;
  issuer_name: string;
  issuer_email: string;
  issuer_address: string;
  total_amount: number;
  currency: string;
  items: InvoiceItem[];
  notes: string;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
