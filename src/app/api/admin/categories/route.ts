import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getCategories, createCategory } from "@/lib/services/categories";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const categories = await getCategories();
    return apiSuccess(categories);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch categories", 500);
  }
}

export async function POST(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const body = await request.json();
    const { name, slug, description, image, parentId } = body;

    if (!name || !slug) {
      return apiError("VALIDATION_ERROR", "Category name and slug are required", 422);
    }

    const newCat = await createCategory({
      name,
      slug,
      description: description || "",
      image: image || "",
      status: "ACTIVE",
      sortOrder: 1,
      parentId: parentId || null,
    });

    return apiSuccess(newCat, 201);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to create category", 500);
  }
}
