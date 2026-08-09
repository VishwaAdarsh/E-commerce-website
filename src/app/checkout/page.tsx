"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { useCoupon } from "@/hooks/useCoupon";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/payments/razorpay";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, MapPin, Truck, CreditCard, CheckCircle2, Lock, Tag } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [inputCouponCode, setInputCouponCode] = useState("");
  const { toast } = useToast();

  const { appliedCoupon, applyCoupon, removeCoupon, discountAmount, finalTotal } = useCoupon(subtotal);

  // Steps state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address State
  const [fullName, setFullName] = useState("Elena Hayes");
  const [street, setStreet] = useState("742 Evergreen Terrace");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("MH");
  const [postalCode, setPostalCode] = useState("400001");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [shippingCost, setShippingCost] = useState(0);
  const grandTotal = finalTotal + shippingCost;

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    toast("Initializing Razorpay secure checkout...", "info");

    try {
      const razorpayOrder = await createRazorpayOrder({
        amount: grandTotal,
        currency: "INR",
      });

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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-10 w-full space-y-8">
        {/* Header & Steps Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E6DED5] pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#347A52]">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL 256-Bit Encrypted Checkout</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#181512]">
              Secure Checkout
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold bg-white p-2 rounded-xl border border-[#E6DED5]">
            <span className={`px-3 py-1.5 rounded-lg ${step >= 1 ? "bg-[#171310] text-white" : "text-[#6F6861]"}`}>1. Address</span>
            <span>/</span>
            <span className={`px-3 py-1.5 rounded-lg ${step >= 2 ? "bg-[#171310] text-white" : "text-[#6F6861]"}`}>2. Delivery</span>
            <span>/</span>
            <span className={`px-3 py-1.5 rounded-lg ${step >= 3 ? "bg-[#171310] text-white" : "text-[#6F6861]"}`}>3. Payment</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Steps Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                <h3 className="text-base font-bold text-[#181512] flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#A56B4F]" />
                  <span>1. Shipping Address</span>
                </h3>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-[#A56B4F] hover:underline">Edit</button>
                )}
              </div>

              {step === 1 ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#181512] block mb-1">Full Name</label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#181512] block mb-1">Street Address</label>
                    <Input value={street} onChange={(e) => setStreet(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#181512] block mb-1">City</label>
                      <Input value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#181512] block mb-1">State</label>
                      <Input value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#181512] block mb-1">Pincode</label>
                      <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#181512] block mb-1">Mobile Number</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <button onClick={() => setStep(2)} className="w-full bg-[#171310] text-white py-3.5 rounded-xl text-xs font-bold uppercase">
                    Continue to Delivery Method
                  </button>
                </div>
              ) : (
                <div className="text-xs text-[#6F6861]">
                  <p className="font-bold text-[#181512]">{fullName}</p>
                  <p>{street}, {city}, {state} {postalCode}</p>
                  <p>{phone}</p>
                </div>
              )}
            </div>

            {/* Step 2: Delivery */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                <h3 className="text-base font-bold text-[#181512] flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#A56B4F]" />
                  <span>2. Delivery Method</span>
                </h3>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-[#A56B4F] hover:underline">Edit</button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-3 pt-2">
                  <label onClick={() => setShippingCost(0)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${shippingCost === 0 ? "border-[#A56B4F] bg-[#FAF7F2]" : "border-[#E6DED5]"}`}>
                    <div>
                      <h4 className="text-xs font-bold text-[#181512]">Standard Delivery (Free)</h4>
                      <p className="text-[11px] text-[#6F6861]">Delivered in 3–5 business days</p>
                    </div>
                    <span className="text-xs font-bold text-[#347A52]">FREE</span>
                  </label>

                  <button onClick={() => setStep(3)} className="w-full bg-[#171310] text-white py-3.5 rounded-xl text-xs font-bold uppercase">
                    Continue to Payment
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
              <h3 className="text-base font-bold text-[#181512] flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#A56B4F]" />
                <span>3. Payment Gateway (Razorpay)</span>
              </h3>

              {step === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#A56B4F]/40 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#171310]">Razorpay Secure Checkout</span>
                      <ShieldCheck className="w-5 h-5 text-[#347A52]" />
                    </div>
                    <p className="text-[#6F6861]">
                      Supports Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Digital Wallets.
                    </p>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing || cartItems.length === 0}
                    className="w-full bg-[#171310] hover:bg-[#A56B4F] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-card flex items-center justify-center space-x-2"
                  >
                    <span>{isProcessing ? "Processing Payment..." : `Pay ₹${grandTotal.toLocaleString()} with Razorpay`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-6">
              <h2 className="text-base font-bold text-[#181512]">Order Summary ({cartItems.length})</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs border-b border-[#E6DED5]/60 pb-3">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover border border-[#E6DED5]" />
                      <div>
                        <h4 className="font-bold text-[#181512] line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-[#6F6861]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#181512]">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-b border-[#E6DED5] py-4">
                <div className="flex justify-between text-[#6F6861]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#181512]">₹{subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#A56B4F] font-bold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6F6861]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#347A52]">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-bold text-[#181512]">Grand Total</span>
                <span className="text-2xl font-extrabold text-[#171310]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
