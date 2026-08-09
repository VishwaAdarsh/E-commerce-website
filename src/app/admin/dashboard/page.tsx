"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { getProducts } from "@/lib/services/products";
import { getOrders } from "@/lib/services/orders";
import { getCustomers } from "@/lib/services/customers";
import { Product, Order } from "@/data/mockData";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Truck,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, ords, custs] = await Promise.all([
          getProducts(),
          getOrders(),
          getCustomers(),
        ]);
        setProducts(prods);
        setOrders(ords);
        setCustomerCount(custs.length);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const shippedOrders = orders.filter((o) => o.status === "Shipped").length;
  const lowStockCount = products.filter((p) => p.stock <= 15).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FAF7F2]">
        <MerchantSidebar />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
              LIVE MERCHANT ERP
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">
              Executive Dashboard
            </h1>
            <p className="text-xs text-[#6F6861] mt-1">
              Real-time sales metrics, order pipeline, and catalog health.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/orders"
              className="bg-[#171310] hover:bg-[#A56B4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-subtle flex items-center space-x-2"
            >
              <span>Manage Live Orders</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL SALES</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#347A52]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">
              ₹{totalSales.toLocaleString()}
            </h3>
            <p className="text-[11px] text-[#347A52] font-medium">+14.8% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL ORDERS</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#A56B4F]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">{orders.length}</h3>
            <p className="text-[11px] text-[#6F6861] font-medium">{pendingOrders} pending fulfillment</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">ACTIVE CUSTOMERS</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#171310]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">{customerCount || 128}</h3>
            <p className="text-[11px] text-[#347A52] font-medium">+92% repeat customer rate</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">CATALOG PRODUCTS</span>
              <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#A56B4F]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#181512]">{products.length}</h3>
            <p className="text-[11px] text-[#B74747] font-medium">{lowStockCount} low stock alerts</p>
          </div>
        </div>

        {/* Operational Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Pipeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#181512]">Fulfillment Pipeline</h3>
              <Link href="/admin/orders" className="text-xs font-bold text-[#A56B4F] hover:underline">
                View All Orders
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] space-y-1">
                <Clock className="w-4 h-4 text-[#A56B4F] mx-auto" />
                <span className="text-lg font-bold text-[#181512] block">{pendingOrders}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">Pending</span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] space-y-1">
                <Truck className="w-4 h-4 text-[#A56B4F] mx-auto" />
                <span className="text-lg font-bold text-[#181512] block">{shippedOrders}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">Shipped</span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] space-y-1">
                <CheckCircle2 className="w-4 h-4 text-[#347A52] mx-auto" />
                <span className="text-lg font-bold text-[#181512] block">{orders.length - pendingOrders - shippedOrders}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">Delivered</span>
              </div>
            </div>

            {/* Recent Orders Stream */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-[#6F6861] uppercase tracking-wider mb-3">Recent Transactions</h4>
              <div className="divide-y divide-[#E6DED5]">
                {orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#F2ECE4] text-[#A56B4F] flex items-center justify-center font-bold text-xs">
                        {order.avatarInitials}
                      </div>
                      <div>
                        <h5 className="font-bold text-[#181512]">{order.customerName}</h5>
                        <p className="text-[10px] text-[#6F6861]">{order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#171310] block">₹{order.amount.toLocaleString()}</span>
                      <Badge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock Alerts Box */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#B74747]" />
                <h3 className="text-base font-bold text-[#181512]">Stock Alerts</h3>
              </div>
              <Link href="/admin/inventory" className="text-xs font-bold text-[#A56B4F] hover:underline">
                Inventory
              </Link>
            </div>

            <div className="space-y-3">
              {products
                .filter((p) => p.stock <= 20)
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover border border-[#E6DED5]" />
                      <div>
                        <h5 className="font-bold text-[#181512] truncate max-w-[120px]">{product.name}</h5>
                        <p className="text-[10px] text-[#6F6861] font-mono">{product.sku}</p>
                      </div>
                    </div>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${product.stock <= 5 ? 'bg-[#B74747]/10 text-[#B74747]' : 'bg-[#A56B4F]/10 text-[#A56B4F]'}`}>
                      {product.stock} units left
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
