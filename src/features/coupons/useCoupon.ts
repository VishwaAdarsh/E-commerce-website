"use client";

import { useState } from "react";
import { validateCoupon, Coupon } from "@/features/coupons/couponsService";
import { useToast } from "@/components/ui/Toast";

export function useCoupon(subtotal: number) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const applyCoupon = (code: string) => {
    const result = validateCoupon(code);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setError(null);
      toast(`Coupon "${result.coupon.code}" applied!`, "success");
    } else {
      setError(result.error || "Invalid coupon.");
      toast(result.error || "Invalid coupon.", "error");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setError(null);
    toast("Coupon removed.", "info");
  };

  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discountPercentage) / 100
    : 0;

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return {
    appliedCoupon,
    error,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
  };
}
