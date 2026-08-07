import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8ebe6] border-t border-[#ece0db] pt-16 pb-12 mt-20 text-[#201a18]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#d6c3b8]/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-[#201a18]">LUXE</h3>
            <p className="text-xs text-[#51443c] leading-relaxed max-w-sm">
              Elevating everyday essentials through uncompromising design and sustainable practices.
            </p>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#51443c]">Shop</h4>
            <ul className="space-y-2 text-xs text-[#51443c]">
              <li><Link href="/shop" className="hover:text-[#845331] transition-colors">All Products</Link></li>
              <li><Link href="/shop" className="hover:text-[#845331] transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-[#845331] transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-[#845331] transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#51443c]">Support</h4>
            <ul className="space-y-2 text-xs text-[#51443c]">
              <li><Link href="#" className="hover:text-[#845331] transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-[#845331] transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-[#845331] transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-[#845331] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#51443c]">Legal</h4>
            <ul className="space-y-2 text-xs text-[#51443c]">
              <li><Link href="#" className="hover:text-[#845331] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#845331] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#51443c] space-y-4 md:space-y-0">
          <p>© 2026 LUXE Ecosystem. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#84746b]" />
            <span>Global English / USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
