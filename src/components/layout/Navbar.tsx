"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  User, 
  Heart, 
  Search, 
  X, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles,
  ChevronDown,
  LogOut,
  Package,
  SlidersHorizontal
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/features/auth/AuthProvider";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const { cartItems, subtotal } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAdmin, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  // Live Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userAccountHref = user
    ? isAdmin
      ? "/admin/orders"
      : "/dashboard"
    : "/login";

  const userName = user?.email ? user.email.split("@")[0] : "Customer";

  return (
    <>
      {/* Row 1 — Utility Bar */}
      <div className="bg-[#171310] text-[#FAF7F2] text-[11px] font-medium tracking-wide py-2 px-6 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-[#A56B4F]" />
              <span>Free shipping on orders above ₹999</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#A56B4F]" />
              <span>30-Day Easy Returns</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#347A52]" />
              <span>100% Protected Checkout</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[#E6DED5]">
            <Link href="/shop" className="hover:text-white transition-colors">Store Locator</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Help & FAQ</Link>
          </div>
        </div>
      </div>

      {/* Row 2 — Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-header border-b border-[#E6DED5] shadow-subtle py-3"
            : "bg-[#FAF7F2] border-b border-[#E6DED5]/80 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group flex-shrink-0">
            <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-[#171310] group-hover:text-[#A56B4F] transition-colors">
              LUXE
            </span>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#6F6861] -mt-1">
              COMMERCE
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-[#181512]">
            <Link href="/" className="hover:text-[#A56B4F] transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-[#A56B4F] transition-colors">Shop All</Link>
            <Link href="/shop?sort=new" className="hover:text-[#A56B4F] transition-colors">New Arrivals</Link>
            <Link href="/shop?sort=bestsellers" className="hover:text-[#A56B4F] transition-colors">Best Sellers</Link>
            <Link href="/shop?sort=deals" className="text-[#A56B4F] hover:underline font-extrabold">Deals</Link>
          </nav>

          {/* Large Search Bar with Live Suggestions */}
          <div className="relative flex-grow max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6F6861] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, categories, or brands..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery) {
                    router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="w-full bg-white border border-[#E6DED5] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F] shadow-subtle"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6861]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Suggestions Box */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E6DED5] shadow-dropdown p-4 z-50 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F]">Suggested Products</p>
                <div className="space-y-2">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop/${p.id}`}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-[#F2ECE4]" />
                      <div>
                        <h5 className="text-xs font-bold text-[#181512] line-clamp-1">{p.name}</h5>
                        <p className="text-[10px] text-[#A56B4F] font-bold">₹{p.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons (Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-5 flex-shrink-0">
            {/* Wishlist Icon */}
            <Link
              href="/checkout"
              className="relative p-2 text-[#181512] hover:text-[#A56B4F] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#A56B4F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-[#F2ECE4] transition-colors text-left"
              >
                <div className="p-1.5 bg-white border border-[#E6DED5] rounded-lg text-[#171310]">
                  <User className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="hidden sm:block text-xs leading-tight">
                  <span className="block text-[10px] text-[#6F6861]">
                    {user ? "Welcome back" : "Account"}
                  </span>
                  <span className="font-bold text-[#181512] flex items-center">
                    {user ? userName : "Sign In"}
                    <ChevronDown className="w-3 h-3 ml-1 text-[#6F6861]" />
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E6DED5] shadow-dropdown p-2 z-50 space-y-1 text-xs"
                  >
                    {user ? (
                      <>
                        <Link
                          href={userAccountHref}
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#181512]"
                        >
                          <Package className="w-4 h-4 text-[#A56B4F]" />
                          <span>{isAdmin ? "Admin Portal" : "My Orders & Account"}</span>
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#B74747]"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-3 py-2 rounded-xl bg-[#171310] text-white text-center font-bold"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-3 py-2 rounded-xl hover:bg-[#FAF7F2] text-center font-semibold text-[#181512]"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center space-x-2 bg-[#171310] hover:bg-[#A56B4F] text-white px-3.5 py-2 rounded-xl transition-colors shadow-subtle"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#A56B4F] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">
                ₹{subtotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  );
}
