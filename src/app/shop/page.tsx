"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Search, ArrowUpDown, Sparkles, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const { products, loading } = useProducts(selectedCategory, searchQuery, sortOrder);

  const categories = [
    "ALL",
    "KITCHENWARE",
    "TECHNOLOGY",
    "TEXTILES",
    "DECOR",
    "ACCESSORIES",
    "PERIPHERALS",
  ];

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-12 w-full space-y-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ece0db] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#845331]">
              <Sparkles className="w-3.5 h-3.5 text-[#845331]" />
              <span>THE ARCHIVE & CATALOG</span>
            </div>
            <h1 className="font-serif-luxury text-4xl md:text-6xl font-normal text-[#201a18] leading-tight">
              All Luxury Artifacts
            </h1>
            <p className="text-xs md:text-sm text-[#51443c] tracking-wide font-normal max-w-lg">
              Explore our complete repertoire of timeless essentials engineered with sustainable craftsmanship.
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#84746b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#d6c3b8] rounded-2xl pl-11 pr-4 py-3 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331] shadow-level-1 transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-white border border-[#d6c3b8] px-4 py-3 rounded-2xl text-xs font-semibold text-[#51443c] shadow-level-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#845331]" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Sort by: Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Category Navigation (Left Sidebar) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-4 sticky top-28">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#201a18] border-b border-[#f8ebe6] pb-3">
                <Filter className="w-4 h-4 text-[#845331]" />
                <span>Collections</span>
              </div>
              <ul className="space-y-1.5">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                        selectedCategory === cat
                          ? "bg-[#845331] text-white shadow-level-1"
                          : "text-[#51443c] hover:bg-[#f8ebe6] hover:text-[#201a18]"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid (Right Column) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#84746b] px-2 font-medium">
              <span>Showing {products.length} curated artifacts</span>
              <span>Category: <strong className="text-[#201a18] font-bold">{selectedCategory}</strong></span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl p-4 h-96 animate-pulse border border-[#ece0db]" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#ece0db] space-y-4">
                <p className="font-serif-luxury text-2xl text-[#201a18]">
                  No artifacts match your current criteria.
                </p>
                <p className="text-xs text-[#84746b]">
                  Try resetting your category or search query to explore the full collection.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSearchQuery("");
                  }}
                  className="bg-[#845331] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
