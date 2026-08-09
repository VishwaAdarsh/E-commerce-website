import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { updateOrderStatus } from "@/lib/services/orders";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  const { id } = await context.params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return apiError("VALIDATION_ERROR", "Order status is required", 422);
    }

    const success = await updateOrderStatus(id, status);
    if (!success) {
      return apiError("INTERNAL_ERROR", "Failed to update order status", 500);
    }

    return apiSuccess({ id, status });
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to update order", 500);
  }
}
