"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { HeroBanner } from "@/features/storefront/HeroBanner";
import { CuratedEssentials } from "@/features/storefront/CuratedEssentials";
import { NewsletterSection } from "@/features/storefront/NewsletterSection";
import { ArrowRight, Star, Sparkles, Quote, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);

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
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow space-y-28 pt-4 pb-16">
        {/* Section 1: Hero Banner */}
        <HeroBanner />

        {/* Section 2: Curated Essentials Bento Grid */}
        <CuratedEssentials />

        {/* Section 3: Brand Story / Manifesto (Editorial Overlap) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="bg-white rounded-[40px] p-8 md:p-16 border border-[#ece0db] shadow-level-2 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
            {/* Left Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-level-2 border border-[#ece0db]">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                  alt="Minimalist design aesthetic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#201a18] text-white p-6 rounded-2xl max-w-xs shadow-level-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#faba90] block mb-1">
                  SUSTAINABLE PHILOSOPHY
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  100% zero-waste sourcing & ethical artisanal craftsmanship.
                </p>
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#845331]">
                <Sparkles className="w-3.5 h-3.5 text-[#845331]" />
                <span>OUR MANIFESTO</span>
              </div>
              <h2 className="font-serif-luxury text-4xl md:text-5xl font-normal text-[#201a18] leading-tight">
                Designed to Be Inherited, <br />
                Not Replaced.
              </h2>
              <p className="text-xs md:text-sm text-[#51443c] leading-relaxed tracking-wide">
                At LUXE, we believe modern luxury lies in restraint. We purge unnecessary ornamentation to highlight the intrinsic beauty of raw materials — raw terracotta, brass, unbleached linen, and solid walnut.
              </p>
              <div className="pt-4 border-t border-[#ece0db] flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#845331]">Maison LUXE</h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#84746b]">Est. 2026 • Paris</p>
                </div>
                <Link
                  href="/shop"
                  className="bg-[#201a18] hover:bg-[#845331] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 shadow-level-1"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Trending Now Product Showcase */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ece0db] pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#845331]">
                CURATED SELECTION
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal text-[#201a18]">
                Trending Artifacts
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-widest text-[#845331] hover:text-[#73482a] flex items-center space-x-1.5 transition-colors group"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 5: Editorial Testimonials */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#845331]">
              CLIENT REFLECTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal text-[#201a18]">
              Endorsed by Collectors Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-1 flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="w-8 h-8 text-[#faba90]/60 absolute top-6 right-6" />

                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#845331] text-[#845331]" />
                    ))}
                  </div>
                  <p className="font-serif-luxury text-lg text-[#201a18] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-[#f8ebe6]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#ece0db]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#201a18]">{t.author}</h4>
                    <p className="text-[11px] text-[#84746b]">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: Newsletter Section */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
