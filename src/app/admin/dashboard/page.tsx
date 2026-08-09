"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { getAdvancedAnalytics, AnalyticsData } from "@/lib/services/analytics";
import { 
  RevenueLineChart, 
  OrderStatusDonutChart, 
  CategoryRevenueBarChart, 
  TopProductsBarChart 
} from "@/components/admin/AnalyticsCharts";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Truck,
  ArrowUpRight,
  Calendar,
  Layers,
  Boxes
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState("30days");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getAdvancedAnalytics(dateRange);
        setAnalytics(data);
      } catch (err) {
        console.error("Dashboard analytics error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dateRange]);

  if (loading || !analytics) {
    return (
      <div className="flex min-h-screen bg-[#FAF7F2]">
        <MerchantSidebar />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  const { kpis, revenueTimeline, orderStatusDistribution, categoryRevenue, topProducts, inventoryHealth, recentOrders, lowStockAlerts } = analytics;

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        {/* Top Header & Global Date Range Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
              PRODUCTION EXECUTIVE DASHBOARD
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">
              Store Analytics & Intelligence
            </h1>
            <p className="text-xs text-[#6F6861] mt-1">
              Real-time database analytics, revenue timeline, sales performance, and stock health.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white border border-[#E6DED5] px-3 py-2 rounded-xl">
              <Calendar className="w-4 h-4 text-[#A56B4F]" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#181512] focus:outline-none"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="12months">Last 12 Months</option>
              </select>
            </div>

            <Link
              href="/admin/orders"
              className="bg-[#171310] hover:bg-[#A56B4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-subtle flex items-center space-x-2"
            >
              <span>Manage Orders</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 1. KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL REVENUE</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#347A52]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">₹{kpis.totalRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-[#347A52] font-medium">+{kpis.totalRevenueChange}% vs prev period</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL ORDERS</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#A56B4F]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">{kpis.totalOrders}</h3>
            <p className="text-[11px] text-[#347A52] font-medium">+{kpis.totalOrdersChange}% order growth</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">ACTIVE CUSTOMERS</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#171310]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">{kpis.totalCustomers}</h3>
            <p className="text-[11px] text-[#347A52] font-medium">+{kpis.totalCustomersChange}% registered</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">AVG ORDER VALUE</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#A56B4F]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">₹{kpis.averageOrderValue.toLocaleString()}</h3>
            <p className="text-[11px] text-[#347A52] font-medium">+{kpis.averageOrderValueChange}% AOV</p>
          </div>
        </div>

        {/* 2. Revenue Overview Line Chart & Order Status Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#181512]">Revenue Overview</h3>
                <p className="text-[11px] text-[#6F6861]">Sales timeline chart aggregated from completed orders.</p>
              </div>
            </div>
            <RevenueLineChart data={revenueTimeline} />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#181512]">Order Status</h3>
            </div>
            <OrderStatusDonutChart data={orderStatusDistribution} />
          </div>
        </div>

        {/* 3. Revenue by Category & Inventory Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#181512]">Revenue by Category</h3>
                <p className="text-[11px] text-[#6F6861]">Category sales distribution and order volumes.</p>
              </div>
              <Link href="/admin/categories" className="text-xs font-bold text-[#A56B4F] hover:underline">
                View Categories
              </Link>
            </div>
            <CategoryRevenueBarChart data={categoryRevenue} />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#181512]">Inventory Health</h3>
                <p className="text-[11px] text-[#6F6861]">Stock thresholds & low-stock warning indicators.</p>
              </div>
              <Link href="/admin/inventory" className="text-xs font-bold text-[#A56B4F] hover:underline">
                View Inventory
              </Link>
            </div>
            <OrderStatusDonutChart data={inventoryHealth} />
          </div>
        </div>

        {/* 4. Top Selling Products Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#181512]">Top Selling Products</h3>
              <p className="text-[11px] text-[#6F6861]">Ranked by units sold & total realized revenue.</p>
            </div>
            <Link href="/admin/products" className="text-xs font-bold text-[#A56B4F] hover:underline">
              Manage Products
            </Link>
          </div>
          <TopProductsBarChart data={topProducts} />
        </div>

        {/* 5. Customer Overview & Low Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#181512]">Customer Overview</h3>
              <Link href="/admin/customers" className="text-xs font-bold text-[#A56B4F] hover:underline">
                Customer CRM
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5]">
                <span className="text-xl font-extrabold text-[#181512] block">{analytics.customerAnalytics.totalCustomers}</span>
                <span className="text-[10px] font-bold uppercase text-[#6F6861]">Total Accounts</span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5]">
                <span className="text-xl font-extrabold text-[#347A52] block">{analytics.customerAnalytics.newCustomers}</span>
                <span className="text-[10px] font-bold uppercase text-[#6F6861]">New Buyers</span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5]">
                <span className="text-xl font-extrabold text-[#A56B4F] block">{analytics.customerAnalytics.returningCustomers}</span>
                <span className="text-[10px] font-bold uppercase text-[#6F6861]">Repeat Buyers</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#B74747]" />
                <h3 className="text-base font-bold text-[#181512]">Low Stock Alerts</h3>
              </div>
              <Link href="/admin/inventory" className="text-xs font-bold text-[#A56B4F] hover:underline">
                Inventory Log
              </Link>
            </div>
            <div className="space-y-3">
              {lowStockAlerts.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover border border-[#E6DED5]" />
                    <div>
                      <h5 className="font-bold text-[#181512] truncate max-w-[110px]">{item.name}</h5>
                      <p className="text-[10px] text-[#6F6861] font-mono">{item.sku}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#B74747] text-[10px] bg-[#B74747]/10 px-2 py-0.5 rounded">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Recent Orders Table */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#181512]">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-[#A56B4F] hover:underline">
              View All Orders →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">ORDER ID</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#A56B4F] font-mono">{order.id}</td>
                    <td className="py-4 px-4 font-semibold text-[#181512]">{order.customerName}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{order.date}</td>
                    <td className="py-4 px-4"><Badge status={order.status} /></td>
                    <td className="py-4 px-4 text-right font-extrabold text-[#171310]">₹{order.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
