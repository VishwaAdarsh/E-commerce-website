"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/mockData";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { QuickViewModal } from "@/components/ui/QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Swatches & Secondary image support
  const secondaryImage =
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop";
  const [activeImage, setActiveImage] = useState(product.image);

  // Discount percentage calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="group bg-white rounded-2xl p-3 border border-[#E6DED5] shadow-subtle hover:shadow-card hover:border-[#A56B4F]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
        {/* Top Image Container (1:1 Aspect Ratio) */}
        <div
          className="relative aspect-square rounded-xl overflow-hidden bg-[#F2ECE4] mb-3 group/img cursor-pointer"
          onMouseEnter={() => setActiveImage(secondaryImage)}
          onMouseLeave={() => setActiveImage(product.image)}
        >
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 transform group-hover/img:scale-105"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discountPercent > 0 && (
              <span className="bg-[#B74747] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#171310] text-[#FAF7F2] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#A56B4F] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                BESTSELLER
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-[#D97706] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                LOW STOCK
              </span>
            )}
          </div>

          {/* Wishlist Heart Toggle Button (Top Right) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${
              inWishlist
                ? "bg-[#A56B4F] text-white"
                : "bg-white/80 text-[#181512] hover:bg-white hover:text-[#A56B4F]"
            }`}
            title={inWishlist ? "In Wishlist" : "Save to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-white" : ""}`} />
          </button>

          {/* Quick Add & Quick View Overlay */}
          <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover/img:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/img:translate-y-0 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex-grow bg-[#171310] hover:bg-[#A56B4F] text-white py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 shadow-subtle"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="p-2 bg-white hover:bg-[#F2ECE4] text-[#181512] rounded-lg flex items-center justify-center transition-colors shadow-subtle"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-[#6F6861]" />
            </button>
          </div>
        </div>

        {/* Details Box */}
        <div className="px-1 space-y-2 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-[#6F6861] uppercase tracking-wider font-semibold mb-1">
              <span>LUXE COMMERCE</span>
              {product.rating && (
                <div className="flex items-center space-x-1 text-[#181512]">
                  <Star className="w-3 h-3 fill-[#B77A2B] text-[#B77A2B]" />
                  <span className="font-bold text-[11px]">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <Link href={`/shop/${product.id}`}>
              <h3 className="text-xs font-bold text-[#181512] group-hover:text-[#A56B4F] transition-colors leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Price Hierarchy */}
          <div className="pt-2 border-t border-[#E6DED5]/60 flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-sm font-extrabold text-[#171310]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#6F6861] line-through font-medium">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <Link
              href={`/shop/${product.id}`}
              className="text-[11px] font-bold text-[#A56B4F] hover:underline uppercase tracking-wider"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
