import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Invoice } from "@/types";

// Register Korean font - Nanum Gothic from Google Fonts
// @react-pdf/renderer only supports TTF and WOFF formats
// Nanum Gothic TTF is confirmed working with react-pdf
// Reference: https://github.com/diegomura/react-pdf/issues/806
Font.register({
  family: "NanumGothic",
  fonts: [
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "NanumGothic",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 4,
    marginBottom: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCol1: {
    width: "50%",
  },
  tableCol2: {
    width: "15%",
    textAlign: "right",
  },
  tableCol3: {
    width: "17.5%",
    textAlign: "right",
  },
  tableCol4: {
    width: "17.5%",
    textAlign: "right",
  },
  total: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notes: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 10,
    color: "#666",
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

/**
 * Invoice PDF Document Component
 * Renders an invoice as a PDF using @react-pdf/renderer
 */
export function InvoicePDF({ invoice }: InvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>{invoice.invoice_number}</Text>
        </View>

        {/* Issuer and Client Info */}
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <Text style={styles.sectionTitle}>From</Text>
            {invoice.issuer_name && <Text>{invoice.issuer_name}</Text>}
            {invoice.issuer_email && <Text>{invoice.issuer_email}</Text>}
            {invoice.issuer_address && <Text>{invoice.issuer_address}</Text>}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>To</Text>
            <Text>{invoice.client_name}</Text>
            {invoice.client_email && <Text>{invoice.client_email}</Text>}
            {invoice.client_address && <Text>{invoice.client_address}</Text>}
          </View>
        </View>

        {/* Date Info */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Issue Date:</Text>
            <Text style={styles.value}>
              {new Date(invoice.issue_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>
              {new Date(invoice.due_date).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Items</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol1}>Description</Text>
            <Text style={styles.tableCol2}>Qty</Text>
            <Text style={styles.tableCol3}>Unit Price</Text>
            <Text style={styles.tableCol4}>Amount</Text>
          </View>

          {/* Table Rows */}
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCol1}>{item.name}</Text>
              <Text style={styles.tableCol2}>{item.quantity}</Text>
              <Text style={styles.tableCol3}>
                {item.unit_price.toLocaleString()}
              </Text>
              <Text style={styles.tableCol4}>
                {item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>
            {invoice.currency && invoice.currency !== "KRW"
              ? `${invoice.currency} `
              : "₩"}
            {invoice.total_amount.toLocaleString()}
          </Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
