import Link from "next/link";
import { Globe, ArrowUpRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1412] text-white border-t border-[#362b27] pt-20 pb-12 mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Guarantee Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="p-3 bg-[#845331] rounded-xl text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Express Delivery</h4>
              <p className="text-[11px] text-white/60">Insured global dispatch with live tracking.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="p-3 bg-[#845331] rounded-xl text-white">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Complimentary Returns</h4>
              <p className="text-[11px] text-white/60">30-day effortless returns & exchanges.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="p-3 bg-[#845331] rounded-xl text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Authenticity Guaranteed</h4>
              <p className="text-[11px] text-white/60">Serialized certificates of artisanal provenance.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Manifesto (Left) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.25em] text-white">
                LUXE
              </span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed font-normal tracking-wide max-w-sm">
              Crafting extraordinary lifestyle artifacts through meticulous engineering, sustainable luxury materials, and timeless aesthetic discipline.
            </p>

            <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-[#faba90]">
              <Link href="/shop" className="hover:underline flex items-center space-x-1">
                <span>Explore Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#faba90]">Bespoke Shop</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Artifacts</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Curated Bento</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Living Space</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Self Care</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#faba90]">Concierge</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Private Client Care</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Global Express Shipping</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Care Instructions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bespoke Orders</Link></li>
            </ul>
          </div>

          {/* Legal & Maison */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#faba90]">Maison</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Maison LUXE Headquarters <br />
              124 Rue du Faubourg Saint-Honoré, Paris <br />
              Fifth Avenue, New York
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-white/40">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Global Selectors */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/40 space-y-4 md:space-y-0">
          <p>© 2026 LUXE Maison Ecosystem. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[11px] text-white/80">
              <Globe className="w-3.5 h-3.5 text-[#faba90]" />
              <span>International / USD ($)</span>
            </div>
            <span className="text-[11px] text-white/40">Encryption: SSL 256-Bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
