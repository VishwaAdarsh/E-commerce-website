"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Leaf, 
  Play, 
  Package, 
  Lock, 
  Headphones, 
  ArrowUpRight 
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockData";

export function HeroBanner() {
  const featuredProduct = MOCK_PRODUCTS[0];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Main Hero Dark Section (100vh on Desktop) */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#14110F] text-white overflow-hidden pt-6 pb-12 lg:py-0">
        
        {/* Soft Dramatic Spotlight Lighting behind right ceramics */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#D49B53]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#382E29]/40 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[80vh]">
            
            {/* MOBILE ORDER: 1. Hero Image (Shown on mobile above copy) */}
            <div className="block lg:hidden w-full order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop"
                  alt="Artisanal Terracotta Vessels"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>

            {/* LEFT COLUMN: 6 Columns - Editorial Headline, Description, CTAs, Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8 order-2 lg:order-1 text-left"
            >
              {/* Massive Headline matching exact mockup text and gradient */}
              <div className="space-y-1">
                <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-[#FAF7F2] uppercase leading-[0.98]">
                  UNCOMPROMISING <br />
                  <span className="text-gold-gradient">DESIGN.</span> <br />
                  TIMELESS LIVING.
                </h1>
              </div>

              {/* Subtitle / Description */}
              <div className="space-y-1 text-xs sm:text-sm text-[#C5BDB7] tracking-wide max-w-lg font-normal leading-relaxed">
                <p>Curated artifacts for the modern home.</p>
                <p>Designed to inspire. Crafted to last.</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Primary CTA */}
                <Link href="/shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-gold-btn text-[#14110F] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 group min-h-[48px]">
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#14110F]" />
                  </button>
                </Link>

                {/* Secondary CTA */}
                <Link href="/shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-[#4A3C35] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2.5 min-h-[48px]">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                    </div>
                    <span>VIEW LOOKBOOK</span>
                  </button>
                </Link>
              </div>

              {/* Trust Indicators (3 Horizontal Badges) */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
                {/* Badge 1 */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#D49B53]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">ARTISANAL QUALITY</h4>
                    <p className="text-[10px] text-[#A89F99]">Handcrafted with care</p>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#D49B53]">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">LIFETIME REPAIR</h4>
                    <p className="text-[10px] text-[#A89F99]">For every purchase</p>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#D49B53]">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">SUSTAINABLE SOURCING</h4>
                    <p className="text-[10px] text-[#A89F99]">Eco-conscious choice</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: 6 Columns - Dramatic Photography & Floating Glass Card */}
            <div className="hidden lg:block lg:col-span-6 relative order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] lg:aspect-[1/1] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop"
                  alt="Artisanal Ceramic & Terracotta Tableware"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/80 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Featured Product Card (Bottom Right of Image) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 right-4 w-80 glass-card-dark p-4 rounded-3xl z-20 shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-16 h-16 rounded-full object-cover border border-[#D49B53]/40 flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D49B53] block">
                      FEATURED ARTIFACT
                    </span>
                    <h4 className="font-serif-luxury text-sm font-bold text-white truncate">
                      {featuredProduct.name}
                    </h4>
                    <p className="text-xs font-extrabold text-[#D49B53] mt-0.5">
                      ${featuredProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    href={`/shop/${featuredProduct.id}`}
                    className="p-2.5 bg-[#D49B53] hover:bg-[#B87E39] text-[#14110F] rounded-xl flex-shrink-0 transition-colors"
                    title="View Product"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Bottom Features Strip (Off-White Background matching mockup bottom) */}
      <section className="bg-[#FAF7F2] text-[#151515] py-8 border-y border-[#E8DDD2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-[#E8DDD2]">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-3 space-y-2">
              <Package className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">FREE SHIPPING</h4>
                <p className="text-[11px] text-[#5F5F5F]">On orders over $150</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center p-3 space-y-2">
              <RefreshCw className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">EASY RETURNS</h4>
                <p className="text-[11px] text-[#5F5F5F]">30-day return policy</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center p-3 space-y-2">
              <Lock className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">SECURE PAYMENT</h4>
                <p className="text-[11px] text-[#5F5F5F]">100% secure checkout</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center p-3 space-y-2">
              <Headphones className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">24/7 SUPPORT</h4>
                <p className="text-[11px] text-[#5F5F5F]">We're here to help</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
