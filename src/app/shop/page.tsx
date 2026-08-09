"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Search, ArrowUpDown, Filter, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Mobile Filter Sheet State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion Expand States
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { products, loading } = useProducts(selectedCategory, searchQuery, sortOrder);

  const categories = [
    "ALL",
    "DECOR",
    "FURNITURE",
    "TECHNOLOGY",
    "TEXTILES",
    "LIGHTING",
    "KITCHENWARE",
    "ACCESSORIES",
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-8 w-full space-y-8">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6DED5] pb-6 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">MARKETPLACE</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#181512]">
              Shop All Products
            </h1>
            <p className="text-xs text-[#6F6861] mt-1">
              Showing {products.length} products
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Field */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F] shadow-subtle"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 bg-white border border-[#E6DED5] px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#181512] shadow-subtle">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A56B4F]" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Main Grid (Sidebar + Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Accordion Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-24">
            <div className="bg-white rounded-2xl p-5 border border-[#E6DED5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#181512] flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#A56B4F]" />
                  <span>Filter Products</span>
                </h3>
                {(selectedCategory !== "ALL" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setSearchQuery("");
                    }}
                    className="text-[11px] text-[#B74747] font-bold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Accordion 1: Categories */}
              <div className="border-b border-[#E6DED5]/60 pb-3">
                <button
                  onClick={() => toggleAccordion("category")}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#181512] py-1"
                >
                  <span>Category</span>
                  {openAccordions.category ? <ChevronUp className="w-4 h-4 text-[#6F6861]" /> : <ChevronDown className="w-4 h-4 text-[#6F6861]" />}
                </button>
                {openAccordions.category && (
                  <ul className="mt-2 space-y-1">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                            selectedCategory === cat
                              ? "bg-[#171310] text-white font-bold"
                              : "text-[#6F6861] hover:bg-[#FAF7F2] hover:text-[#181512]"
                          }`}
                        >
                          <span>{cat}</span>
                          {selectedCategory === cat && <Check className="w-3 h-3 text-[#A56B4F]" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion 2: Rating */}
              <div>
                <button
                  onClick={() => toggleAccordion("rating")}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#181512] py-1"
                >
                  <span>Rating Filter</span>
                  {openAccordions.rating ? <ChevronUp className="w-4 h-4 text-[#6F6861]" /> : <ChevronDown className="w-4 h-4 text-[#6F6861]" />}
                </button>
                {openAccordions.rating && (
                  <div className="mt-2 space-y-1.5 text-xs text-[#6F6861]">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#A56B4F]" />
                      <span>4.5 Stars & Above</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#A56B4F]" />
                      <span>4.0 Stars & Above</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 h-72 animate-pulse border border-[#E6DED5]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E6DED5] space-y-3">
                <p className="text-base font-bold text-[#181512]">No products found.</p>
                <p className="text-xs text-[#6F6861]">Try adjusting your search or category filter.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSearchQuery("");
                  }}
                  className="bg-[#171310] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Floating Filter Controls (Bottom Sheet) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 p-4 flex items-center justify-center">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-[#171310] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-dropdown flex items-center space-x-2 border border-white/20"
        >
          <Filter className="w-4 h-4 text-[#A56B4F]" />
          <span>Filter & Sort ({products.length})</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-x-0 bottom-0 z-50 bg-[#FAF7F2] rounded-t-3xl border-t border-[#E6DED5] p-6 shadow-drawer space-y-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
              <h3 className="text-sm font-bold text-[#181512]">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-[#6F6861]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase text-[#A56B4F]">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                      selectedCategory === cat ? "bg-[#171310] text-white" : "bg-white text-[#181512] border border-[#E6DED5]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
