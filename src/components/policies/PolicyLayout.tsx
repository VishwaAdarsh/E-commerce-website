"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ShieldCheck, Clock, FileText, ArrowLeft } from "lucide-react";

export interface PolicyTocItem {
  id: string;
  number: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  toc: PolicyTocItem[];
  children: React.ReactNode;
}

export function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  toc,
  children,
}: PolicyLayoutProps) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-10 w-full space-y-10">
        {/* Header & Breadcrumb */}
        <div className="space-y-4 border-b border-[#E6DED5] pb-8">
          <div className="text-xs text-[#6F6861] flex items-center space-x-2 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-[#A56B4F]">Home</Link>
            <span>/</span>
            <Link href="/support" className="hover:text-[#A56B4F]">Support</Link>
            <span>/</span>
            <span className="text-[#181512] font-bold">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F] bg-white px-3 py-1 rounded-md border border-[#E6DED5] inline-block shadow-subtle">
                LEGAL & POLICY CENTER
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-[#171310]">
                {title}
              </h1>
              <p className="text-xs md:text-sm text-[#6F6861] max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-[#6F6861] bg-white px-4 py-2.5 rounded-xl border border-[#E6DED5] shadow-subtle flex-shrink-0">
              <Clock className="w-4 h-4 text-[#A56B4F]" />
              <span>Last updated: <strong className="text-[#181512]">{lastUpdated}</strong></span>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Table of Contents */}
        <div className="lg:hidden bg-white p-4 rounded-2xl border border-[#E6DED5] shadow-subtle">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-[#181512]"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#A56B4F]" />
              <span>Jump to Section ({toc.length})</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-[#6F6861] transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileTocOpen && (
            <div className="pt-3 mt-3 border-t border-[#E6DED5] space-y-2 text-xs">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className="block py-1 text-[#6F6861] hover:text-[#A56B4F] font-medium"
                >
                  <span className="text-[#A56B4F] font-bold mr-2">{item.number}</span>
                  {item.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Desktop Table of Contents (Left Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171310] border-b border-[#E6DED5] pb-2">
                On This Page
              </h3>
              <nav className="space-y-2 text-xs">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center space-x-2 p-2 rounded-xl text-[#6F6861] hover:text-[#181512] hover:bg-[#FAF7F2] transition-colors font-medium"
                  >
                    <span className="text-[10px] font-bold text-[#A56B4F] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6DED5]">
                      {item.number}
                    </span>
                    <span className="line-clamp-1">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy Content (Right Column) */}
          <div className="lg:col-span-9 bg-white p-8 md:p-12 rounded-3xl border border-[#E6DED5] shadow-card space-y-12 text-sm text-[#181512] leading-relaxed">
            {children}

            {/* Bottom Support Banner */}
            <div className="pt-8 border-t border-[#E6DED5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E6DED5]">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#171310]">Have additional questions?</h4>
                <p className="text-xs text-[#6F6861]">Our customer care team is available to assist you with order queries.</p>
              </div>
              <Link href="/support/contact">
                <button className="bg-[#171310] hover:bg-[#A56B4F] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
