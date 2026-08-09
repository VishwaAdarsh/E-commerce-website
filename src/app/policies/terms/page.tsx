"use client";

import { PolicyLayout, PolicyTocItem } from "@/components/policies/PolicyLayout";
import { businessConfig } from "@/config/business";

export default function TermsPolicyPage() {
  const toc: PolicyTocItem[] = [
    { id: "intro", number: "01", title: "Introduction & Contract" },
    { id: "eligibility", number: "02", title: "Eligibility to Use Website" },
    { id: "account", number: "03", title: "Account Registration & Security" },
    { id: "products", number: "04", title: "Products, Pricing & Availability" },
    { id: "orders", number: "05", title: "Orders & Payment Terms" },
    { id: "ip", number: "06", title: "Intellectual Property Rights" },
    { id: "liability", number: "07", title: "Limitation of Liability" },
    { id: "law", number: "08", title: "Governing Law & Dispute Resolution" },
  ];

  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Standard legal conditions governing website usage, product ordering, accounts, and intellectual property."
      lastUpdated="August 10, 2026"
      toc={toc}
    >
      <section id="intro" className="space-y-3 scroll-mt-28">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">01</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Introduction & Legal Contract</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          These Terms and Conditions govern your access to and use of the website operated by {businessConfig.legalName} ("we", "us", or "{businessConfig.brandName}"). By visiting or purchasing from our platform, you agree to be legally bound by these terms.
        </p>
      </section>

      <section id="eligibility" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">02</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Eligibility to Use Website</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          You represent that you are at least the age of majority in your jurisdiction of residence, or that you have granted consent to allow your minor dependents to use this site.
        </p>
      </section>

      <section id="account" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">03</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Account Registration & Security</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Users are responsible for maintaining the strict confidentiality of their account authentication credentials and for restricting access to their personal computer or mobile devices.
        </p>
      </section>

      <section id="products" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">04</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Products, Pricing & Availability</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any product or service offering.
        </p>
      </section>

      <section id="orders" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">05</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Orders & Payment Terms</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          We reserve the right to refuse any order placed with us. Payments must be settled in full prior to dispatch using approved payment processing gateways.
        </p>
      </section>

      <section id="ip" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">06</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Intellectual Property Rights</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          All content included on this site, such as graphics, brand logos, product photography, text, and software code, is the property of {businessConfig.legalName} and protected by copyright laws.
        </p>
      </section>

      <section id="liability" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">07</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Limitation of Liability</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          In no event shall {businessConfig.legalName}, our directors, officers, employees, or affiliates be liable for any indirect, incidental, or consequential damages resulting from product use.
        </p>
      </section>

      <section id="law" className="space-y-3 scroll-mt-28 border-t border-[#E6DED5] pt-8">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#A56B4F] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6DED5]">08</span>
          <h2 className="font-display text-xl font-bold text-[#171310]">Governing Law & Jurisdiction</h2>
        </div>
        <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India, subject to exclusive court jurisdiction.
        </p>
      </section>
    </PolicyLayout>
  );
}
