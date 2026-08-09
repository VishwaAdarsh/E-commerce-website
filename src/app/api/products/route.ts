import { NextRequest } from "next/server";
import { getProducts } from "@/lib/services/products";
import { apiSuccess, apiError } from "@/lib/utils/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("query") || undefined;

    const products = await getProducts(category, query);
    return apiSuccess(products);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch products", 500);
  }
}
