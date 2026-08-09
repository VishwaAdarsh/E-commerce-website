import { createClient } from "@/lib/supabase/client";

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscount?: number;
  usageLimit: number;
  perUserLimit: number;
  usedCount: number;
  startDate: string;
  expiryDate: string;
  status: "ACTIVE" | "EXPIRED" | "DISABLED";
}

export const MOCK_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "LUXE10",
    description: "10% discount on all artisanal ceramic products",
    discountType: "percentage",
    discountValue: 10,
    minimumOrderValue: 500,
    maximumDiscount: 1000,
    usageLimit: 200,
    perUserLimit: 1,
    usedCount: 42,
    startDate: "2024-01-01",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
  },
  {
    id: "coup-2",
    code: "FESTIVE500",
    description: "Flat ₹500 off on orders above ₹3,000",
    discountType: "fixed_amount",
    discountValue: 500,
    minimumOrderValue: 3000,
    usageLimit: 100,
    perUserLimit: 1,
    usedCount: 19,
    startDate: "2024-01-01",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
  },
];

export async function getCoupons(): Promise<Coupon[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("coupons").select("*");
    if (!error && data && data.length > 0) {
      return data as Coupon[];
    }
  } catch {
    // Fallback
  }
  return MOCK_COUPONS;
}

export async function validateCoupon(code: string, orderAmount: number): Promise<{ valid: boolean; discount: number; message: string }> {
  const coupons = await getCoupons();
  const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!found) {
    return { valid: false, discount: 0, message: "Invalid coupon code." };
  }

  if (found.status !== "ACTIVE") {
    return { valid: false, discount: 0, message: "This coupon is no longer active." };
  }

  if (orderAmount < found.minimumOrderValue) {
    return { valid: false, discount: 0, message: `Minimum order amount of ₹${found.minimumOrderValue} required for this coupon.` };
  }

  let discount = 0;
  if (found.discountType === "percentage") {
    discount = (orderAmount * found.discountValue) / 100;
    if (found.maximumDiscount && discount > found.maximumDiscount) {
      discount = found.maximumDiscount;
    }
  } else {
    discount = found.discountValue;
  }

  return { valid: true, discount, message: "Coupon applied successfully!" };
}
