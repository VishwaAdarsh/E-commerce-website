"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";

export default function PrivacyPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "collect", number: "01", title: "Information We Collect" },
    { id: "usage", number: "02", title: "How Information is Used" },
    { id: "sharing", number: "03", title: "Third-Party Data Sharing" },
    { id: "cookies", number: "04", title: "Cookies & Tracking" },
    { id: "security", number: "05", title: "Data Security Standards" },
    { id: "rights", number: "06", title: "Your User Privacy Rights" },
  ];

  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How we collect, protect, use, and process your personal information across our website and services."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      <section id="collect" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Information We Collect</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          {businessConfig.legalName} collects information you provide directly to us when creating an account, placing an order, subscribing to newsletters, or contacting customer support (such as your name, email address, phone number, and delivery address).
        </p>
      </section>

      <section id="usage" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">How Information is Used</h2>
        </div>
        <ul className="list-disc list-inside text-xs md:text-sm text-[#6F6861] space-y-1.5 pl-2">
          <li>To process and fulfill orders, issue invoices, and manage logistics dispatch.</li>
          <li>To communicate order status updates, delivery tracking, and support responses.</li>
          <li>To detect and prevent fraudulent transactions and secure account access.</li>
        </ul>
      </section>

      <section id="sharing" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Third-Party Service Providers</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          We share relevant customer data strictly with authorized service providers essential for store operations:
        </p>
        <ul className="list-disc list-inside text-xs md:text-sm text-[#6F6861] space-y-1.5 pl-2">
          <li><strong>Payment Processors:</strong> Encrypted transaction handling via payment gateways.</li>
          <li><strong>Logistics Couriers:</strong> Delivery name, address, and phone number shared for shipping dispatch.</li>
        </ul>
      </section>

      <section id="cookies" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Cookies & Session Tokens</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          We use essential session cookies and browser storage to maintain your logged-in session state and retain items inside your shopping cart.
        </p>
      </section>

      <section id="security" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">05</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Data Security Standards</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          We implement technical safeguards including SSL/TLS 256-bit encryption for data in transit and restricted database access control.
        </p>
      </section>

      <section id="rights" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">06</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Your Privacy Rights</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          You may request access to, correction of, or deletion of your personal account data by contacting our support team at {businessConfig.support.email}.
        </p>
      </section>
    </PolicyLayout>
  );
}
