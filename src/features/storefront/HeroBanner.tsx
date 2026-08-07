"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Wrench, Leaf, Truck, Compass, ArrowUpRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockData";

export function HeroBanner() {
  const featuredProduct = MOCK_PRODUCTS[0]; // Artisanal Terracotta Vessel or similar

  return (
    <section className="relative min-h-auto md:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2] py-8 lg:py-0">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[#D4A25A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-[#A56A3A]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-4 pb-12 lg:py-0">
        {/* 12-Column Grid Layout: Left 5 Columns, Right 7 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* MOBILE ORDER: 1. Hero Image (Shown on mobile above copy) */}
          <div className="block lg:hidden w-full order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-level-2 border border-[#E8DDD2]"
            >
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop"
                alt="Editorial luxury hero showcase"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* LEFT COLUMN: 5 Columns on Desktop (Desktop Order 1, Mobile Order 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 lg:space-y-8 text-left order-2 lg:order-1"
          >
            {/* Small Capsule Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-[#E8DDD2] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-[#A56A3A] shadow-level-1">
              <span>2026 COLLECTION</span>
            </div>

            {/* Main Editorial Heading with Bronze-Gold Gradient on "DESIGN." */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-normal tracking-tight text-[#151515] leading-[1.06]">
              UNCOMPROMISING <br />
              <span className="text-bronze-gradient font-semibold italic">DESIGN.</span> <br />
              TIMELESS LIVING.
            </h1>

            {/* Description (Max width 520px, 3 lines max, Soft Gray) */}
            <p className="text-xs sm:text-sm text-[#5F5F5F] leading-relaxed max-w-[520px] font-normal tracking-wide">
              An extraordinary collection of curated lifestyle artifacts, engineered with sustainable craftsmanship and timeless aesthetic discipline.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA Button */}
              <Link href="/shop" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-bronze-gradient text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-bronze-glow hover:-translate-y-1 flex items-center justify-center space-x-3 group min-h-[48px]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Secondary CTA Button */}
              <Link href="/shop" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white/80 backdrop-blur-md border border-[#E8DDD2] hover:bg-white text-[#151515] px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-1 flex items-center justify-center space-x-2 min-h-[48px]">
                  <Compass className="w-4 h-4 text-[#A56A3A]" />
                  <span>View Lookbook</span>
                </button>
              </Link>
            </div>

            {/* Trust Indicators (4 items with minimal icons) */}
            <div className="pt-6 border-t border-[#E8DDD2] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#5F5F5F]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#A56A3A] flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-wider">Handcrafted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-[#A56A3A] flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-wider">Lifetime Repair</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-[#A56A3A] flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-wider">Sustainable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#A56A3A] flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-wider">Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 7 Columns on Desktop (Desktop Hero Image + Floating Product Card) */}
          <div className="hidden lg:block lg:col-span-7 relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[36px] overflow-hidden shadow-level-3 border border-[#E8DDD2] group"
            >
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
                alt="Editorial luxury hero photography"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Featured Product Card (Bottom Right over Hero Image) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 w-80 glass-card p-4 rounded-3xl border border-white/80 shadow-level-3 z-20"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E8DDD2] flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A56A3A] block">
                    {featuredProduct.category}
                  </span>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#151515] truncate">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#A56A3A] mt-0.5">
                    ${featuredProduct.price.toFixed(2)}
                  </p>
                </div>
                <Link
                  href={`/shop/${featuredProduct.id}`}
                  className="p-2.5 bg-[#A56A3A] hover:bg-[#8C562B] text-white rounded-xl flex-shrink-0 transition-colors shadow-sm"
                  title="View Product"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* MOBILE ORDER: Floating Featured Product Card on Mobile */}
          <div className="block lg:hidden w-full order-3 pt-4">
            <div className="glass-card p-4 rounded-3xl border border-[#E8DDD2] shadow-level-2">
              <div className="flex items-center space-x-4">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#E8DDD2] flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A56A3A] block">
                    FEATURED ARTIFACT
                  </span>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#151515] truncate">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#A56A3A]">
                    ${featuredProduct.price.toFixed(2)}
                  </p>
                </div>
                <Link
                  href={`/shop/${featuredProduct.id}`}
                  className="p-2.5 bg-[#A56A3A] text-white rounded-xl flex-shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
