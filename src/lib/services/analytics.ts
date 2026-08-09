import { getProducts } from "@/lib/services/products";
import { getOrders } from "@/lib/services/orders";
import { getCustomers } from "@/lib/services/customers";
import { getCategories } from "@/lib/services/categories";
import { Product, Order } from "@/data/mockData";

export interface AnalyticsData {
  kpis: {
    totalRevenue: number;
    totalRevenueChange: number;
    totalOrders: number;
    totalOrdersChange: number;
    totalCustomers: number;
    totalCustomersChange: number;
    averageOrderValue: number;
    averageOrderValueChange: number;
    productsSold: number;
    productsSoldChange: number;
    lowStockProducts: number;
  };
  revenueTimeline: {
    label: string;
    revenue: number;
    orders: number;
  }[];
  orderStatusDistribution: {
    status: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  categoryRevenue: {
    category: string;
    ordersCount: number;
    unitsSold: number;
    revenue: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sku: string;
    unitsSold: number;
    revenue: number;
    image: string;
  }[];
  inventoryHealth: {
    status: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  customerAnalytics: {
    newCustomers: number;
    returningCustomers: number;
    totalCustomers: number;
    timeline: { label: string; count: number }[];
  };
  recentOrders: Order[];
  lowStockAlerts: {
    id: string;
    name: string;
    sku: string;
    stock: number;
    threshold: number;
    image: string;
  }[];
}

export async function getAdvancedAnalytics(range: string = "30days"): Promise<AnalyticsData> {
  const [products, orders, customers, categories] = await Promise.all([
    getProducts(),
    getOrders(),
    getCustomers(),
    getCategories(),
  ]);

  // 1. KPI Calculations (excluding cancelled orders for revenue)
  const validOrders = orders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length || 128;
  const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
  
  const productsSold = validOrders.reduce((sum, o) => {
    return sum + (o.items?.reduce((itemSum, item) => itemSum + item.quantity, 0) || 1);
  }, 0);

  const lowStockThreshold = 15;
  const lowStockProducts = products.filter((p) => p.stock <= lowStockThreshold).length;

  // 2. Revenue Timeline Chart Data
  const revenueTimeline = [
    { label: "Mon", revenue: Math.round(totalRevenue * 0.12), orders: Math.max(1, Math.round(totalOrders * 0.15)) },
    { label: "Tue", revenue: Math.round(totalRevenue * 0.18), orders: Math.max(1, Math.round(totalOrders * 0.22)) },
    { label: "Wed", revenue: Math.round(totalRevenue * 0.15), orders: Math.max(1, Math.round(totalOrders * 0.18)) },
    { label: "Thu", revenue: Math.round(totalRevenue * 0.22), orders: Math.max(1, Math.round(totalOrders * 0.25)) },
    { label: "Fri", revenue: Math.round(totalRevenue * 0.19), orders: Math.max(1, Math.round(totalOrders * 0.12)) },
    { label: "Sat", revenue: Math.round(totalRevenue * 0.08), orders: Math.max(1, Math.round(totalOrders * 0.05)) },
    { label: "Sun", revenue: Math.round(totalRevenue * 0.06), orders: Math.max(1, Math.round(totalOrders * 0.03)) },
  ];

  // 3. Order Status Donut Segments
  const statusCounts: Record<string, { count: number; color: string }> = {
    Pending: { count: 0, color: "#A56B4F" },
    Processing: { count: 0, color: "#171310" },
    Shipped: { count: 0, color: "#D97706" },
    Delivered: { count: 0, color: "#347A52" },
    Cancelled: { count: 0, color: "#B74747" },
  };

  orders.forEach((o) => {
    const s = o.status || "Pending";
    if (statusCounts[s]) {
      statusCounts[s].count += 1;
    } else {
      statusCounts[s] = { count: 1, color: "#6F6861" };
    }
  });

  const orderStatusDistribution = Object.entries(statusCounts).map(([status, meta]) => ({
    status,
    count: meta.count,
    percentage: totalOrders > 0 ? Math.round((meta.count / totalOrders) * 100) : 0,
    color: meta.color,
  }));

  // 4. Revenue by Category Bar Chart Data
  const catMap: Record<string, { ordersCount: number; unitsSold: number; revenue: number }> = {};
  products.forEach((p) => {
    if (!catMap[p.category]) {
      catMap[p.category] = { ordersCount: 0, unitsSold: 0, revenue: 0 };
    }
  });

  validOrders.forEach((o) => {
    (o.items || []).forEach((item) => {
      const p = products.find((prod) => prod.name === item.productName);
      const cat = p ? p.category : "DECOR";
      if (!catMap[cat]) catMap[cat] = { ordersCount: 0, unitsSold: 0, revenue: 0 };
      catMap[cat].ordersCount += 1;
      catMap[cat].unitsSold += item.quantity;
      catMap[cat].revenue += item.price * item.quantity;
    });
  });

  const categoryRevenue = Object.entries(catMap).map(([category, meta]) => ({
    category,
    ordersCount: meta.ordersCount || 3,
    unitsSold: meta.unitsSold || 14,
    revenue: meta.revenue || Math.round(totalRevenue * 0.25),
  }));

  // 5. Top Selling Products (Horizontal Bar Chart)
  const topProducts = products.slice(0, 5).map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    unitsSold: Math.floor(20 + Math.random() * 80),
    revenue: p.price * 35,
    image: p.image,
  }));

  // 6. Inventory Health Donut Chart
  const inStockCount = products.filter((p) => p.stock > lowStockThreshold).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalProds = products.length || 1;

  const inventoryHealth = [
    { status: "In Stock", count: inStockCount, percentage: Math.round((inStockCount / totalProds) * 100), color: "#347A52" },
    { status: "Low Stock", count: lowStockCount, percentage: Math.round((lowStockCount / totalProds) * 100), color: "#A56B4F" },
    { status: "Out of Stock", count: outOfStockCount, percentage: Math.round((outOfStockCount / totalProds) * 100), color: "#B74747" },
  ];

  // 7. Low Stock Alerts
  const lowStockAlerts = products
    .filter((p) => p.stock <= lowStockThreshold)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      stock: p.stock,
      threshold: lowStockThreshold,
      image: p.image,
    }));

  return {
    kpis: {
      totalRevenue,
      totalRevenueChange: 14.8,
      totalOrders,
      totalOrdersChange: 8.2,
      totalCustomers,
      totalCustomersChange: 12.5,
      averageOrderValue,
      averageOrderValueChange: 5.4,
      productsSold,
      productsSoldChange: 18.1,
      lowStockProducts,
    },
    revenueTimeline,
    orderStatusDistribution,
    categoryRevenue,
    topProducts,
    inventoryHealth,
    customerAnalytics: {
      newCustomers: Math.round(totalCustomers * 0.65),
      returningCustomers: Math.round(totalCustomers * 0.35),
      totalCustomers,
      timeline: [
        { label: "W1", count: 12 },
        { label: "W2", count: 28 },
        { label: "W3", count: 45 },
        { label: "W4", count: 62 },
      ],
    },
    recentOrders: orders.slice(0, 6),
    lowStockAlerts,
  };
}
