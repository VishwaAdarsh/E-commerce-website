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
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, MapPin, Truck, CreditCard, CheckCircle2 } from "lucide-react";

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
    toast("Initializing Razorpay checkout...", "info");

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
          toast("Payment successful! Generating order...", "success");
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

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Header Title & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#ece0db] pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#201a18]">
              Checkout & Payment
            </h1>
            <p className="text-xs text-[#51443c]">
              Complete your shipping address and secure payment via Razorpay.
            </p>
          </div>

          {/* Checkout Steps Stepper */}
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className={`flex items-center space-x-1 ${step >= 1 ? "text-[#845331]" : "text-[#84746b]"}`}>
              <span className="w-5 h-5 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[10px]">1</span>
              <span>Shipping</span>
            </span>
            <span className="text-[#d6c3b8]">/</span>
            <span className={`flex items-center space-x-1 ${step >= 2 ? "text-[#845331]" : "text-[#84746b]"}`}>
              <span className="w-5 h-5 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </span>
            <span className="text-[#d6c3b8]">/</span>
            <span className={`flex items-center space-x-1 ${step >= 3 ? "text-[#845331]" : "text-[#84746b]"}`}>
              <span className="w-5 h-5 rounded-full bg-[#f8ebe6] flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </span>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Section (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Shipping Address Form */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#845331]" />
                  <span>1. Shipping Address</span>
                </h3>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-[#845331] hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {step === 1 ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#51443c] block mb-1">Full Name</label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#51443c] block mb-1">Street Address</label>
                    <Input value={street} onChange={(e) => setStreet(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#51443c] block mb-1">City</label>
                      <Input value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#51443c] block mb-1">State</label>
                      <Input value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#51443c] block mb-1">Postal Code</label>
                      <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#51443c] block mb-1">Phone Number</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>

                  <Button onClick={() => setStep(2)} variant="secondary" className="w-full py-3">
                    Continue to Delivery Method
                  </Button>
                </div>
              ) : (
                <div className="text-xs text-[#51443c]">
                  <p className="font-bold text-[#201a18]">{fullName}</p>
                  <p>{street}, {city}, {state} {postalCode}</p>
                  <p>{phone}</p>
                </div>
              )}
            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#845331]" />
                  <span>2. Delivery Method</span>
                </h3>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-[#845331] hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-3 pt-2">
                  <label
                    onClick={() => setShippingCost(0)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingCost === 0
                        ? "border-[#845331] bg-[#f8ebe6] shadow-sm"
                        : "border-[#d6c3b8] bg-white hover:bg-[#fff8f6]"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#201a18]">Standard Delivery (Free)</h4>
                      <p className="text-[11px] text-[#84746b]">Delivered in 3-5 business days</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#845331]">$0.00</span>
                  </label>

                  <label
                    onClick={() => setShippingCost(15)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingCost === 15
                        ? "border-[#845331] bg-[#f8ebe6] shadow-sm"
                        : "border-[#d6c3b8] bg-white hover:bg-[#fff8f6]"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#201a18]">Express Overnight Shipping</h4>
                      <p className="text-[11px] text-[#84746b]">Delivered next business day</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#845331]">$15.00</span>
                  </label>

                  <Button onClick={() => setStep(3)} variant="secondary" className="w-full py-3">
                    Continue to Payment
                  </Button>
                </div>
              )}
            </div>

            {/* Step 3: Payment Selection & Review */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
              <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#845331]" />
                <span>3. Payment Gateway (Razorpay)</span>
              </h3>

              {step === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-[#f8ebe6] rounded-2xl border border-[#faba90] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#774827]">Razorpay Secure Checkout</span>
                      <ShieldCheck className="w-5 h-5 text-[#845331]" />
                    </div>
                    <p className="text-[#51443c]">
                      Supports Credit/Debit Cards, Net Banking, UPI, and Digital Wallets with server-side HMAC signature verification.
                    </p>
                  </div>

                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing || cartItems.length === 0}
                    variant="secondary"
                    size="lg"
                    className="w-full py-4 text-xs font-black tracking-wide"
                  >
                    {isProcessing ? "Processing Payment..." : `Pay $${grandTotal.toFixed(2)} with Razorpay`}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Cart Items (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-6">
              <h2 className="text-base font-extrabold text-[#201a18]">
                Order Summary ({cartItems.length})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs border-b border-[#f8ebe6] pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-xl object-cover border border-[#ece0db] bg-[#f8ebe6]" />
                      <div>
                        <h4 className="font-bold text-[#201a18] line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-[#84746b]">Qty: {item.quantity}</p>
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
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#51443c]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#201a18]">${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-bold text-[#201a18]">Grand Total</span>
                <span className="text-2xl font-extrabold text-[#845331]">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Coupon Code Section */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-[#f8ebe6] rounded-xl border border-[#faba90]">
                    <div className="flex items-center space-x-2 text-xs text-[#845331] font-bold">
                      <CheckCircle2 className="w-4 h-4" />
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
                      placeholder="Try: WELCOME10 or LUXE20"
                      value={inputCouponCode}
                      onChange={(e) => setInputCouponCode(e.target.value)}
                      className="flex-grow bg-[#f8ebe6]/60 border border-[#d6c3b8] rounded-xl px-4 py-2 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331]"
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
