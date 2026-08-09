import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171310] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Top Guarantee Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-xs">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-[#A56B4F] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider">Free Shipping</h4>
              <p className="text-[11px] text-[#E6DED5]/70">On orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <RotateCcw className="w-5 h-5 text-[#A56B4F] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider">30-Day Returns</h4>
              <p className="text-[11px] text-[#E6DED5]/70">Simple return policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#347A52] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider">100% Protected</h4>
              <p className="text-[11px] text-[#E6DED5]/70">Secure Razorpay checkout</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-[#A56B4F] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider">Authentic Guarantee</h4>
              <p className="text-[11px] text-[#E6DED5]/70">Quality craftsmanship</p>
            </div>
          </div>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Column 1 — Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-white">
                LUXE
              </span>
            </Link>
            <p className="text-xs text-[#E6DED5]/70 leading-relaxed max-w-sm font-normal">
              A modern commerce platform bringing together thoughtfully chosen products for quality, usefulness, and lasting everyday value.
            </p>
          </div>

          {/* Column 2 — Shop */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A56B4F]">Shop</h4>
            <ul className="space-y-2 text-xs text-[#E6DED5]/70">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop?sort=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?sort=bestsellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop?sort=deals" className="hover:text-white transition-colors">Deals & Offers</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Categories</Link></li>
            </ul>
          </div>

          {/* Column 3 — Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A56B4F]">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#E6DED5]/70">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 — Account */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A56B4F]">My Account</h4>
            <ul className="space-y-2 text-xs text-[#E6DED5]/70">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Saved Addresses</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-[#E6DED5]/50 space-y-4 md:space-y-0">
          <p>© 2026 LuxeCommerce. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
