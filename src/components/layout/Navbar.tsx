"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart, Search, X, Truck } from "lucide-react";
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
      {/* Top Announcement Bar */}
      <div className="bg-[#0D0B0A] text-[#D49B53] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase py-2 text-center flex items-center justify-center space-x-2 border-b border-white/5 relative z-50">
        <Truck className="w-3.5 h-3.5 text-[#D49B53]" />
        <span>FREE WORLDWIDE SHIPPING ON ALL ORDERS OVER $150</span>
      </div>

      {/* Floating Dark Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-nav-dark border-b border-white/10 shadow-2xl py-3"
            : "bg-[#14110F]/90 border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-serif-luxury text-3xl font-bold tracking-[0.25em] text-white group-hover:text-[#D49B53] transition-colors">
              LUXE
            </span>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#A89F99] -mt-1">
              PARIS • NEW YORK
            </span>
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-[#D49B53] transition-colors relative group py-1"
            >
              <span>HOME</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D49B53] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5BDB7] hover:text-[#D49B53] transition-colors relative group py-1"
            >
              <span>SHOP ALL</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D49B53] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5BDB7] hover:text-[#D49B53] transition-colors relative group py-1"
            >
              <span>COLLECTIONS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D49B53] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5BDB7] hover:text-[#D49B53] transition-colors relative group py-1"
            >
              <span>EDITORIAL</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D49B53] group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Action Icons (Right) */}
          <div className="flex items-center space-x-5">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white hover:text-[#D49B53] transition-colors"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/checkout"
              className="relative p-2 text-white hover:text-[#D49B53] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D49B53] text-[#14110F] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative p-2 text-white hover:text-[#D49B53] transition-colors flex items-center space-x-1"
              title="Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {cartItems.length > 0 && (
                <span className="w-4 h-4 bg-[#D49B53] text-[#14110F] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              href={userAccountHref}
              className="p-2 text-white hover:text-[#D49B53] transition-colors"
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
            className="fixed inset-0 z-50 bg-[#0D0B0A]/85 backdrop-blur-md flex items-start justify-center pt-24 p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#1E1916] rounded-3xl p-8 border border-[#D49B53]/30 shadow-2xl space-y-6 relative text-white"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#A89F99] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D49B53]">
                  CATALOG SEARCH
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Search Luxury Artifacts & Essentials
                </h3>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-[#A89F99] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type product name, category, or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#14110F] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-[#A89F99] focus:outline-none focus:border-[#D49B53]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#A89F99]">Popular: Artisanal Vases, Ceramic Bowls, Desk Lamps</span>
                <Link
                  href={searchQuery ? `/shop?query=${encodeURIComponent(searchQuery)}` : "/shop"}
                  onClick={() => setIsSearchOpen(false)}
                  className="bg-gold-btn text-[#14110F] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
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
