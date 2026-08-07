"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { useCoupon } from "@/hooks/useCoupon";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/payments/razorpay";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, MapPin, Truck, CreditCard, CheckCircle2, Lock, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [inputCouponCode, setInputCouponCode] = useState("");
  const { toast } = useToast();

  const { appliedCoupon, error: couponError, applyCoupon, removeCoupon, discountAmount, finalTotal } =
    useCoupon(subtotal);

  // Multi-step Checkout State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address State
  const [fullName, setFullName] = useState("Elena Hayes");
  const [street, setStreet] = useState("742 Evergreen Terrace");
  const [city, setCity] = useState("San Francisco");
  const [state, setState] = useState("CA");
  const [postalCode, setPostalCode] = useState("94107");
  const [phone, setPhone] = useState("+1 (555) 234-5678");

  // Shipping Option
  const [shippingCost, setShippingCost] = useState(0);

  const grandTotal = finalTotal + shippingCost;

  const handleApplyCoupon = () => {
    if (inputCouponCode) applyCoupon(inputCouponCode);
  };

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    toast("Initializing Razorpay secure checkout...", "info");

    try {
      // 1. Server Order Creation
      const razorpayOrder = await createRazorpayOrder({
        amount: grandTotal,
        currency: "USD",
      });

      // 2. Simulate Razorpay Payment Signature Verification
      setTimeout(() => {
        const isVerified = verifyRazorpaySignature(razorpayOrder.id, "pay_mock_98234", "sig_mock_8723", "secret");

        if (isVerified) {
          toast("Payment verified! Processing your order...", "success");
          clearCart();
          router.push("/order-success/ORD-9932");
        } else {
          router.push("/order-failed");
        }
      }, 1800);
    } catch (err) {
      router.push("/order-failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-12 w-full space-y-12">
        {/* Header Title & Minimalist Stepper */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ece0db] pb-8 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#845331]">
              <Lock className="w-3.5 h-3.5 text-[#845331]" />
              <span>SSL 256-BIT ENCRYPTED CHECKOUT</span>
            </div>
            <h1 className="font-serif-luxury text-4xl md:text-5xl font-normal text-[#201a18]">
              Checkout & Acquisition
            </h1>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-[#ece0db] shadow-level-1 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setStep(1)}
              className={`px-4 py-2 rounded-xl transition-all ${
                step >= 1 ? "bg-[#845331] text-white shadow-sm" : "text-[#84746b]"
              }`}
            >
              1. Address
            </button>
            <span className="text-[#d6c3b8]">/</span>
            <button
              onClick={() => setStep(2)}
              className={`px-4 py-2 rounded-xl transition-all ${
                step >= 2 ? "bg-[#845331] text-white shadow-sm" : "text-[#84746b]"
              }`}
            >
              2. Shipping
            </button>
            <span className="text-[#d6c3b8]">/</span>
            <button
              onClick={() => setStep(3)}
              className={`px-4 py-2 rounded-xl transition-all ${
                step >= 3 ? "bg-[#845331] text-white shadow-sm" : "text-[#84746b]"
              }`}
            >
              3. Payment
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Main Form Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Address Card */}
            <div className="bg-white rounded-[32px] p-8 border border-[#ece0db] shadow-level-1 space-y-6">
              <div className="flex items-center justify-between border-b border-[#f8ebe6] pb-4">
                <h3 className="font-serif-luxury text-2xl font-normal text-[#201a18] flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#845331]" />
                  <span>1. Client Shipping Address</span>
                </h3>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest text-[#845331] hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {step === 1 ? (
                <div className="space-y-5 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">
                      Full Legal Name
                    </label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">
                      Street Address & Suite
                    </label>
                    <Input value={street} onChange={(e) => setStreet(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">City</label>
                      <Input value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">State</label>
                      <Input value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">Postal Code</label>
                      <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#51443c] block mb-1.5">Phone Number</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-[#845331] hover:bg-[#73482a] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-2"
                  >
                    Continue to Delivery Method
                  </button>
                </div>
              ) : (
                <div className="text-xs text-[#51443c] leading-relaxed pt-2">
                  <p className="font-bold text-[#201a18] text-sm">{fullName}</p>
                  <p>{street}, {city}, {state} {postalCode}</p>
                  <p>{phone}</p>
                </div>
              )}
            </div>

            {/* Step 2: Shipping Options */}
            <div className="bg-white rounded-[32px] p-8 border border-[#ece0db] shadow-level-1 space-y-6">
              <div className="flex items-center justify-between border-b border-[#f8ebe6] pb-4">
                <h3 className="font-serif-luxury text-2xl font-normal text-[#201a18] flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-[#845331]" />
                  <span>2. Delivery Courier</span>
                </h3>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest text-[#845331] hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-4 pt-2">
                  <label
                    onClick={() => setShippingCost(0)}
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                      shippingCost === 0
                        ? "border-[#845331] bg-[#f8ebe6] shadow-sm"
                        : "border-[#d6c3b8] bg-white hover:bg-[#fff8f6]"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#201a18] uppercase tracking-wider">Complimentary Express Shipping</h4>
                      <p className="text-[11px] text-[#84746b]">Insured global delivery in 3-5 business days</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#845331]">$0.00</span>
                  </label>

                  <label
                    onClick={() => setShippingCost(15)}
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                      shippingCost === 15
                        ? "border-[#845331] bg-[#f8ebe6] shadow-sm"
                        : "border-[#d6c3b8] bg-white hover:bg-[#fff8f6]"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#201a18] uppercase tracking-wider">Priority Overnight Courier</h4>
                      <p className="text-[11px] text-[#84746b]">Priority handling and next-day arrival</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#845331]">$15.00</span>
                  </label>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-[#845331] hover:bg-[#73482a] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Payment Section */}
            <div className="bg-white rounded-[32px] p-8 border border-[#ece0db] shadow-level-1 space-y-6">
              <h3 className="font-serif-luxury text-2xl font-normal text-[#201a18] flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-[#845331]" />
                <span>3. Secure Payment Gateway (Razorpay)</span>
              </h3>

              {step === 3 && (
                <div className="space-y-6 pt-2">
                  <div className="p-6 bg-[#201a18] text-white rounded-2xl border border-[#362b27] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#faba90]">
                        RAZORPAY MAISON GATEWAY
                      </span>
                      <ShieldCheck className="w-5 h-5 text-[#faba90]" />
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-normal">
                      Encrypted signature verification. Accepts international credit cards, Apple Pay, Net Banking, and Digital Wallets.
                    </p>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing || cartItems.length === 0}
                    className="w-full bg-[#845331] hover:bg-[#73482a] disabled:opacity-50 text-white py-5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-3 flex items-center justify-center space-x-3"
                  >
                    <span>{isProcessing ? "Verifying Payment..." : `Authorize Payment — $${grandTotal.toFixed(2)}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-white rounded-[32px] p-8 border border-[#ece0db] shadow-level-2 space-y-6">
              <h2 className="font-serif-luxury text-2xl font-normal text-[#201a18]">
                Acquisition Summary ({cartItems.length})
              </h2>

              <div className="space-y-4 max-h-64 overflow-y-auto pr-1 divide-y divide-[#f8ebe6]">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover border border-[#ece0db] bg-[#f8ebe6]" />
                      <div>
                        <h4 className="font-serif-luxury text-sm font-bold text-[#201a18] line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-[#84746b]">Qty: {item.quantity} • {item.variant}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#201a18]">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs border-t border-b border-[#ece0db] py-4">
                <div className="flex justify-between text-[#51443c]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#201a18]">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#845331] font-semibold">
                    <span>Privilege Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#51443c]">
                  <span>Courier Delivery</span>
                  <span className="font-bold text-[#201a18]">${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-bold text-[#201a18] uppercase tracking-wider">Total</span>
                <span className="font-serif-luxury text-3xl font-bold text-[#845331]">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Promo Privilege Code */}
              <div className="space-y-2 pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3.5 bg-[#f8ebe6] rounded-xl border border-[#faba90]">
                    <div className="flex items-center space-x-2 text-xs text-[#845331] font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#845331]" />
                      <span>{appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-[#ba1a1a] font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Promo Code: WELCOME10"
                      value={inputCouponCode}
                      onChange={(e) => setInputCouponCode(e.target.value)}
                      className="flex-grow bg-[#f8ebe6]/60 border border-[#d6c3b8] rounded-xl px-4 py-2.5 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331]"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
