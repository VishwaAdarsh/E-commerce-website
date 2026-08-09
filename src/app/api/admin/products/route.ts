import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getProducts, createProduct } from "@/lib/services/products";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const products = await getProducts();
    return apiSuccess(products);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch admin products", 500);
  }
}

export async function POST(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const body = await request.json();
    const { name, price, stock, category, description, image, sku, status } = body;

    // Server-side Validation
    if (!name || name.trim().length === 0) {
      return apiError("VALIDATION_ERROR", "Product name is required", 422);
    }
    if (typeof price !== "number" || price < 0) {
      return apiError("VALIDATION_ERROR", "Valid product price is required", 422);
    }
    if (typeof stock !== "number" || stock < 0) {
      return apiError("VALIDATION_ERROR", "Valid stock count is required", 422);
    }
    if (!category) {
      return apiError("VALIDATION_ERROR", "Product category is required", 422);
    }

    const newProduct = await createProduct({
      name: name.trim(),
      price,
      stock,
      category,
      description: description || "",
      image: image || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop",
      isNew: true,
      rating: 5.0,
      status: status || "Active",
      sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
    });

    return apiSuccess(newProduct, 201);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to create product", 500);
  }
}
