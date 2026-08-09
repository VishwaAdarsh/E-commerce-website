"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCoupon } from "@/hooks/useCoupon";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const { appliedCoupon, applyCoupon, removeCoupon, discountAmount, finalTotal } = useCoupon(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#171310]/60 backdrop-blur-sm"
          />

          {/* Right Slide Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#FAF7F2] border-l border-[#E6DED5] shadow-drawer flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-white border-b border-[#E6DED5] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#171310]">
                  <ShoppingBag className="w-5 h-5 text-[#A56B4F]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#181512]">Your Cart</h3>
                  <p className="text-xs text-[#6F6861]">{cartItems.length} items selected</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[#6F6861] hover:text-[#181512] transition-colors rounded-full hover:bg-[#F2ECE4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 divide-y divide-[#E6DED5]">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-[#F2ECE4] rounded-full flex items-center justify-center mx-auto text-[#6F6861]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="text-base font-bold text-[#181512]">Your cart is waiting.</h4>
                  <p className="text-xs text-[#6F6861] max-w-xs mx-auto">
                    Looks like you haven't added any curated items to your shopping cart yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#171310] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex items-start space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E6DED5] bg-white flex-shrink-0"
                    />

                    <div className="flex-grow min-w-0 space-y-1">
                      <h4 className="text-xs font-bold text-[#181512] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#6F6861]">{item.variant}</p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E6DED5] rounded-lg bg-white px-2 py-1 space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-[#6F6861] hover:text-[#181512]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#181512] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[#6F6861] hover:text-[#181512]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#171310]">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#6F6861] hover:text-[#B74747] transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.75]" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Summary & Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E6DED5] space-y-4">
                {/* Coupon Code Input */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-[#A56B4F]">
                      <div className="flex items-center space-x-2 text-xs text-[#A56B4F] font-bold">
                        <Tag className="w-4 h-4" />
                        <span>{appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)</span>
                      </div>
                      <button onClick={removeCoupon} className="text-xs text-[#B74747] font-bold hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Coupon: WELCOME10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-3 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
                      />
                      <button
                        onClick={() => couponCode && applyCoupon(couponCode)}
                        className="px-4 py-2 bg-[#171310] text-white rounded-xl text-xs font-bold uppercase"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal Calculation */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#6F6861]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#181512]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#A56B4F]">
                      <span>Discount</span>
                      <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6F6861]">
                    <span>Shipping</span>
                    <span className="font-bold text-[#347A52]">Free Shipping</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#171310] border-t border-[#E6DED5] pt-2">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Link */}
                <Link href="/checkout" onClick={onClose} className="block">
                  <button className="w-full bg-[#171310] hover:bg-[#A56B4F] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-card">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-[#6F6861]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#347A52]" />
                  <span>100% Encrypted & Safe Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
