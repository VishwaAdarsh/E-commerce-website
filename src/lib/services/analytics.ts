export interface KpiMetrics {
  totalRevenue: number;
  totalSalesCount: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  newCustomersCount: number;
  returningCustomersPercentage: number;
}

export interface CategoryPerformance {
  category: string;
  revenue: number;
  unitsSold: number;
  percentage: number;
}

export interface FinancialReport {
  grossRevenue: number;
  refundsTotal: number;
  taxCollected: number;
  shippingRevenue: number;
  discountsGiven: number;
  netRevenue: number;
}

export async function getKpiMetrics(): Promise<KpiMetrics> {
  return {
    totalRevenue: 124563.0,
    totalSalesCount: 3422,
    averageOrderValue: 154.2,
    customerLifetimeValue: 482.0,
    newCustomersCount: 1840,
    returningCustomersPercentage: 42.5,
  };
}

export async function getCategoryPerformance(): Promise<CategoryPerformance[]> {
  return [
    { category: "TECHNOLOGY", revenue: 48500, unitsSold: 920, percentage: 39 },
    { category: "KITCHENWARE", revenue: 32100, unitsSold: 1140, percentage: 26 },
    { category: "ACCESSORIES", revenue: 24800, unitsSold: 850, percentage: 20 },
    { category: "TEXTILES", revenue: 19163, unitsSold: 512, percentage: 15 },
  ];
}

export async function getFinancialReport(): Promise<FinancialReport> {
  return {
    grossRevenue: 135400.0,
    refundsTotal: 2837.0,
    taxCollected: 0.0,
    shippingRevenue: 1250.0,
    discountsGiven: 9250.0,
    netRevenue: 124563.0,
  };
}
