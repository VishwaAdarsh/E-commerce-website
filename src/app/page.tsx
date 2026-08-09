"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { HeroBanner } from "@/features/storefront/HeroBanner";
import { ArrowRight, Sparkles, Clock, ChevronRight, ChevronLeft, ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Category Discovery Data
  const categories = [
    {
      name: "Ceramics & Decor",
      count: "48 Products",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=DECOR",
    },
    {
      name: "Furniture & Lounge",
      count: "32 Products",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=FURNITURE",
    },
    {
      name: "Audio & Technology",
      count: "54 Products",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=TECHNOLOGY",
    },
    {
      name: "Textiles & Linens",
      count: "29 Products",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=TEXTILES",
    },
    {
      name: "Lamps & Lighting",
      count: "18 Products",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=LIGHTING",
    },
    {
      name: "Tableware & Kitchen",
      count: "36 Products",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop",
      href: "/shop?category=KITCHENWARE",
    },
  ];

  // Deal Countdown Timer (04:32:18)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 18 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = MOCK_PRODUCTS.slice(0, 8);
  const bestSellerProducts = MOCK_PRODUCTS.filter((p) => p.isBestseller || p.rating >= 4.8);
  const todayDeals = MOCK_PRODUCTS.filter((p) => p.originalPrice);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow space-y-16 pb-16">
        {/* Section 1 — Hero */}
        <HeroBanner />

        {/* Section 2 — Shop by Category Discovery */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#181512]">
                Shop by Category
              </h2>
              <p className="text-xs text-[#6F6861] mt-1">Explore our structured product repertoire.</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#A56B4F] hover:underline flex items-center space-x-1">
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="group block">
                <div className="bg-white rounded-2xl p-3 border border-[#E6DED5] shadow-subtle hover:shadow-card hover:border-[#A56B4F] transition-all space-y-3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#F2ECE4]">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-hover-zoom" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#181512] group-hover:text-[#A56B4F] transition-colors leading-tight">
                      {cat.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-[#6F6861]">
                      <span>{cat.count}</span>
                      <span className="text-[#A56B4F] font-bold group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3 — Promotional Campaign Band */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#171310] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-card border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F] bg-white/10 px-3 py-1 rounded-md border border-white/10 inline-block">
                MID-SEASON EDIT
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                Up to 40% Off Selected Artifacts
              </h2>
              <p className="text-xs md:text-sm text-[#E6DED5]/80 max-w-lg leading-relaxed">
                Discover limited-quantity promotions on studio acoustics, handcrafted tableware, and linen home furnishings.
              </p>
              <div className="pt-2">
                <Link href="/shop?sort=deals">
                  <button className="bg-[#A56B4F] hover:bg-[#8E5840] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-terracotta inline-flex items-center space-x-2">
                    <span>Shop Deals</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                alt="Mid-season promo"
                className="rounded-2xl border border-white/20 shadow-2xl object-cover aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Section 4 — Featured Products Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E6DED5] pb-4 gap-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#181512]">
                Featured for You
              </h2>
              <p className="text-xs text-[#6F6861] mt-1">Curated picks worth discovering.</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#A56B4F] hover:underline flex items-center space-x-1">
              <span>View Entire Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 5 — Today's Deals Section with Live Countdown */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E6DED5] shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DED5] pb-4">
              <div className="flex items-center space-x-3">
                <span className="p-2 bg-[#B74747] text-white rounded-xl">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#181512]">Today's Deals</h3>
                  <p className="text-xs text-[#6F6861]">Limited-time pricing updated daily.</p>
                </div>
              </div>

              {/* Countdown Stepper */}
              <div className="flex items-center space-x-2 text-xs font-bold text-[#171310] bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#E6DED5]">
                <span className="text-[#6F6861] text-[10px] uppercase font-bold mr-1">Ends in</span>
                <span className="bg-[#171310] text-white px-2 py-1 rounded-md">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span className="bg-[#171310] text-white px-2 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span className="bg-[#B74747] text-white px-2 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {todayDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Best Sellers Horizontal Scroll Carousel */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#181512]">
                Best Sellers
              </h2>
              <p className="text-xs text-[#6F6861] mt-1">Our highest-rated customer favorites.</p>
            </div>
            <Link href="/shop?sort=bestsellers" className="text-xs font-bold text-[#A56B4F] hover:underline">
              View All Best Sellers
            </Link>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar">
            {bestSellerProducts.map((product) => (
              <div key={product.id} className="w-64 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 — Trust Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl p-8 border border-[#E6DED5] shadow-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 sm:divide-x divide-[#E6DED5]">
            <div className="flex flex-col items-center space-y-2 p-2">
              <Truck className="w-7 h-7 text-[#A56B4F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Free Shipping</h4>
              <p className="text-xs text-[#6F6861]">On eligible orders above ₹999</p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-2">
              <ShieldCheck className="w-7 h-7 text-[#347A52]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Secure Payments</h4>
              <p className="text-xs text-[#6F6861]">100% protected Razorpay checkout</p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-2">
              <RotateCcw className="w-7 h-7 text-[#A56B4F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Easy Returns</h4>
              <p className="text-xs text-[#6F6861]">Simple 30-day return process</p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-2">
              <Award className="w-7 h-7 text-[#A56B4F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181512]">Authentic Products</h4>
              <p className="text-xs text-[#6F6861]">Quality & provenance guaranteed</p>
            </div>
          </div>
        </section>

        {/* Section 8 — Brand Story / Manifesto */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#F2ECE4] rounded-3xl p-8 md:p-14 border border-[#E6DED5] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E6DED5] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                  alt="Why Shop With Us"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
                WHY SHOP WITH US
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#181512]">
                Thoughtfully selected. <br />
                Made for everyday life.
              </h2>
              <p className="text-xs md:text-sm text-[#6F6861] leading-relaxed">
                We bring together products chosen for quality, usefulness, and value. Every item in our store passes rigorous standards for durability, aesthetic harmony, and sustainable production.
              </p>
              <div className="pt-2">
                <Link href="/shop" className="text-xs font-bold text-[#171310] hover:text-[#A56B4F] uppercase tracking-wider flex items-center space-x-1">
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
