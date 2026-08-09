"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { ProductReviews } from "@/components/ui/ProductReviews";
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
  ChevronUp,
  MapPin,
  CheckCircle2,
  Share2,
  Award
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const { products } = useProducts();
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Standard");

  // Gallery Thumbnails
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  ];
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState("400001");
  const [pincodeResult, setPincodeResult] = useState<string | null>("Delivery available in 2–4 days");

  const handleCheckPincode = () => {
    if (pincode.length >= 6) {
      setPincodeResult("Delivery available in 2–4 days");
    } else {
      setPincodeResult("Please enter a valid 6-digit PIN code.");
    }
  };

  // Accordion Expand State
  const [activeAccordion, setActiveAccordion] = useState<"desc" | "specs" | "shipping" | "returns">("desc");

  const recommendedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const isStarred = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-8 w-full space-y-16">
        {/* Breadcrumbs */}
        <div className="text-xs text-[#6F6861] flex items-center space-x-2 border-b border-[#E6DED5] pb-3 uppercase tracking-wider font-semibold">
          <Link href="/" className="hover:text-[#A56B4F]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#A56B4F]">Catalog</Link>
          <span>/</span>
          <span className="text-[#181512] font-bold">{product.name}</span>
        </div>

        {/* Product PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column — Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-[#E6DED5] shadow-card group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover img-hover-zoom"
              />

              <button
                onClick={() => addToWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-subtle transition-all ${
                  isStarred
                    ? "bg-[#A56B4F] text-white"
                    : "bg-white/80 text-[#181512] hover:bg-white hover:text-[#A56B4F]"
                }`}
                title={isStarred ? "In Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${isStarred ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center space-x-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#A56B4F] shadow-subtle scale-105"
                      : "border-[#E6DED5] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column — Product Info & Actions */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E6DED5] shadow-card space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
                LUXE COMMERCE • {product.category}
              </span>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[#181512]">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 pt-1 text-xs">
                <div className="flex items-center text-[#B77A2B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B77A2B]" />
                  ))}
                </div>
                <span className="font-bold text-[#181512]">{product.rating}</span>
                <span className="text-[#6F6861]">(1,248 Verified Reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 border-y border-[#E6DED5] py-4">
              <span className="text-3xl font-extrabold text-[#171310]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#6F6861] line-through font-medium">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#B74747] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ml-auto">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-[#6F6861] leading-relaxed">
              {product.description}
            </p>

            {/* Variant / Size Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#181512] block">
                Select Size: <span className="text-[#A56B4F]">{selectedSize}</span>
              </label>
              <div className="flex items-center space-x-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "border-[#171310] bg-[#171310] text-white shadow-subtle"
                        : "border-[#E6DED5] bg-[#FAF7F2] text-[#181512] hover:bg-[#F2ECE4]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2">
              <label className="text-xs font-bold text-[#181512] flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#A56B4F]" />
                <span>Delivery & Pincode Checker</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit pincode"
                  className="flex-grow bg-white border border-[#E6DED5] rounded-xl px-3 py-2 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                />
                <button
                  onClick={handleCheckPincode}
                  className="px-4 py-2 bg-[#171310] text-white rounded-xl text-xs font-bold uppercase"
                >
                  Check
                </button>
              </div>
              {pincodeResult && (
                <p className="text-[11px] font-semibold text-[#347A52] flex items-center space-x-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pincodeResult}</span>
                </p>
              )}
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-[#E6DED5] rounded-xl bg-[#FAF7F2] px-3 py-3 space-x-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#6F6861]">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-[#181512] w-5 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-[#6F6861]">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-grow bg-[#171310] hover:bg-[#A56B4F] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-card"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ₹{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full bg-[#A56B4F] hover:bg-[#8E5840] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                  Buy Now
                </button>
              </Link>
            </div>

            {/* Product Trust Signals */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6F6861] pt-2 border-t border-[#E6DED5]">
              <span className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#347A52]" /><span>100% Secure Payment</span></span>
              <span className="flex items-center space-x-1.5"><RotateCcw className="w-3.5 h-3.5 text-[#A56B4F]" /><span>30-Day Easy Return</span></span>
              <span className="flex items-center space-x-1.5"><Award className="w-3.5 h-3.5 text-[#A56B4F]" /><span>Authentic Product</span></span>
              <span className="flex items-center space-x-1.5"><Truck className="w-3.5 h-3.5 text-[#A56B4F]" /><span>Fast Express Delivery</span></span>
            </div>

            {/* Accordion Tabs */}
            <div className="border-t border-[#E6DED5] pt-4 space-y-2 text-xs">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "desc" ? "specs" : "desc")}
                className="w-full flex items-center justify-between font-bold text-[#181512] py-2 border-b border-[#E6DED5]/60"
              >
                <span>Product Specifications & Details</span>
                <ChevronDown className="w-4 h-4 text-[#6F6861]" />
              </button>
              {activeAccordion === "desc" && (
                <div className="text-[#6F6861] leading-relaxed py-2">
                  Handcrafted with sustainable terracotta clay and non-toxic food-safe satin glaze. Serialized quality certificate included.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews />

        {/* Related Products */}
        <section className="space-y-6 pt-8 border-t border-[#E6DED5]">
          <h2 className="font-display text-2xl font-bold text-[#181512]">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
