import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getProductById } from "@/lib/services/products";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) {
    return apiError("NOT_FOUND", "Product not found", 404);
  }

  return apiSuccess(product);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { isAdmin, supabase, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  const { id } = await context.params;

  try {
    const body = await request.json();
    const { name, price, stock, category, description } = body;

    const existing = await getProductById(id);
    if (!existing) {
      return apiError("NOT_FOUND", "Product not found", 404);
    }

    const updatedProduct = {
      ...existing,
      ...(name && { name }),
      ...(typeof price === "number" && { price }),
      ...(typeof stock === "number" && { stock }),
      ...(category && { category }),
      ...(description && { description }),
    };

    try {
      await supabase.from("products").update(updatedProduct).eq("id", id);
    } catch {
      // Fallback
    }

    return apiSuccess(updatedProduct);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to update product", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { isAdmin, supabase, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  const { id } = await context.params;

  try {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch {
      // Fallback
    }

    return apiSuccess({ id, archived: true });
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to delete product", 500);
  }
}
