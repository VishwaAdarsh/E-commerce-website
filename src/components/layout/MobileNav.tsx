"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Grid, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/features/auth/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { label: "All", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "Deals", href: "/shop?sort=deals" },
    { label: "Decor", href: "/shop?category=DECOR" },
    { label: "Furniture", href: "/shop?category=FURNITURE" },
    { label: "Audio & Tech", href: "/shop?category=TECHNOLOGY" },
    { label: "Textiles", href: "/shop?category=TEXTILES" },
  ];

  const userAccountHref = user
    ? isAdmin
      ? "/admin/orders"
      : "/dashboard"
    : "/login";

  return (
    <>
      {/* Mobile Top Category Scroller */}
      <div className="md:hidden bg-[#F2ECE4] border-b border-[#E6DED5] py-2 px-4 overflow-x-auto no-scrollbar flex items-center space-x-2">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className="px-3.5 py-1.5 rounded-full bg-white text-[#181512] text-xs font-semibold whitespace-nowrap border border-[#E6DED5] shadow-subtle hover:bg-[#171310] hover:text-white transition-colors"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col justify-between p-6 overflow-y-auto md:hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-serif-luxury text-2xl font-bold text-[#171310]">
                  LUXE
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#6F6861]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">Store Repertoire</p>
                <nav className="space-y-2 text-base font-bold text-[#181512]">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Home</Link>
                  <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Shop All Catalog</Link>
                  <Link href="/shop?category=DECOR" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Ceramics & Decor</Link>
                  <Link href="/shop?category=FURNITURE" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Furniture & Lounge</Link>
                  <Link href="/shop?category=TECHNOLOGY" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Audio & Tech</Link>
                  <Link href="/shop?category=TEXTILES" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-[#E6DED5]/60">Textiles & Linens</Link>
                </nav>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6DED5] space-y-3">
              <Link href={userAccountHref} onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-[#171310] text-white py-3.5 rounded-xl font-bold text-xs uppercase">
                {user ? "My Account Portal" : "Sign In / Register"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6DED5] py-2 px-4 shadow-dropdown flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center space-y-0.5 min-w-[48px] min-h-[44px] ${
            pathname === "/" ? "text-[#A56B4F]" : "text-[#6F6861]"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center space-y-0.5 min-w-[48px] min-h-[44px] ${
            pathname === "/shop" ? "text-[#A56B4F]" : "text-[#6F6861]"
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Categories</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center space-y-0.5 min-w-[48px] min-h-[44px] text-[#6F6861]`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </Link>

        <Link
          href="/checkout"
          className={`relative flex flex-col items-center justify-center space-y-0.5 min-w-[48px] min-h-[44px] ${
            pathname === "/checkout" ? "text-[#A56B4F]" : "text-[#6F6861]"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Wishlist</span>
          {wishlistItems.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 bg-[#A56B4F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>

        <Link
          href={userAccountHref}
          className={`flex flex-col items-center justify-center space-y-0.5 min-w-[48px] min-h-[44px] ${
            pathname.startsWith("/dashboard") || pathname.startsWith("/admin") ? "text-[#A56B4F]" : "text-[#6F6861]"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </>
  );
}
