"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";
import Link from "next/link";
import { ShieldCheck, RotateCcw, Package, AlertCircle } from "lucide-react";

export default function ReturnsPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "overview", number: "01", title: "Overview" },
    { id: "eligibility", number: "02", title: "Return Eligibility" },
    { id: "window", number: "03", title: "Return Window" },
    { id: "process", number: "04", title: "How to Request a Return" },
    { id: "inspection", number: "05", title: "Return Inspection" },
    { id: "shipping", number: "06", title: "Return Shipping" },
    { id: "non-returnable", number: "07", title: "Non-Returnable Items" },
    { id: "damaged", number: "08", title: "Damaged or Wrong Products" },
  ];

  return (
    <PolicyLayout
      title="Return Policy"
      subtitle="Clear and simple information about product return eligibility, request steps, and guidelines."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      {/* 01. Overview */}
      <section id="overview" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Overview</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          At {businessConfig.brandName}, operated by {businessConfig.legalName}, we strive to ensure that every artifact delivered meets our high standards of quality and craftsmanship. Customers are advised to carefully review this policy prior to submitting a return request.
        </p>
      </section>

      {/* 02. Return Eligibility */}
      <section id="eligibility" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Return Eligibility Criteria</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          To qualify for a return, the item must satisfy all of the following conditions:
        </p>
        <ul className="list-disc list-inside text-xs md:text-sm text-[#6F6861] space-y-2 pl-2">
          <li>The product must be unused, unwashed, and in its original pristine condition.</li>
          <li>Original brand tags, serialized certificates, and protective packaging must remain intact.</li>
          <li>All accompanying accessories, manuals, and bonus components must be returned.</li>
          <li>Proof of purchase (Order Number or Invoice) is mandatory.</li>
        </ul>
      </section>

      {/* 03. Return Window */}
      <section id="window" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Return Window</h2>
        </div>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#A56B4F]/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A56B4F]">Configured Return Duration</span>
          <p className="text-sm font-extrabold text-[#171310]">{businessConfig.returns.returnWindowDays}</p>
          <p className="text-xs text-[#6F6861]">Calculated from the date of physical delivery confirmation.</p>
        </div>
      </section>

      {/* 04. How to Request a Return */}
      <section id="process" className="space-y-4 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">How to Request a Return</h2>
        </div>

        {/* Visual Process Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-1">
            <span className="text-xs font-bold text-[#A56B4F]">STEP 01</span>
            <h4 className="text-xs font-bold text-[#181512]">Go to My Orders</h4>
            <p className="text-[11px] text-[#6F6861]">Access customer portal</p>
          </div>
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-1">
            <span className="text-xs font-bold text-[#A56B4F]">STEP 02</span>
            <h4 className="text-xs font-bold text-[#181512]">Select Item & Reason</h4>
            <p className="text-[11px] text-[#6F6861]">Choose return category</p>
          </div>
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-1">
            <span className="text-xs font-bold text-[#A56B4F]">STEP 03</span>
            <h4 className="text-xs font-bold text-[#181512]">Upload Verification</h4>
            <p className="text-[11px] text-[#6F6861]">Attach product photos</p>
          </div>
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-1">
            <span className="text-xs font-bold text-[#A56B4F]">STEP 04</span>
            <h4 className="text-xs font-bold text-[#181512]">Pickup & Inspection</h4>
            <p className="text-[11px] text-[#6F6861]">Logistics courier collection</p>
          </div>
        </div>
      </section>

      {/* 05. Return Inspection */}
      <section id="inspection" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">05</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Return Inspection</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          All returned products undergo thorough physical quality evaluation at our fulfillment center upon receipt. If an item fails inspection due to unauthorized usage or deliberate damage, it will be dispatched back to the customer.
        </p>
      </section>

      {/* 06. Return Shipping */}
      <section id="shipping" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">06</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Return Shipping Rules</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Return logistics pick-up will be scheduled via our authorized courier partners. {businessConfig.returns.returnShippingFee}
        </p>
      </section>

      {/* 07. Non-Returnable Items */}
      <section id="non-returnable" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">07</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Non-Returnable Categories</h2>
        </div>
        <ul className="list-disc list-inside text-xs md:text-sm text-[#6F6861] space-y-1.5 pl-2">
          <li>Custom bespoke engraved or customized products</li>
          <li>Personal care, self-care, or intimate lifestyle items</li>
          <li>Clearance archive sale items explicitly marked Non-Returnable</li>
          <li>Digital gift cards and electronic promo vouchers</li>
        </ul>
      </section>

      {/* 08. Damaged / Wrong Product */}
      <section id="damaged" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">08</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Damaged or Incorrect Items</h2>
        </div>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#B74747]/30 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-[#B74747] font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Immediate Support Claim</span>
          </div>
          <p className="text-[#6F6861]">
            If your package arrived visibly damaged, missing components, or incorrect, please notify customer care within 48 hours of delivery with unboxing photos.
          </p>
          <Link href="/support/contact" className="inline-block pt-1 font-bold text-[#A56B4F] hover:underline">
            Submit Support Ticket →
          </Link>
        </div>
      </section>
    </PolicyLayout>
  );
}
