import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { logStockMovement, MOCK_MOVEMENTS } from "@/lib/services/inventory";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  return apiSuccess(MOCK_MOVEMENTS);
}

export async function POST(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const body = await request.json();
    const { productId, productName, changeType, quantity, previousQuantity, newQuantity, reason } = body;

    if (!productId || typeof quantity !== "number") {
      return apiError("VALIDATION_ERROR", "Product ID and valid quantity are required", 422);
    }

    const movement = await logStockMovement({
      productId,
      productName: productName || "Catalog Item",
      changeType: changeType || "Manual Adjustment",
      quantity,
      previousQuantity: previousQuantity || 0,
      newQuantity: newQuantity || quantity,
      reason: reason || "Manual adjustment",
      adminUser: "Merchant Admin",
    });

    return apiSuccess(movement, 201);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to log stock movement", 500);
  }
}
