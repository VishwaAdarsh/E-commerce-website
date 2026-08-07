import { Order } from "@/types";

export interface InvoiceData {
  invoiceNumber: string;
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  amount: number;
}

export function generateInvoiceNumber(orderId: string): string {
  const cleanId = orderId.replace(/[^A-Za-z0-9]/g, "");
  return `INV-${cleanId}-${new Date().getFullYear()}`;
}

export function downloadInvoicePdf(order: Order) {
  const invoiceNo = generateInvoiceNumber(order.id);
  const content = `
LUXE EARTH & ARTIFACT INVOICE
=========================================
Invoice Number: ${invoiceNo}
Order ID: ${order.id}
Date: ${order.date}

Customer: ${order.customerName} (${order.customerEmail})
Status: ${order.status}
Total Amount: $${order.amount.toFixed(2)}

Items:
${order.items.map((item) => `- ${item.productName} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}`).join("\n")}

=========================================
Thank you for shopping with LUXE!
  `.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoiceNo}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
