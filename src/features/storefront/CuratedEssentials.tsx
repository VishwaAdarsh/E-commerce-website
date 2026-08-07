"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function CuratedEssentials() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ece0db] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#845331]">
            <Sparkles className="w-3 h-3 text-[#845331]" />
            <span>EDITORIAL COLLECTIONS</span>
          </div>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-normal tracking-tight text-[#201a18]">
            Curated Essentials & Spaces
          </h2>
        </div>
        <p className="text-xs text-[#51443c] max-w-md leading-relaxed font-normal tracking-wide">
          Explore thoughtfully composed lifestyle chapters designed to elevate every daily ceremony with quiet elegance.
        </p>
      </div>

      {/* Asymmetrical Magazine Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Featured Main Story (Left) */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative min-h-[460px] rounded-[32px] overflow-hidden group shadow-level-2 border border-[#ece0db] cursor-pointer"
        >
          <Link href="/shop">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
              alt="The Minimalist Home"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201a18]/85 via-[#201a18]/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#faba90] mb-2">
                COLLECTION NO. 01 • LIVING SPACE
              </span>
              <h3 className="font-serif-luxury text-3xl md:text-4xl font-normal mb-3">
                The Minimalist Sanctuary
              </h3>
              <p className="text-xs text-white/80 max-w-md leading-relaxed mb-6 font-normal">
                Pure lines, natural terracotta finishes, and sculptural objects that anchor calm in modern environments.
              </p>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#faba90] transition-colors">
                <span>Discover Chapter</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Stacked Secondary Collections (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Self Care & Wellness */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[215px] rounded-[28px] overflow-hidden group shadow-level-1 border border-[#ece0db] cursor-pointer"
          >
            <Link href="/shop">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                alt="Wellness Routine"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a18]/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#faba90] mb-1">
                  COLLECTION NO. 02 • WELLNESS
                </span>
                <h3 className="font-serif-luxury text-2xl font-normal">Artisanal Self-Care</h3>
                <div className="flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest text-white mt-2 group-hover:text-[#faba90] transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Everyday Accessories */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[215px] rounded-[28px] overflow-hidden group shadow-level-1 border border-[#ece0db] cursor-pointer"
          >
            <Link href="/shop">
              <img
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"
                alt="Everyday Carry"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a18]/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#faba90] mb-1">
                  COLLECTION NO. 03 • ACCESSORIES
                </span>
                <h3 className="font-serif-luxury text-2xl font-normal">Precision Accessories</h3>
                <div className="flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest text-white mt-2 group-hover:text-[#faba90] transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
