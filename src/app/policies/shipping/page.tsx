"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";
import Link from "next/link";
import { Truck, MapPin, Clock, Package } from "lucide-react";

export default function ShippingPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "coverage", number: "01", title: "Delivery Locations" },
    { id: "processing", number: "02", title: "Order Processing Time" },
    { id: "estimates", number: "03", title: "Delivery Estimates" },
    { id: "charges", number: "04", title: "Shipping Charges & Free Shipping" },
    { id: "tracking", number: "05", title: "Order Tracking" },
    { id: "damaged-pkg", number: "06", title: "Damaged or Delayed Deliveries" },
  ];

  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      subtitle="Information regarding order fulfillment timelines, shipping fees, courier dispatch, and live shipment tracking."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      {/* 01. Delivery Locations */}
      <section id="coverage" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Delivery Locations</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          {businessConfig.brandName} delivers orders to serviceable PIN codes across India via established express courier logistics partners.
        </p>
      </section>

      {/* 02. Order Processing Time */}
      <section id="processing" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Order Processing Time</h2>
        </div>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#A56B4F]/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A56B4F]">Fulfillment Window</span>
          <p className="text-sm font-extrabold text-[#171310]">{businessConfig.shipping.processingTime}</p>
          <p className="text-xs text-[#6F6861]">Orders placed on Sundays or public holidays are dispatched on the next business day.</p>
        </div>
      </section>

      {/* 03. Delivery Estimates */}
      <section id="estimates" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Estimated Delivery Timeline</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Standard delivery typically arrives within <strong>{businessConfig.shipping.deliveryEstimate}</strong> following courier pickup.
        </p>
      </section>

      {/* 04. Shipping Charges */}
      <section id="charges" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Shipping Charges & Free Shipping</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          We offer <strong>Complimentary Free Shipping</strong> on all orders with a cart subtotal exceeding <strong>{businessConfig.shipping.freeShippingThreshold}</strong>.
        </p>
      </section>

      {/* 05. Order Tracking */}
      <section id="tracking" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">05</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Order Tracking</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Upon order dispatch, an email containing your courier tracking number (AWB) and live tracking link is transmitted automatically.
        </p>
        <Link href="/dashboard" className="inline-block text-xs font-bold text-[#A56B4F] hover:underline">
          Track Your Active Orders →
        </Link>
      </section>

      {/* 06. Damaged Package */}
      <section id="damaged-pkg" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">06</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Damaged Package or Delivery Issues</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          If your shipment outer carton is damaged, tampered with, or unsealed upon courier arrival, please decline acceptance and immediately inform customer support.
        </p>
      </section>
    </PolicyLayout>
  );
}
