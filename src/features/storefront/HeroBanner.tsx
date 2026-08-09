"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { HeroImageSlider } from "@/features/storefront/HeroImageSlider";

export function HeroBanner() {
  return (
    <section className="relative bg-[#FAF7F2] border-b border-[#E6DED5] py-12 md:py-20 overflow-hidden">
      {/* Background Soft Lighting Radial Glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#A56B4F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#F2ECE4] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column — Editorial Campaign Copy (Completely Unchanged) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#F2ECE4] border border-[#E6DED5] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-[#A56B4F]">
              <Sparkles className="w-3.5 h-3.5 text-[#A56B4F]" />
              <span>NEW SEASON • 2026 REPERTOIRE</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171310] leading-[1.08]">
                Discover something <br />
                <span className="text-[#A56B4F] font-serif-luxury italic font-normal">worth owning.</span>
              </h1>
              <p className="text-sm md:text-base text-[#6F6861] max-w-lg leading-relaxed font-normal tracking-wide">
                Thoughtfully selected everyday lifestyle products, studio audio, tactile ceramics, and sustainable home furnishings chosen for quality, usefulness, and lasting value.
              </p>
            </div>

            {/* CTAs (Max 2 CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/shop">
                <button className="w-full sm:w-auto bg-[#171310] hover:bg-[#A56B4F] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-card min-h-[48px]">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/shop?sort=deals">
                <button className="w-full sm:w-auto bg-white border border-[#E6DED5] hover:bg-[#F2ECE4] text-[#181512] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 min-h-[48px]">
                  <span>Explore Deals</span>
                </button>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#E6DED5] grid grid-cols-3 gap-4 text-[#6F6861]">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#A56B4F] flex-shrink-0" />
                <span className="text-[11px] font-semibold">Free Shipping &gt; ₹999</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-[#A56B4F] flex-shrink-0" />
                <span className="text-[11px] font-semibold">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#347A52] flex-shrink-0" />
                <span className="text-[11px] font-semibold">100% Authentic</span>
              </div>
            </div>
          </div>

          {/* Right Column — Isolated Product Image Slider */}
          <div className="lg:col-span-6 relative">
            <HeroImageSlider />
          </div>

        </div>
      </div>
    </section>
  );
}
