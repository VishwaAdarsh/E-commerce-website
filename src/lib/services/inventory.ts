import { createClient } from "@/lib/supabase/client";

export interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
  image: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  changeType: "Stock Added" | "Stock Sold" | "Stock Returned" | "Stock Cancelled" | "Manual Adjustment";
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  adminUser: string;
  createdAt: string;
}

export const MOCK_MOVEMENTS: InventoryMovement[] = [
  {
    id: "mov-101",
    productId: "prod-1",
    productName: "Artisanal Terracotta Vessel",
    changeType: "Stock Added",
    quantity: 50,
    previousQuantity: 35,
    newQuantity: 85,
    reason: "Supplier batch delivery #IN-992",
    adminUser: "Merchant Admin",
    createdAt: "Today at 10:15 AM",
  },
  {
    id: "mov-102",
    productId: "prod-6",
    productName: "Titanium Field Watch No. 01",
    changeType: "Stock Sold",
    quantity: 2,
    previousQuantity: 10,
    newQuantity: 8,
    reason: "Customer Order #ORD-9931",
    adminUser: "System Automated",
    createdAt: "Yesterday at 4:20 PM",
  },
];

export async function logStockMovement(
  movement: Omit<InventoryMovement, "id" | "createdAt">
): Promise<InventoryMovement> {
  const supabase = createClient();
  const newMov: InventoryMovement = {
    id: `mov-${Date.now()}`,
    ...movement,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  try {
    await supabase.from("inventory_movements").insert({
      id: newMov.id,
      product_id: newMov.productId,
      change_type: newMov.changeType,
      quantity: newMov.quantity,
      previous_quantity: newMov.previousQuantity,
      new_quantity: newMov.newQuantity,
      reason: newMov.reason,
    });
  } catch {
    // Fallback
  }

  return newMov;
}
