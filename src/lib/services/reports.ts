import { getProducts } from "@/lib/services/products";
import { getOrders } from "@/lib/services/orders";

export interface SalesReport {
  grossSales: number;
  discounts: number;
  refunds: number;
  netSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

export async function getSalesReport(range: string = "30days"): Promise<SalesReport> {
  const orders = await getOrders();
  const grossSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const discounts = Math.round(grossSales * 0.05);
  const refunds = Math.round(grossSales * 0.02);
  const netSales = grossSales - discounts - refunds;
  const totalOrders = orders.length || 1;
  const averageOrderValue = Math.round(grossSales / totalOrders);

  return {
    grossSales,
    discounts,
    refunds,
    netSales,
    totalOrders,
    averageOrderValue,
  };
}

export function generateCSV(headers: string[], rows: (string | number)[][]): string {
  const headerLine = headers.join(",");
  const rowLines = rows.map((r) => r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","));
  return [headerLine, ...rowLines].join("\n");
}
