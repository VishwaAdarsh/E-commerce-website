"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import { getSalesReport, generateCSV, SalesReport } from "@/lib/services/reports";
import { useToast } from "@/components/ui/Toast";
import { FileSpreadsheet, Download, Calendar, TrendingUp, DollarSign, RefreshCw, Percent } from "lucide-react";

export default function AdminReportsPage() {
  const [report, setReport] = useState<SalesReport | null>(null);
  const [range, setRange] = useState("30days");
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getSalesReport(range);
      setReport(data);
    }
    load();
  }, [range]);

  const handleExportCSV = () => {
    if (!report) return;
    const headers = ["Metric", "Amount (INR / Count)"];
    const rows = [
      ["Gross Sales", `₹${report.grossSales}`],
      ["Discounts", `₹${report.discounts}`],
      ["Refunds", `₹${report.refunds}`],
      ["Net Sales", `₹${report.netSales}`],
      ["Total Orders", report.totalOrders],
      ["Average Order Value", `₹${report.averageOrderValue}`],
    ];

    const csvContent = generateCSV(headers, rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `LUXE_Sales_Report_${range}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast("Sales report CSV generated & downloaded!", "success");
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">BUSINESS INTELLIGENCE</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Reports & Analytics</h1>
            <p className="text-xs text-[#6F6861] mt-1">Financial summary, net revenue, discounts, and downloadable CSV audit reports.</p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-white border border-[#E6DED5] px-3 py-2 rounded-xl text-xs font-semibold text-[#181512]"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="thismonth">This Month</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="bg-[#171310] hover:bg-[#A56B4F] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 shadow-subtle"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {report && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">GROSS REVENUE</span>
              <h3 className="text-2xl font-extrabold text-[#181512]">₹{report.grossSales.toLocaleString()}</h3>
              <p className="text-[11px] text-[#347A52]">Total customer order payments</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">DISCOUNTS & REFUNDS</span>
              <h3 className="text-2xl font-extrabold text-[#B74747]">₹{(report.discounts + report.refunds).toLocaleString()}</h3>
              <p className="text-[11px] text-[#6F6861]">₹{report.discounts} discounts • ₹{report.refunds} refunds</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2 bg-[#FAF7F2]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F]">NET REVENUE</span>
              <h3 className="text-2xl font-extrabold text-[#347A52]">₹{report.netSales.toLocaleString()}</h3>
              <p className="text-[11px] text-[#347A52] font-bold">Realized revenue after adjustments</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
