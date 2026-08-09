import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getOrders } from "@/lib/services/orders";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const orders = await getOrders();
    return apiSuccess(orders);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch admin orders", 500);
  }
}
