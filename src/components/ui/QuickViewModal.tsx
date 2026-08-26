"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Product } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Star, ShoppingBag, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isStarred = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Quick View">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#181512]">
        {/* Left Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F2ECE4] border border-[#E6DED5]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-[#B74747] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Right Info & Actions */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#A56B4F]">LUXE COMMERCE</span>
            <h3 className="font-display text-xl font-bold text-[#181512]">{product.name}</h3>

            <div className="flex items-center space-x-2">
              <div className="flex text-[#D97706]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#181512]">{product.rating}</span>
            </div>

            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-2xl font-extrabold text-[#171310]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#6F6861] line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-[#6F6861] leading-relaxed line-clamp-3">{product.description}</p>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#E6DED5]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#181512]">Select Variant:</span>
              <div className="flex space-x-1">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition-colors ${
                      selectedSize === sz ? "bg-[#171310] text-white border-[#171310]" : "bg-[#FAF7F2] text-[#181512] border-[#E6DED5]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleAddToCart} className="w-full bg-[#171310] text-white text-xs py-3 font-bold uppercase tracking-wider flex items-center justify-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart — ₹{(product.price * quantity).toLocaleString()}</span>
            </Button>

            <Link href={`/shop/${product.id}`} onClick={onClose} className="block text-center text-xs font-bold text-[#A56B4F] hover:underline">
              View Full Product Page Details →
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
