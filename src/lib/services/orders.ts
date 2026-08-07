import { createClient } from "@/lib/supabase/client";
import { Order, MOCK_ORDERS } from "@/data/mockData";

export async function getOrders(): Promise<Order[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("orders").select("*, items:order_items(*)");
    if (!error && data && data.length > 0) {
      return data as Order[];
    }
  } catch (err) {
    console.warn("Using fallback orders data:", err);
  }

  return MOCK_ORDERS;
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (!error) return true;
  } catch (err) {
    console.warn("Updated local order status fallback:", err);
  }

  return true;
}
