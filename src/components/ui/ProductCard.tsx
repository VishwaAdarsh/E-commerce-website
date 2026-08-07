"use client";

import Link from "next/link";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/mockData";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-3xl p-4 border border-[#ece0db] shadow-level-1 hover:shadow-level-3 hover:border-[#d6c3b8] transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
      {/* Top Image Box */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f8ebe6] mb-4 group/img">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur-md text-[#845331] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#ece0db] shadow-sm">
              NEW RELEASE
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#faba90] text-[#774827] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Top Right Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${
            inWishlist
              ? "bg-[#845331] text-white"
              : "bg-white/80 text-[#201a18] hover:bg-white hover:text-[#845331]"
          }`}
          title={inWishlist ? "In Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Bottom Hover Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover/img:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/img:translate-y-0 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-grow bg-[#201a18] hover:bg-[#845331] text-white py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-1.5 shadow-level-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>

          <Link
            href={`/shop/${product.id}`}
            className="p-2.5 bg-white/90 hover:bg-white text-[#201a18] rounded-xl flex items-center justify-center transition-colors shadow-level-1"
            title="Quick View"
          >
            <Eye className="w-4 h-4 text-[#735949]" />
          </Link>
        </div>

        {/* Subtle Bottom Image Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Product Details Section */}
      <div className="px-1 flex flex-col justify-between flex-grow space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#845331]">
              {product.category}
            </span>
            {product.rating && (
              <div className="flex items-center space-x-1 text-[11px] font-bold text-[#201a18]">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-[#845331] text-[#845331]" />
              </div>
            )}
          </div>

          <Link href={`/shop/${product.id}`}>
            <h3 className="font-serif-luxury text-lg font-bold text-[#201a18] group-hover:text-[#845331] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-[#f8ebe6]">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-extrabold text-[#845331]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#84746b] line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Link
            href={`/shop/${product.id}`}
            className="text-xs font-bold uppercase tracking-widest text-[#201a18] group-hover:text-[#845331] transition-colors flex items-center space-x-1"
          >
            <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
