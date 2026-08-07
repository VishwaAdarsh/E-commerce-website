"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { ProductReviews } from "@/components/ui/ProductReviews";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const { products } = useProducts();
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Matte Black");

  const recommendedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const isStarred = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Breadcrumb & Flash Deal Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ece0db] pb-4">
          <div className="text-xs text-[#51443c] flex items-center space-x-2">
            <Link href="/" className="hover:text-[#845331]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#845331]">Shop</Link>
            <span>/</span>
            <span className="font-semibold text-[#201a18]">{product.name}</span>
          </div>

          <CountdownTimer initialHours={18} />
        </div>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Product Image Showcase */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-[#ece0db] shadow-level-1 relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => addToWishlist(product)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full border border-[#ece0db] shadow-level-1 text-[#845331] hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isStarred ? "fill-[#845331]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#735949] block mb-1">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-[#201a18]">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-[#845331]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#845331]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#201a18]">{product.rating}</span>
                <span className="text-xs text-[#84746b]">(48 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-3xl font-extrabold text-[#845331]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#84746b] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#51443c] leading-relaxed border-t border-b border-[#ece0db] py-4">
              {product.description}
            </p>

            {/* Variant Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#51443c] block">
                Finish / Color
              </label>
              <div className="flex items-center space-x-3">
                {["Matte Black", "Warm Sand", "Obsidian Slate"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedColor === color
                        ? "border-[#845331] bg-[#f8ebe6] text-[#845331] font-bold"
                        : "border-[#d6c3b8] bg-white text-[#51443c] hover:bg-[#f8ebe6]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border border-[#d6c3b8] rounded-xl bg-white px-3 py-2 space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#735949] hover:text-[#201a18]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#201a18] w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#735949] hover:text-[#201a18]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button
                onClick={() => addToCart(product, selectedColor, quantity)}
                variant="secondary"
                size="lg"
                className="flex-grow"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </Button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#ece0db]">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-[#ece0db]">
                <Truck className="w-5 h-5 text-[#845331] mb-1" />
                <span className="text-[10px] font-bold text-[#201a18]">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-[#ece0db]">
                <RotateCcw className="w-5 h-5 text-[#845331] mb-1" />
                <span className="text-[10px] font-bold text-[#201a18]">30-Day Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-[#ece0db]">
                <ShieldCheck className="w-5 h-5 text-[#845331] mb-1" />
                <span className="text-[10px] font-bold text-[#201a18]">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews />

        {/* You May Also Like Recommendations */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold text-[#201a18]">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
