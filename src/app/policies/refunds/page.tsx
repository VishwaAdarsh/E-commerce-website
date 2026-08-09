"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";
import Link from "next/link";
import { ShieldCheck, CreditCard, Clock, AlertCircle } from "lucide-react";

export default function RefundsPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "overview", number: "01", title: "Refund Overview" },
    { id: "eligibility", number: "02", title: "Refund Eligibility" },
    { id: "method", number: "03", title: "Refund Method" },
    { id: "timeline", number: "04", title: "Expected Processing Timeline" },
    { id: "gateway", number: "05", title: "Payment Gateway Processing" },
    { id: "failed", number: "06", title: "Failed or Delayed Refunds" },
  ];

  return (
    <PolicyLayout
      title="Refund Policy"
      subtitle="Complete guidelines on refund approval criteria, payment gateway processing, and timeline expectations."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      {/* 01. Refund Overview */}
      <section id="overview" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Refund Overview</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Refunds at {businessConfig.brandName} are issued following successful inspection and approval of an eligible return or order cancellation. This policy outlines customer expectations regarding funds disbursement.
        </p>
      </section>

      {/* 02. Refund Eligibility */}
      <section id="eligibility" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Refund Eligibility</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          A refund is approved when:
        </p>
        <ul className="list-disc list-inside text-xs md:text-sm text-[#6F6861] space-y-1.5 pl-2">
          <li>A returned product successfully passes quality evaluation inspection.</li>
          <li>An order is cancelled prior to shipment dispatch.</li>
          <li>An order is declared unfulfilled or lost in transit by logistics partners.</li>
        </ul>
      </section>

      {/* 03. Refund Method */}
      <section id="method" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Refund Disbursement Method</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Approved refunds are credited directly to the original payment source (Credit/Debit Card, Net Banking, UPI, or Digital Wallet) used during transaction checkout.
        </p>
      </section>

      {/* 04. Expected Processing Timeline */}
      <section id="timeline" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Expected Processing Timeline</h2>
        </div>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#A56B4F]/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A56B4F]">Processing Window</span>
          <p className="text-sm font-extrabold text-[#171310]">{businessConfig.refunds.processingTime}</p>
          <p className="text-xs text-[#6F6861]">Calculated from the date of refund approval notice.</p>
        </div>
      </section>

      {/* 05. Payment Gateway Processing */}
      <section id="gateway" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">05</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Payment Processing System</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Once a refund is authorized, the request is transmitted through our secure financial payment processing system. Depending on banking network clearance, funds reflect on bank statements within standard settlement cycles.
        </p>
      </section>

      {/* 06. Failed or Delayed Refunds */}
      <section id="failed" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">06</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Delayed or Missing Refunds</h2>
        </div>
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2 text-xs">
          <p className="text-[#6F6861]">
            If you have not received your refund after the expected processing window, please check your bank account statement and contact your issuing card bank.
          </p>
          <Link href="/support/contact" className="inline-block font-bold text-[#A56B4F] hover:underline">
            Contact Customer Support Team →
          </Link>
        </div>
      </section>
    </PolicyLayout>
  );
}
