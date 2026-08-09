import { NextRequest } from "next/server";
import { getProductById } from "@/lib/services/products";
import { apiSuccess, apiError } from "@/lib/utils/api-response";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await getProductById(id);
    if (!product) {
      return apiError("NOT_FOUND", "Product not found", 404);
    }
    return apiSuccess(product);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch product", 500);
  }
}
