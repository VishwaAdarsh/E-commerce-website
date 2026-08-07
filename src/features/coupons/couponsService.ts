export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
}

export const VALID_COUPONS: Record<string, Coupon> = {
  WELCOME10: { code: "WELCOME10", discountPercentage: 10, description: "10% Welcome Discount" },
  LUXE20: { code: "LUXE20", discountPercentage: 20, description: "20% Exclusive Member Discount" },
  EARTH15: { code: "EARTH15", discountPercentage: 15, description: "15% Sustainable Earth Discount" },
};

export function validateCoupon(code: string): { valid: boolean; coupon?: Coupon; error?: string } {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, error: "Please enter a coupon code." };
  }
  const coupon = VALID_COUPONS[cleanCode];
  if (coupon) {
    return { valid: true, coupon };
  }
  return { valid: false, error: "Invalid or expired coupon code." };
}
