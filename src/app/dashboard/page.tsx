"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { MOCK_ORDERS, MOCK_INVENTORY_ALERTS } from "@/data/mockData";
import { MOCK_AUDIT_LOGS } from "@/lib/services/audit";
import { MOCK_TICKETS } from "@/lib/services/tickets";
import { getCategoryPerformance, CategoryPerformance } from "@/lib/services/analytics";
import { exportToCsv } from "@/lib/utils/export";
import { 
  DollarSign, 
  ShoppingBag, 
  Truck, 
  Users, 
  Calendar, 
  Download, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  LifeBuoy,
  Plus,
  PieChart
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [categories, setCategories] = useState<CategoryPerformance[]>([]);
  const recentOrders = MOCK_ORDERS.slice(4, 8);

  useEffect(() => {
    getCategoryPerformance().then(setCategories);
  }, []);

  const handleExportCsv = () => {
    const exportData = MOCK_ORDERS.map((o) => ({
      "Order ID": o.id,
      Customer: o.customerName,
      Email: o.customerEmail,
      Date: o.date,
      Amount: o.amount,
      Status: o.status,
    }));
    exportToCsv("luxe_business_report", exportData);
  };

  return (
    <div className="flex min-h-screen bg-[#fff8f6] font-sans text-[#201a18]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        {/* Top Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#201a18]">
                Dashboard Overview
              </h1>
              <span className="bg-[#faba90] text-[#774827] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Super Admin ERP</span>
              </span>
            </div>
            <p className="text-xs text-[#51443c] mt-1">
              Enterprise control center for sales metrics, inventory, orders, and tickets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/products">
              <button className="flex items-center space-x-1.5 bg-[#faba90] hover:bg-[#f9b98f] text-[#774827] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-level-1">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </Link>

            <button className="flex items-center space-x-2 bg-white border border-[#d6c3b8] px-4 py-2 rounded-xl text-xs font-semibold text-[#51443c] hover:bg-[#f8ebe6] transition-colors shadow-level-1">
              <Calendar className="w-3.5 h-3.5 text-[#735949]" />
              <span>Last 30 Days</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-2 bg-[#845331] hover:bg-[#73482a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-level-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Report</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-5 border border-[#ece0db] shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#51443c]">Total Revenue</span>
              <div className="p-2 bg-[#f8ebe6] rounded-xl text-[#845331]">
                <DollarSign className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#201a18]">$124,563.00</div>
            <div className="flex items-center space-x-1.5 text-xs text-[#735949] font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-[#845331]" />
              <span className="font-bold text-[#845331]">12.5%</span>
              <span className="text-[#84746b]">vs last month</span>
            </div>
          </div>

          {/* Sales */}
          <div className="bg-white rounded-2xl p-5 border border-[#ece0db] shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#51443c]">Sales</span>
              <div className="p-2 bg-[#f8ebe6] rounded-xl text-[#845331]">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#201a18]">3,422</div>
            <div className="flex items-center space-x-1.5 text-xs text-[#735949] font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-[#845331]" />
              <span className="font-bold text-[#845331]">8.2%</span>
              <span className="text-[#84746b]">vs last month</span>
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-white rounded-2xl p-5 border border-[#ece0db] shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#51443c]">Active Orders</span>
              <div className="p-2 bg-[#f8ebe6] rounded-xl text-[#845331]">
                <Truck className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#201a18]">142</div>
            <div className="flex items-center space-x-1.5 text-xs text-[#ba1a1a] font-medium">
              <TrendingDown className="w-3.5 h-3.5 text-[#ba1a1a]" />
              <span className="font-bold">2.4%</span>
              <span className="text-[#84746b]">vs last month</span>
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-white rounded-2xl p-5 border border-[#ece0db] shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#51443c]">Active Customers</span>
              <div className="p-2 bg-[#f8ebe6] rounded-xl text-[#845331]">
                <Users className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#201a18]">12,899</div>
            <div className="flex items-center space-x-1.5 text-xs text-[#735949] font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-[#845331]" />
              <span className="font-bold text-[#845331]">18.7%</span>
              <span className="text-[#84746b]">vs last month</span>
            </div>
          </div>
        </div>

        {/* Middle Grid (Revenue Chart + Category Breakdown & Alerts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Over Time Chart */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#ece0db] shadow-level-1 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#201a18]">
                Revenue Over Time
              </h3>
              <button className="text-[#84746b] hover:text-[#201a18]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="h-56 relative w-full flex items-end justify-between border-b border-[#ece0db] pb-2">
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#84746b] pointer-events-none">
                  <div className="border-b border-[#ece0db]/50 pb-1">$50k</div>
                  <div className="border-b border-[#ece0db]/50 pb-1">$40k</div>
                  <div className="border-b border-[#ece0db]/50 pb-1">$30k</div>
                  <div className="border-b border-[#ece0db]/50 pb-1">$20k</div>
                  <div className="border-b border-[#ece0db]/50 pb-1">$10k</div>
                </div>

                <svg className="w-full h-full absolute inset-0 text-[#ece0db] fill-current" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <path d="M0,150 L70,120 L140,160 L210,90 L280,110 L350,50 L420,80 L500,20 L500,200 L0,200 Z" opacity="0.6" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs text-[#84746b] font-medium px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Category Performance Sales Breakdown */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-[#845331]" />
                <span>Sales by Category</span>
              </h3>
            </div>

            <div className="space-y-4 pt-2">
              {categories.map((cat) => (
                <div key={cat.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#201a18]">
                    <span>{cat.category}</span>
                    <span className="text-[#845331]">${cat.revenue.toLocaleString()} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#f8ebe6] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#845331] h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Logs Stream */}
        <div className="bg-white rounded-2xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#845331]" />
              <span>Security Audit Logs</span>
            </h3>
            <span className="text-xs text-[#84746b]">Real-time Action Tracking</span>
          </div>

          <div className="divide-y divide-[#ece0db] text-xs">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#201a18]">{log.adminName}</span>
                  <p className="text-[#51443c]">{log.action}</p>
                </div>
                <div className="flex items-center space-x-3 text-[11px] text-[#84746b]">
                  <span className="bg-[#f8ebe6] text-[#735949] px-2 py-0.5 rounded-full font-semibold">{log.module}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
