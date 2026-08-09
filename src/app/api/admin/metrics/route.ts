import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getProducts } from "@/lib/services/products";
import { getOrders } from "@/lib/services/orders";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const products = await getProducts();
    const orders = await getOrders();

    const totalProducts = products.length;
    const activeProducts = products.length;
    const lowStock = products.filter((p) => (p.stock || 10) <= 5).length;

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
    const revenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

    return apiSuccess({
      totalProducts,
      activeProducts,
      lowStock,
      totalOrders,
      pendingOrders,
      revenue,
    });
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to calculate admin metrics", 500);
  }
}
