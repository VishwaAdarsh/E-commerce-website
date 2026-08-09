"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { businessConfig } from "@/config/business";
import { 
  Search, 
  ShoppingBag, 
  RotateCcw, 
  CreditCard, 
  Truck, 
  User, 
  MessageSquare, 
  HelpCircle,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function SupportHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const supportCategories = [
    {
      icon: ShoppingBag,
      title: "Orders & Account",
      desc: "Track, manage, or modify active order details.",
      href: "/support/faq?cat=Orders",
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      desc: "Start a return or review return eligibility.",
      href: "/policies/returns",
    },
    {
      icon: CreditCard,
      title: "Refunds & Payments",
      desc: "Check refund status, gateway processing, or payment options.",
      href: "/policies/refunds",
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      desc: "Track courier shipments, delivery estimates, or pincode rules.",
      href: "/policies/shipping",
    },
    {
      icon: MessageSquare,
      title: "Submit Support Ticket",
      desc: "Contact customer care with order-specific assistance.",
      href: "/support/contact",
    },
    {
      icon: HelpCircle,
      title: "Ticket Status Tracker",
      desc: "Track status for existing support tickets (#SUP-XXXXX).",
      href: "/support/tickets",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow space-y-16 pb-16">
        {/* Support Hero Section */}
        <section className="bg-[#171310] text-white py-16 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              MAISON CUSTOMER CARE
            </span>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              How can we help you today?
            </h1>
            <p className="text-xs md:text-sm text-[#E6DED5]/80 max-w-xl mx-auto leading-relaxed">
              Search FAQs, check order shipment status, review return policies, or contact our dedicated support team.
            </p>

            {/* Live Search Field */}
            <div className="relative max-w-xl mx-auto pt-2">
              <Search className="w-5 h-5 text-[#6F6861] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search FAQs (e.g. return window, refund timeline, tracking)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery) {
                    window.location.href = `/support/faq?query=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-white text-[#181512] placeholder-[#6F6861] border border-[#E6DED5] rounded-2xl pl-12 pr-28 py-4 text-xs font-medium focus:outline-none focus:border-[#A56B4F] shadow-dropdown"
              />
              <Link
                href={searchQuery ? `/support/faq?query=${encodeURIComponent(searchQuery)}` : "/support/faq"}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#171310] hover:bg-[#A56B4F] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Search
              </Link>
            </div>
          </div>
        </section>

        {/* Support Categories Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#181512]">
              Customer Support Center
            </h2>
            <p className="text-xs text-[#6F6861]">
              Select a help category to find answers or start a claim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="group block">
                <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle hover:shadow-card hover:border-[#A56B4F] transition-all space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E6DED5] rounded-xl flex items-center justify-center text-[#A56B4F] group-hover:bg-[#171310] group-hover:text-white transition-colors">
                      <cat.icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base font-bold text-[#181512] group-hover:text-[#A56B4F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#6F6861] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-bold text-[#A56B4F] group-hover:translate-x-1 transition-transform pt-2">
                    <span>Explore Section</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Direct Contact Options Box */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E6DED5] shadow-card grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-x-0 md:divide-x divide-[#E6DED5]">
            <div className="space-y-2 p-2">
              <Mail className="w-6 h-6 text-[#A56B4F] mx-auto" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Email Support</h4>
              <p className="text-xs text-[#171310] font-bold">{businessConfig.support.email}</p>
              <p className="text-[11px] text-[#6F6861]">Response within 24 business hours</p>
            </div>

            <div className="space-y-2 p-2">
              <Phone className="w-6 h-6 text-[#A56B4F] mx-auto" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Phone Support</h4>
              <p className="text-xs text-[#171310] font-bold">{businessConfig.support.phone}</p>
              <p className="text-[11px] text-[#6F6861]">Mon-Sat 10 AM - 7 PM IST</p>
            </div>

            <div className="space-y-2 p-2">
              <Clock className="w-6 h-6 text-[#A56B4F] mx-auto" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Support Hours</h4>
              <p className="text-xs text-[#171310] font-bold">{businessConfig.support.hours}</p>
              <p className="text-[11px] text-[#6F6861]">Standard Business Hours</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
