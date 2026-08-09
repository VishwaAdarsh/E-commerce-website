"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS, Product } from "@/data/mockData";
import { HeroBanner } from "@/features/storefront/HeroBanner";
import { CuratedEssentials } from "@/features/storefront/CuratedEssentials";
import { NewsletterSection } from "@/features/storefront/NewsletterSection";
import { ArrowRight, Star, Sparkles, Quote, Filter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeTabFilter, setActiveTabFilter] = useState<"FEATURED" | "BESTSELLERS" | "NEW" | "OFFERS">("FEATURED");

  const categories = [
    { id: "ALL", label: "ALL ARTIFACTS" },
    { id: "DECOR", label: "CERAMICS & DECOR" },
    { id: "FURNITURE", label: "FURNITURE & LOUNGE" },
    { id: "TECHNOLOGY", label: "AUDIO & TECH" },
    { id: "TEXTILES", label: "LINENS & TEXTILES" },
    { id: "LIGHTING", label: "LAMPS & LIGHTING" },
    { id: "KITCHENWARE", label: "TABLEWARE" },
  ];

  // Filter logic for products below the hero banners
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    // Category check
    if (selectedCategory !== "ALL" && product.category !== selectedCategory) {
      return false;
    }
    // Tab filter check
    if (activeTabFilter === "BESTSELLERS") return product.isBestseller;
    if (activeTabFilter === "NEW") return product.isNew;
    if (activeTabFilter === "OFFERS") return Boolean(product.originalPrice);
    return true;
  });

  const testimonials = [
    {
      id: 1,
      quote: "LUXE delivers an unmatched level of refinement. Every piece feels like a private gallery acquisition.",
      author: "Victoria Sterling",
      title: "Interior Architect, London",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      quote: "Uncompromising materials and packaging. The attention to detail makes every daily ritual feel extraordinary.",
      author: "Julian Vance",
      title: "Creative Director, New York",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      quote: "From ordering to unboxing, the Maison experience is seamless. Worth every investment.",
      author: "Camille Dupont",
      title: "Fashion Editor, Paris",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#151515]">
      <Navbar />

      <main className="flex-grow space-y-20 pb-16">
        {/* Section 1: Hero Banner Carousel */}
        <HeroBanner />

        {/* Section 2: Interactive Category Bar & Multiple Products Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10 pt-4">
          
          {/* Header & Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8DDD2] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#A56A3A]">
                <Sparkles className="w-3.5 h-3.5 text-[#A56A3A]" />
                <span>CURATED REPERTOIRE</span>
              </div>
              <h2 className="font-serif-luxury text-3xl md:text-5xl font-normal tracking-tight text-[#151515]">
                Explore Luxury Artifacts
              </h2>
            </div>
            <p className="text-xs text-[#5F5F5F] max-w-md leading-relaxed font-normal tracking-wide">
              Handpicked lifestyle objects, tactile ceramics, studio audio, and furniture engineered with sustainable precision.
            </p>
          </div>

          {/* Interactive Category Pill Scroll Bar */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#151515] text-[#FAF7F2] shadow-lg scale-105"
                    : "bg-white border border-[#E8DDD2] text-[#5F5F5F] hover:bg-[#F5EFE6] hover:text-[#151515]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tab Sub-Filter Controls (Featured, Bestsellers, New, Offers) */}
          <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-[#E8DDD2] shadow-sm">
            <div className="flex items-center space-x-2">
              {(["FEATURED", "BESTSELLERS", "NEW", "OFFERS"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTabFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTabFilter === tab
                      ? "bg-[#A56A3A] text-white shadow-sm"
                      : "text-[#5F5F5F] hover:text-[#151515]"
                  }`}
                >
                  {tab === "NEW" ? "NEW ARRIVALS" : tab === "OFFERS" ? "SPECIAL OFFERS" : tab}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#5F5F5F] font-medium hidden sm:inline px-4">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Multiple Products Display Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${activeTabFilter}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DDD2] space-y-3">
              <p className="font-serif-luxury text-2xl text-[#151515]">
                No artifacts match your selected filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setActiveTabFilter("FEATURED");
                }}
                className="bg-[#A56A3A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* View Full Catalog Link */}
          <div className="text-center pt-4">
            <Link href="/shop">
              <button className="bg-white border border-[#E8DDD2] hover:bg-[#F5EFE6] text-[#151515] px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm inline-flex items-center space-x-3 group">
                <span>View Full Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#A56A3A]" />
              </button>
            </Link>
          </div>

        </section>

        {/* Section 3: Curated Essentials Bento Grid */}
        <CuratedEssentials />

        {/* Section 4: Brand Story / Manifesto */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="bg-white rounded-[40px] p-8 md:p-16 border border-[#E8DDD2] shadow-level-2 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-level-2 border border-[#E8DDD2]">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                  alt="Minimalist design aesthetic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#151515] text-white p-6 rounded-2xl max-w-xs shadow-2xl border border-white/10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D49B53] block mb-1">
                  SUSTAINABLE PHILOSOPHY
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  100% zero-waste sourcing & ethical artisanal craftsmanship.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#A56A3A]">
                <Sparkles className="w-3.5 h-3.5 text-[#A56A3A]" />
                <span>OUR MANIFESTO</span>
              </div>
              <h2 className="font-serif-luxury text-4xl md:text-5xl font-normal text-[#151515] leading-tight">
                Designed to Be Inherited, <br />
                Not Replaced.
              </h2>
              <p className="text-xs md:text-sm text-[#5F5F5F] leading-relaxed tracking-wide">
                At LUXE, we believe modern luxury lies in restraint. We purge unnecessary ornamentation to highlight the intrinsic beauty of raw materials — raw terracotta, brass, unbleached linen, and solid ash wood.
              </p>
              <div className="pt-4 border-t border-[#E8DDD2] flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#A56A3A]">Maison LUXE</h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#5F5F5F]">Est. 2026 • Paris & New York</p>
                </div>
                <Link
                  href="/shop"
                  className="bg-[#151515] hover:bg-[#A56A3A] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Editorial Testimonials */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#A56A3A]">
              CLIENT REFLECTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal text-[#151515]">
              Endorsed by Collectors Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 border border-[#E8DDD2] shadow-level-1 flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="w-8 h-8 text-[#D49B53]/40 absolute top-6 right-6" />

                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A56A3A] text-[#A56A3A]" />
                    ))}
                  </div>
                  <p className="font-serif-luxury text-lg text-[#151515] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-[#F5EFE6]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#E8DDD2]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#151515]">{t.author}</h4>
                    <p className="text-[11px] text-[#5F5F5F]">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: Newsletter Callout */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
