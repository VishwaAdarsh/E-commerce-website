import { NextRequest } from "next/server";
import { validateCoupon } from "@/lib/services/coupons";
import { apiSuccess, apiError } from "@/lib/utils/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, amount } = body;

    if (!code || typeof amount !== "number") {
      return apiError("VALIDATION_ERROR", "Coupon code and order amount are required", 422);
    }

    const result = await validateCoupon(code, amount);
    if (!result.valid) {
      return apiError("INVALID_COUPON", result.message, 400);
    }

    return apiSuccess({
      code,
      discount: result.discount,
      message: result.message,
    });
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Coupon validation failed", 500);
  }
}
