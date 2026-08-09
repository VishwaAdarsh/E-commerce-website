"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";
import Link from "next/link";

export default function CancellationPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "window", number: "01", title: "Cancellation Window" },
    { id: "process", number: "02", title: "How to Cancel an Order" },
    { id: "post-shipment", number: "03", title: "Cancellation After Dispatch" },
    { id: "store-cancellation", number: "04", title: "Cancellations by Store" },
  ];

  return (
    <PolicyLayout
      title="Cancellation Policy"
      subtitle="Clear guidelines on order cancellation windows, customer self-service cancellation, and refund initiation."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      {/* 01. Cancellation Window */}
      <section id="window" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Order Cancellation Window</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Orders submitted at {businessConfig.brandName} may be cancelled by the customer prior to fulfillment dispatch.
        </p>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#A56B4F]/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A56B4F]">Cancellation Rule</span>
          <p className="text-sm font-extrabold text-[#171310]">{businessConfig.cancellations.cancellationWindow}</p>
        </div>
      </section>

      {/* 02. How to Cancel an Order */}
      <section id="process" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">How to Cancel Your Order</h2>
        </div>
        <ol className="list-decimal list-inside text-xs md:text-sm text-[#6F6861] space-y-2 pl-2">
          <li>Log in to your account and navigate to <strong>My Orders</strong> in the customer dashboard.</li>
          <li>Select the specific active order you wish to cancel.</li>
          <li>Click the <strong>Cancel Order</strong> button and choose your cancellation reason.</li>
          <li>Confirm cancellation. An instant email notification will confirm request receipt.</li>
        </ol>
      </section>

      {/* 03. Cancellation After Dispatch */}
      <section id="post-shipment" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Cancellation After Shipment Dispatch</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Once an order has been packaged and handed over to our logistics courier network, direct cancellation is no longer possible. Customers may refuse package delivery at the doorstep or initiate a return upon receipt according to our Return Policy.
        </p>
      </section>

      {/* 04. Store Cancellations */}
      <section id="store-cancellation" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Cancellations by Store</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          {businessConfig.brandName} reserves the right to cancel orders under circumstances including inventory unavailability, pricing errors, fraudulent transaction flags, or invalid shipping details. In such events, 100% full refund is processed.
        </p>
      </section>
    </PolicyLayout>
  );
}
