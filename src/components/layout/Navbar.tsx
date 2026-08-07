"use client";

import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-[#ece0db] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight text-[#201a18] hover:text-[#845331] transition-colors"
        >
          LUXE
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            href="/" 
            className="text-sm font-medium text-[#201a18] hover:text-[#845331] transition-colors border-b-2 border-transparent hover:border-[#845331] py-1"
          >
            Home
          </Link>
          <Link 
            href="/shop" 
            className="text-sm font-medium text-[#51443c] hover:text-[#845331] transition-colors py-1"
          >
            Shop
          </Link>
          <Link 
            href="/shop" 
            className="text-sm font-medium text-[#51443c] hover:text-[#845331] transition-colors py-1"
          >
            Collections
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-[#51443c] hover:text-[#845331] transition-colors py-1"
          >
            About
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-[#51443c] hover:text-[#845331] transition-colors py-1"
          >
            Journal
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/checkout" 
            className="relative p-2 text-[#201a18] hover:text-[#845331] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#faba90] text-[#774827] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link 
            href="/checkout" 
            className="relative p-2 text-[#201a18] hover:text-[#845331] transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#845331] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link 
            href="/dashboard" 
            className="p-2 text-[#201a18] hover:text-[#845331] transition-colors"
            title="Merchant Portal"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
