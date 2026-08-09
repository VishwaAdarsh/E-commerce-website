"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { MOCK_ORDERS, MOCK_PRODUCTS } from "@/data/mockData";
import { 
  ShoppingBag, 
  Truck, 
  Users, 
  Calendar, 
  Download, 
  TrendingUp,
  ShieldCheck,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Clock,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "wishlist" | "addresses" | "settings">("overview");

  const customerOrders = MOCK_ORDERS.slice(0, 4);
  const userName = user?.email ? user.email.split("@")[0] : "Customer";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If Admin, render Admin Dashboard View
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
        <MerchantSidebar />
        <main className="flex-grow p-8 space-y-8 max-w-7xl">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#181512]">Admin Control Center</h1>
              <p className="text-xs text-[#6F6861]">Manage products, orders, coupons, and reports.</p>
            </div>
            <Link href="/admin/orders" className="bg-[#171310] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase">
              Go to Order Management
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Customer Account Portal View (PRD Section 36)
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-10 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6DED5] pb-6 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">CUSTOMER PORTAL</span>
            <h1 className="font-display text-3xl font-bold text-[#181512]">Welcome back, {userName}</h1>
            <p className="text-xs text-[#6F6861] mt-1">Manage your active orders, wishlist, and shipping addresses.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Portal Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-2 bg-white p-4 rounded-2xl border border-[#E6DED5] shadow-subtle">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "overview" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <Package className="w-4 h-4 text-[#A56B4F]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "orders" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#A56B4F]" />
              <span>My Orders ({customerOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "wishlist" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <Heart className="w-4 h-4 text-[#A56B4F]" />
              <span>Saved Wishlist</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "addresses" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <MapPin className="w-4 h-4 text-[#A56B4F]" />
              <span>Shipping Addresses</span>
            </button>

            <button
              onClick={() => signOut()}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-[#B74747] hover:bg-[#FAF7F2] transition-colors pt-4 border-t border-[#E6DED5]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </aside>

          {/* Main Dashboard Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                <span className="text-xs text-[#6F6861] font-semibold">Total Orders</span>
                <p className="text-3xl font-extrabold text-[#181512]">14</p>
                <p className="text-[11px] text-[#347A52] font-bold">2 orders in transit</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                <span className="text-xs text-[#6F6861] font-semibold">Wishlist Items</span>
                <p className="text-3xl font-extrabold text-[#181512]">5</p>
                <Link href="/shop" className="text-[11px] text-[#A56B4F] font-bold hover:underline">Explore products →</Link>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                <span className="text-xs text-[#6F6861] font-semibold">Luxe Privilege Tier</span>
                <p className="text-3xl font-extrabold text-[#A56B4F]">Gold</p>
                <p className="text-[11px] text-[#6F6861]">Free Express Shipping Active</p>
              </div>
            </div>

            {/* Recent Orders Cards */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                <h3 className="text-base font-bold text-[#181512]">Recent Orders</h3>
                <Link href="/shop" className="text-xs font-bold text-[#A56B4F] hover:underline">New Order</Link>
              </div>

              <div className="space-y-3">
                {customerOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl border border-[#E6DED5] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#181512]">{order.id}</span>
                        <span className="bg-[#171310] text-white text-[10px] px-2 py-0.5 rounded font-semibold">{order.status}</span>
                      </div>
                      <p className="text-[#6F6861]">{order.date}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-6">
                      <span className="font-extrabold text-[#171310] text-sm">₹{order.amount.toLocaleString()}</span>
                      <Link href="/shop" className="text-[#A56B4F] font-bold hover:underline">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
