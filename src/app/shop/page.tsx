"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

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

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Header Title & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#ece0db] pb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#201a18]">
              All Collections
            </h1>
            <p className="text-xs text-[#51443c] mt-1">
              Explore our complete catalog of curated, artisanal products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#84746b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#d6c3b8] rounded-xl pl-10 pr-4 py-2 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331]"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 bg-white border border-[#d6c3b8] px-3 py-2 rounded-xl text-xs font-semibold text-[#51443c]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#735949]" />
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Category Sidebar */}
          <aside className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#51443c]">
                Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#faba90] text-[#774827] font-bold"
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

          {/* Product Grid */}
          <div className="md:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 h-72 animate-pulse border border-[#ece0db]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#ece0db]">
                <p className="text-sm font-semibold text-[#51443c]">
                  No products found matching your filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
