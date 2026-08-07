"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart, Search, X, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/features/auth/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userAccountHref = user
    ? isAdmin
      ? "/admin/orders"
      : "/dashboard"
    : "/login";

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#151515] text-[#D4A25A] text-[11px] font-semibold tracking-[0.2em] uppercase py-2 text-center flex items-center justify-center space-x-2 border-b border-[#2A2A2A]">
        <Sparkles className="w-3.5 h-3.5 text-[#D4A25A] animate-pulse" />
        <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $250</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4A25A] animate-pulse" />
      </div>

      {/* Floating Glass Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav border-b border-[#E8DDD2] shadow-level-1 py-3"
            : "bg-[#FAF7F2]/90 border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo (Left/Center) */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-serif-luxury text-3xl font-bold tracking-[0.25em] text-[#151515] group-hover:text-[#A56A3A] transition-colors">
              LUXE
            </span>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#5F5F5F] -mt-1">
              EARTH & ARTIFACT
            </span>
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center space-x-9">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-widest text-[#151515] hover:text-[#A56A3A] transition-colors relative group py-1"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A56A3A] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-widest text-[#5F5F5F] hover:text-[#A56A3A] transition-colors relative group py-1"
            >
              <span>Shop Catalog</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A56A3A] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-widest text-[#5F5F5F] hover:text-[#A56A3A] transition-colors relative group py-1"
            >
              <span>Collections</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A56A3A] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-widest text-[#5F5F5F] hover:text-[#A56A3A] transition-colors relative group py-1"
            >
              <span>Editorial</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A56A3A] group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Action Icons (Right: Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center space-x-5">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#151515] hover:text-[#A56A3A] transition-colors relative"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/checkout"
              className="relative p-2 text-[#151515] hover:text-[#A56A3A] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D4A25A] text-[#151515] text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative p-2 text-[#151515] hover:text-[#A56A3A] transition-colors flex items-center space-x-1"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {cartItems.length > 0 && (
                <span className="w-4 h-4 bg-[#A56A3A] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              href={userAccountHref}
              className="p-2 text-[#151515] hover:text-[#A56A3A] transition-colors"
              title={user ? (isAdmin ? "Admin Portal" : "Customer Dashboard") : "Sign In"}
            >
              <User className="w-4 h-4 stroke-[1.75]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151515]/75 backdrop-blur-md flex items-start justify-center pt-24 p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-[#E8DDD2] shadow-level-3 space-y-6 relative"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#5F5F5F] hover:text-[#151515] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56A3A]">
                  SEARCH CATALOG
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#151515]">
                  Search Luxury Artifacts & Essentials
                </h3>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-[#5F5F5F] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type product name, category, or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DDD2] rounded-2xl pl-12 pr-4 py-4 text-sm text-[#151515] placeholder-[#5F5F5F] focus:outline-none focus:border-[#A56A3A]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#5F5F5F]">Popular: Ceramic Vases, Leather Bags, Desk Lamps</span>
                <Link
                  href={searchQuery ? `/shop?query=${encodeURIComponent(searchQuery)}` : "/shop"}
                  onClick={() => setIsSearchOpen(false)}
                  className="bg-[#A56A3A] hover:bg-[#8C562B] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-level-1"
                >
                  View Results
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
