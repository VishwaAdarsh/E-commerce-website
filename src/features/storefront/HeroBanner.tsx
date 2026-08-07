"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Sparkles, Compass } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#fff8f6] py-12 md:py-0">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#faba90]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#845331]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        {/* Left Column: Huge Editorial Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-8 text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-[#f8ebe6] border border-[#ece0db] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-[#845331]">
            <Sparkles className="w-3.5 h-3.5 text-[#845331]" />
            <span>2026 EDITION • EARTH & ARTIFACT</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#201a18] leading-[1.08]">
              Uncompromising <br />
              <span className="italic font-light text-[#845331]">Design</span> & Detail.
            </h1>
            <p className="text-sm md:text-base text-[#51443c] leading-relaxed max-w-lg font-normal tracking-wide">
              An extraordinary collection of curated lifestyle artifacts, engineered with sustainable craftsmanship and timeless aesthetic discipline.
            </p>
          </div>

          {/* Luxury CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/shop">
              <button className="bg-[#845331] hover:bg-[#73482a] text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-2 hover:shadow-level-3 flex items-center space-x-3 group">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/shop">
              <button className="bg-white border border-[#d6c3b8] hover:bg-[#f8ebe6] text-[#201a18] px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-1 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#845331]" />
                <span>View Lookbook</span>
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-[#ece0db] grid grid-cols-3 gap-4 text-[#84746b]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#845331] flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-wider">Artisanal Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#845331] flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-wider">Lifetime Repair</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#845331] flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-wider">Sustainable Sourcing</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Layered Editorial Image Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative"
        >
          {/* Main Hero Featured Image */}
          <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden shadow-level-3 border border-[#ece0db] group">
            <img
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
              alt="White ceramic vase with eucalyptus on natural wood"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#201a18]/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-level-2 flex items-center justify-between text-[#201a18]">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#845331] block">
                  FEATURED ARTIFACT NO. 01
                </span>
                <h4 className="font-serif-luxury text-lg font-bold">Artisanal Terracotta Vessel</h4>
              </div>
              <span className="text-sm font-extrabold text-[#845331]">$180.00</span>
            </div>
          </div>

          {/* Floating Accent Badge (Top Right) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 hidden sm:flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-level-2 border border-[#ece0db]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#faba90] text-[#774827] flex items-center justify-center font-bold text-xs">
              ★ 4.9
            </div>
            <div>
              <p className="text-xs font-bold text-[#201a18]">1,200+ Verified Buyers</p>
              <p className="text-[10px] text-[#84746b]">5-Star Luxury Rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
