"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Leaf, 
  Play, 
  Package, 
  Lock, 
  Headphones, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@/data/mockData";

interface BannerSlide {
  id: number;
  tag: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subtitle: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  productSpotlight: Product;
}

export function HeroBanner() {
  const slides: BannerSlide[] = [
    {
      id: 1,
      tag: "COLLECTION 2026 • CERAMICS",
      headlineLine1: "UNCOMPROMISING",
      headlineHighlight: "DESIGN.",
      headlineLine2: "TIMELESS LIVING.",
      subtitle: "Curated artifacts for the modern home. Designed to inspire, crafted to last.",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
      primaryCtaText: "EXPLORE COLLECTION",
      primaryCtaLink: "/shop",
      secondaryCtaText: "VIEW LOOKBOOK",
      productSpotlight: MOCK_PRODUCTS[0], // Terracotta Vessel
    },
    {
      id: 2,
      tag: "SPECIAL EDITION • AUDIO & TECH",
      headlineLine1: "PRECISION",
      headlineHighlight: "ACOUSTICS.",
      headlineLine2: "ELEVATED WORKSPACE.",
      subtitle: "Studio-grade sound and CNC milled mechanical equipment engineered for absolute focus.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      primaryCtaText: "SHOP TECHNOLOGY",
      primaryCtaLink: "/shop?category=TECHNOLOGY",
      secondaryCtaText: "LISTEN AUDIO",
      productSpotlight: MOCK_PRODUCTS[7], // Over-Ear Headphones
    },
    {
      id: 3,
      tag: "NEW RELEASES • SPATIAL DECOR",
      headlineLine1: "ARCHITECTURAL",
      headlineHighlight: "LIGHTING.",
      headlineLine2: "ORGANIC TEXTILES.",
      subtitle: "Pure linen weaves, weighted brass desk lamps, Peruvian alpaca blankets for quiet luxury.",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      primaryCtaText: "VIEW LIGHTING",
      primaryCtaLink: "/shop?category=LIGHTING",
      secondaryCtaText: "EXPLORE TEXTILES",
      productSpotlight: MOCK_PRODUCTS[8], // Architectural Lamp
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play 5-second interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="flex flex-col w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Main Banner Carousel Dark Hero (Full Height on Desktop) */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-[#14110F] text-white overflow-hidden pt-4 pb-12 lg:py-0">
        
        {/* Soft Ambient Spotlight Glows */}
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#D49B53]/20 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#382E29]/40 rounded-full blur-[160px] pointer-events-none" />

        {/* Next / Previous Navigation Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/10 hover:bg-[#D49B53] text-white hover:text-[#14110F] transition-all backdrop-blur-md border border-white/10 hidden md:flex items-center justify-center shadow-2xl"
          title="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/10 hover:bg-[#D49B53] text-white hover:text-[#14110F] transition-all backdrop-blur-md border border-white/10 hidden md:flex items-center justify-center shadow-2xl"
          title="Next Banner"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[78vh]"
            >
              
              {/* MOBILE ORDER: 1. Hero Image (Shown on mobile above copy) */}
              <div className="block lg:hidden w-full order-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.headlineLine1}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* LEFT COLUMN: 6 Columns - Copy & Actions */}
              <div className="lg:col-span-6 space-y-7 order-2 lg:order-1 text-left">
                {/* Capsule Tag */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-[#D49B53]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49B53]" />
                  <span>{activeSlide.tag}</span>
                </div>

                {/* Massive Headline */}
                <div className="space-y-1">
                  <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-[#FAF7F2] uppercase leading-[0.98]">
                    {activeSlide.headlineLine1} <br />
                    <span className="text-gold-gradient">{activeSlide.headlineHighlight}</span> <br />
                    {activeSlide.headlineLine2}
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#C5BDB7] tracking-wide max-w-lg font-normal leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link href={activeSlide.primaryCtaLink} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-gold-btn text-[#14110F] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 group min-h-[48px]">
                      <span>{activeSlide.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#14110F]" />
                    </button>
                  </Link>

                  <Link href="/shop" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-[#4A3C35] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2.5 min-h-[48px]">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                      </div>
                      <span>{activeSlide.secondaryCtaText}</span>
                    </button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#D49B53]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">ARTISANAL QUALITY</h4>
                      <p className="text-[10px] text-[#A89F99]">Handcrafted with care</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#D49B53]">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">LIFETIME REPAIR</h4>
                      <p className="text-[10px] text-[#A89F99]">For every purchase</p>
                    </div>
                  </div>

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
              </div>

              {/* RIGHT COLUMN: 6 Columns - Slide Image & Synced Spotlight Product Glass Card */}
              <div className="hidden lg:block lg:col-span-6 relative order-1 lg:order-2">
                <div className="relative aspect-[1/1] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.headlineLine1}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Synced Spotlight Card */}
                <div className="absolute -bottom-6 right-4 w-80 glass-card-dark p-4 rounded-3xl z-20 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <img
                      src={activeSlide.productSpotlight.image}
                      alt={activeSlide.productSpotlight.name}
                      className="w-16 h-16 rounded-full object-cover border border-[#D49B53]/40 flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#D49B53] block">
                        FEATURED ARTIFACT
                      </span>
                      <h4 className="font-serif-luxury text-sm font-bold text-white truncate">
                        {activeSlide.productSpotlight.name}
                      </h4>
                      <p className="text-xs font-extrabold text-[#D49B53] mt-0.5">
                        ${activeSlide.productSpotlight.price.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      href={`/shop/${activeSlide.productSpotlight.id}`}
                      className="p-2.5 bg-[#D49B53] hover:bg-[#B87E39] text-[#14110F] rounded-xl flex-shrink-0 transition-colors"
                      title="View Product"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Slide Progress / Pagination Indicator Bar */}
          <div className="flex items-center justify-center space-x-4 pt-10">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className="flex items-center space-x-2 py-2 group focus:outline-none"
              >
                <span className={`text-[10px] font-bold transition-colors ${idx === currentSlide ? "text-[#D49B53]" : "text-[#A89F99]"}`}>
                  0{idx + 1}
                </span>
                <div className={`h-[2px] rounded-full transition-all duration-500 ${idx === currentSlide ? "w-12 bg-[#D49B53]" : "w-6 bg-white/20 group-hover:bg-white/40"}`} />
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Bottom Features Guarantee Strip (Off-White Background) */}
      <section className="bg-[#FAF7F2] text-[#151515] py-8 border-y border-[#E8DDD2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-[#E8DDD2]">
            
            <div className="flex flex-col items-center p-3 space-y-2">
              <Package className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">FREE SHIPPING</h4>
                <p className="text-[11px] text-[#5F5F5F]">On orders over $150</p>
              </div>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2">
              <RefreshCw className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">EASY RETURNS</h4>
                <p className="text-[11px] text-[#5F5F5F]">30-day return policy</p>
              </div>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2">
              <Lock className="w-6 h-6 text-[#A56A3A]" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">SECURE PAYMENT</h4>
                <p className="text-[11px] text-[#5F5F5F]">100% secure checkout</p>
              </div>
            </div>

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
