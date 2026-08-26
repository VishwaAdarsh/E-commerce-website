"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { ProductReviews } from "@/components/ui/ProductReviews";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { checkPincodeEligibility, getProductSpecifications, getProductQuestions, ProductQuestion, ProductSpecification } from "@/lib/services/pdp";
import { useToast } from "@/components/ui/Toast";
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
  Award,
  HelpCircle,
  Package,
  Layers,
  Sparkles,
  Zap,
  Info
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { toast } = useToast();

  const { products } = useProducts();
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Terracotta Natural");

  // Gallery Thumbnails & Media Zoom
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
  ];
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState("400001");
  const [pincodeResult, setPincodeResult] = useState<string | null>("Delivery & Cash on Delivery (COD) available for your area!");
  const [pincodeLoading, setPincodeLoading] = useState(false);

  // PDP Specifications & Questions
  const [specs, setSpecs] = useState<ProductSpecification | null>(null);
  const [questions, setQuestions] = useState<ProductQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    async function loadPDPData() {
      const s = await getProductSpecifications(product.id);
      const q = await getProductQuestions(product.id);
      setSpecs(s);
      setQuestions(q);
    }
    loadPDPData();
  }, [product.id]);

  const handleCheckPincode = async () => {
    setPincodeLoading(true);
    const res = await checkPincodeEligibility(pincode);
    setPincodeResult(res.message);
    setPincodeLoading(false);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const q: ProductQuestion = {
      id: `q-${Date.now()}`,
      productId: product.id,
      customerName: "Valued Shopper",
      question: newQuestion,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setQuestions([q, ...questions]);
    setNewQuestion("");
    toast("Question submitted! An artisan specialist will respond shortly.", "success");
  };

  // Accordions
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
          <span className="hover:text-[#A56B4F]">{product.category}</span>
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
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
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

              {/* Benefit Statement / Value Proposition */}
              <p className="text-xs font-semibold text-[#A56B4F]">
                Hand-finished artisanal design crafted to bring architectural warmth and natural texture.
              </p>

              <div className="flex items-center space-x-3 pt-1 text-xs">
                <div className="flex items-center text-[#B77A2B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B77A2B]" />
                  ))}
                </div>
                <span className="font-bold text-[#181512]">{product.rating}</span>
                <a href="#reviews-section" className="text-[#6F6861] hover:underline">(1,248 Verified Reviews)</a>
              </div>
            </div>

            {/* Price Box & Offers */}
            <div className="space-y-2 border-y border-[#E6DED5] py-4">
              <div className="flex items-baseline space-x-3">
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
              <p className="text-[10px] text-[#6F6861]">Inclusive of all applicable GST taxes & fees</p>

              {/* Special Offers Box */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] space-y-1 text-[11px]">
                <div className="flex items-center space-x-1.5 font-bold text-[#A56B4F]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Available Offers & Coupons:</span>
                </div>
                <p className="text-[#181512]">Use code <span className="font-bold font-mono text-[#A56B4F]">LUXE10</span> for extra 10% OFF at checkout.</p>
              </div>
            </div>

            {/* Color & Size Swatches */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#181512] block mb-2">
                  Select Finish: <span className="text-[#A56B4F]">{selectedColor}</span>
                </label>
                <div className="flex items-center space-x-3">
                  {["Terracotta Natural", "Matte Charcoal", "Sand Beige"].map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColor(clr)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor === clr
                          ? "border-[#171310] bg-[#171310] text-white shadow-subtle"
                          : "border-[#E6DED5] bg-[#FAF7F2] text-[#181512] hover:bg-[#F2ECE4]"
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#181512] block mb-2">
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
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2">
              <label className="text-xs font-bold text-[#181512] flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#A56B4F]" />
                <span>Delivery & Pincode Eligibility Checker</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-grow bg-white border border-[#E6DED5] rounded-xl px-3 py-2 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                />
                <button
                  onClick={handleCheckPincode}
                  disabled={pincodeLoading}
                  className="px-4 py-2 bg-[#171310] text-white rounded-xl text-xs font-bold uppercase"
                >
                  {pincodeLoading ? "Checking..." : "Check"}
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
              <span className="flex items-center space-x-1.5"><Award className="w-3.5 h-3.5 text-[#A56B4F]" /><span>Authentic Craftsmanship</span></span>
              <span className="flex items-center space-x-1.5"><Truck className="w-3.5 h-3.5 text-[#A56B4F]" /><span>Fast Express Shipping</span></span>
            </div>
          </div>
        </div>

        {/* Structured Specifications Table */}
        {specs && (
          <section className="bg-white p-8 rounded-3xl border border-[#E6DED5] shadow-card space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#181512]">Product Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="divide-y divide-[#E6DED5]">
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Material</span><span className="font-bold text-[#181512]">{specs.material}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Finish</span><span className="font-bold text-[#181512]">{specs.finish}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Dimensions</span><span className="font-bold text-[#181512]">{specs.dimensions}</span></div>
              </div>
              <div className="divide-y divide-[#E6DED5]">
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Weight</span><span className="font-bold text-[#181512]">{specs.weight}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Country of Origin</span><span className="font-bold text-[#181512]">{specs.countryOfOrigin}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-[#6F6861] font-semibold">Care</span><span className="font-bold text-[#181512]">{specs.careInstructions}</span></div>
              </div>
            </div>
          </section>
        )}

        {/* Frequently Bought Together / Complete the Look */}
        <section className="bg-white p-8 rounded-3xl border border-[#E6DED5] shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">COMPLETE THE LOOK</span>
              <h2 className="font-display text-2xl font-bold text-[#181512]">Frequently Bought Together</h2>
            </div>
            <button
              onClick={() => {
                addToCart(product);
                if (recommendedProducts[0]) addToCart(recommendedProducts[0]);
                toast("Bundle added to cart!", "success");
              }}
              className="bg-[#171310] hover:bg-[#A56B4F] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase"
            >
              Add Bundle to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProducts.slice(0, 2).map((item) => (
              <div key={item.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] flex items-center space-x-4 text-xs">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#E6DED5]" />
                <div className="flex-grow">
                  <h4 className="font-bold text-[#181512]">{item.name}</h4>
                  <span className="font-extrabold text-[#171310] block">₹{item.price.toLocaleString()}</span>
                </div>
                <button onClick={() => addToCart(item)} className="bg-[#171310] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold">
                  + Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Questions & Answers (Q&A) */}
        <section className="bg-white p-8 rounded-3xl border border-[#E6DED5] shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <h2 className="font-display text-2xl font-bold text-[#181512]">Customer Questions & Answers</h2>
          </div>

          <form onSubmit={handleAskQuestion} className="flex gap-3">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question about this product..."
              className="flex-grow bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
            />
            <button type="submit" className="bg-[#171310] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase">
              Submit Question
            </button>
          </form>

          <div className="space-y-4 pt-2">
            {questions.map((q) => (
              <div key={q.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#181512]">Q: {q.question}</span>
                  <span className="text-[10px] text-[#6F6861]">{q.createdAt}</span>
                </div>
                {q.answer && (
                  <div className="p-3 bg-white rounded-xl border border-[#E6DED5] text-[#6F6861]">
                    <span className="font-bold text-[#A56B4F] block mb-0.5">Answered by {q.answeredBy}:</span>
                    <p className="text-[#181512]">{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <div id="reviews-section">
          <ProductReviews />
        </div>

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
