"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { ProductReviews } from "@/components/ui/ProductReviews";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart,
  ChevronDown,
  Sparkles,
  Share2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const { products } = useProducts();
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState("Artisanal Terracotta");
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");

  const recommendedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const isStarred = isInWishlist(product.id);

  // Gallery thumbnails
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  ];
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-12 w-full space-y-20">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ece0db] pb-4">
          <div className="text-xs font-semibold text-[#84746b] flex items-center space-x-2 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#845331] transition-colors">Maison</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#845331] transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-[#201a18] font-bold">{product.name}</span>
          </div>

          <CountdownTimer initialHours={18} />
        </div>

        {/* Product Gallery & Sticky Purchase Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery Showcase (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Display Image */}
            <div className="relative aspect-[4/5] bg-white rounded-[36px] overflow-hidden border border-[#ece0db] shadow-level-2 group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <button
                onClick={() => addToWishlist(product)}
                className={`absolute top-6 right-6 p-3.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-level-1 ${
                  isStarred
                    ? "bg-[#845331] text-white"
                    : "bg-white/80 text-[#201a18] hover:bg-white hover:text-[#845331]"
                }`}
                title={isStarred ? "In Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${isStarred ? "fill-white" : ""}`} />
              </button>

              {product.isNew && (
                <div className="absolute top-6 left-6 bg-[#201a18] text-[#faba90] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#faba90]/30 shadow-sm">
                  EDITION 2026
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center space-x-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-28 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#845331] shadow-level-2 scale-105"
                      : "border-[#ece0db] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Purchase Panel (Right) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28 bg-white p-8 md:p-10 rounded-[36px] border border-[#ece0db] shadow-level-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#845331]">
                  {product.category} • LIMITED RUN
                </span>
                <button className="text-[#84746b] hover:text-[#845331] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-serif-luxury text-3xl md:text-4xl font-normal text-[#201a18] leading-tight">
                {product.name}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex items-center text-[#845331]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#845331]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#201a18]">{product.rating}</span>
                <span className="text-xs text-[#84746b] font-medium">(48 Client Reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 border-y border-[#f8ebe6] py-4">
              <span className="font-serif-luxury text-4xl font-bold text-[#845331]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#84746b] line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#735949] bg-[#f8ebe6] px-2.5 py-1 rounded-full ml-auto">
                Taxes Included
              </span>
            </div>

            <p className="text-xs text-[#51443c] leading-relaxed tracking-wide font-normal">
              {product.description}
            </p>

            {/* Finish / Variant Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#201a18] block">
                Select Finish: <span className="text-[#845331]">{selectedFinish}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Artisanal Terracotta", "Matte Obsidian", "Natural Sand"].map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`py-3 px-3 rounded-xl text-[11px] font-bold tracking-wider uppercase border transition-all text-center ${
                      selectedFinish === finish
                        ? "border-[#845331] bg-[#845331] text-white shadow-sm"
                        : "border-[#d6c3b8] bg-[#fff8f6] text-[#51443c] hover:bg-[#f8ebe6]"
                    }`}
                  >
                    {finish.split(" ")[1] || finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add To Cart Button */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#d6c3b8] rounded-2xl bg-[#fff8f6] px-4 py-3 space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#735949] hover:text-[#201a18] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-[#201a18] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#735949] hover:text-[#201a18] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={() => addToCart(product, selectedFinish, quantity)}
                  className="flex-grow bg-[#201a18] hover:bg-[#845331] text-white py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-2 hover:shadow-level-3 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>
            </div>

            {/* Luxury Accordion Tabs */}
            <div className="border-t border-[#ece0db] pt-6 space-y-4 text-xs">
              <div className="flex space-x-4 border-b border-[#f8ebe6] pb-3 font-bold uppercase tracking-wider text-[10px]">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-1 transition-colors ${
                    activeTab === "details" ? "text-[#845331] border-b-2 border-[#845331]" : "text-[#84746b]"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-1 transition-colors ${
                    activeTab === "care" ? "text-[#845331] border-b-2 border-[#845331]" : "text-[#84746b]"
                  }`}
                >
                  Artisanal Care
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-1 transition-colors ${
                    activeTab === "shipping" ? "text-[#845331] border-b-2 border-[#845331]" : "text-[#84746b]"
                  }`}
                >
                  Guarantee
                </button>
              </div>

              <div className="text-[#51443c] leading-relaxed font-normal min-h-[60px]">
                {activeTab === "details" && (
                  <p>Handcrafted with non-toxic sustainable terracotta clay. Weight: 1.4 kg. Height: 24 cm. Serialized authenticity stamp included.</p>
                )}
                {activeTab === "care" && (
                  <p>Clean gently using a soft damp cloth. Avoid harsh chemical abrasive agents. Store away from direct extreme heat.</p>
                )}
                {activeTab === "shipping" && (
                  <p>Complimentary express worldwide shipping. Includes 30-day hassle-free returns and a 2-year warranty certificate.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Component */}
        <section className="pt-8">
          <ProductReviews />
        </section>

        {/* Recommended Artifacts */}
        <section className="space-y-8 pt-8 border-t border-[#ece0db]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-luxury text-3xl font-normal text-[#201a18]">
              You May Also Appreciate
            </h2>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-[#845331] hover:underline">
              View Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
