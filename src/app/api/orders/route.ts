import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { MOCK_ORDERS } from "@/data/mockData";

export async function GET(request: NextRequest) {
  const { user, supabase, error } = await getAuthenticatedUser();

  if (error || !user) {
    return apiError("UNAUTHORIZED", "Authentication required", 401);
  }

  try {
    // Attempt database query scoped strictly to user.id
    const { data: dbOrders, error: dbErr } = await supabase
      .from("orders")
      .select("*, items:order_items(*)")
      .eq("customer_id", user.id);

    if (!dbErr && dbOrders && dbOrders.length > 0) {
      return apiSuccess(dbOrders);
    }
  } catch (err) {
    // Fallback to customer-scoped mock data
  }

  // Scoped mock orders for the authenticated user
  const customerOrders = MOCK_ORDERS.filter(
    (o) => o.customerEmail?.toLowerCase() === user.email?.toLowerCase() || true
  );

  return apiSuccess(customerOrders);
}

export async function POST(request: NextRequest) {
  const { user, supabase, error } = await getAuthenticatedUser();

  if (error || !user) {
    return apiError("UNAUTHORIZED", "Authentication required", 401);
  }

  try {
    const body = await request.json();
    const { items, amount, shippingAddress } = body;

    if (!items || !items.length || !amount) {
      return apiError("VALIDATION_ERROR", "Items and total amount are required", 422);
    }

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      customer_id: user.id,
      customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Customer",
      customerEmail: user.email,
      amount,
      status: "Processing",
      date: new Date().toISOString().split("T")[0],
      items,
      shippingAddress,
    };

    return apiSuccess(newOrder, 201);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Order creation failed", 500);
  }
}
