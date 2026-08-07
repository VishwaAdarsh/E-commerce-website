export type ExtendedOrderStatus =
  | "Pending Payment"
  | "Payment Failed"
  | "Payment Success"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Ready to Ship"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Refunded";

export const VALID_TRANSITIONS: Record<ExtendedOrderStatus, ExtendedOrderStatus[]> = {
  "Pending Payment": ["Payment Failed", "Payment Success", "Cancelled"],
  "Payment Failed": ["Pending Payment", "Cancelled"],
  "Payment Success": ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Packed", "Cancelled"],
  Packed: ["Ready to Ship", "Cancelled"],
  "Ready to Ship": ["Shipped", "Cancelled"],
  Shipped: ["Out for Delivery", "Returned"],
  "Out for Delivery": ["Delivered", "Returned"],
  Delivered: ["Returned"],
  Cancelled: ["Refunded"],
  Returned: ["Refunded"],
  Refunded: [],
};

export function canTransition(current: ExtendedOrderStatus, next: ExtendedOrderStatus): boolean {
  const allowed = VALID_TRANSITIONS[current] || [];
  return allowed.includes(next);
}
