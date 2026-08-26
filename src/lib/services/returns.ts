import { createClient } from "@/lib/supabase/client";

export interface ReturnRequest {
  id: string;
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productImage: string;
  quantity: number;
  amount: number;
  reason: string;
  description: string;
  evidenceImages: string[];
  status:
    | "Requested"
    | "Under Review"
    | "Approved"
    | "Rejected"
    | "Return In Transit"
    | "Received"
    | "Inspection"
    | "Refund Processing"
    | "Refunded"
    | "Closed";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_RETURNS: ReturnRequest[] = [
  {
    id: "RET-9012",
    orderId: "#ORD-9932",
    userId: "demo-cust-id-88",
    customerName: "Elena Hayes",
    customerEmail: "elena.hayes@example.com",
    productName: "Aluminum Type K2 Keyboard",
    productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop",
    quantity: 1,
    amount: 189.00,
    reason: "Damaged / Key switch defect",
    description: "Spacebar switch key chatter noticed upon unboxing.",
    evidenceImages: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop"],
    status: "Approved",
    adminNotes: "Return label generated. Restock upon inspection.",
    createdAt: "2026-08-08 11:30",
    updatedAt: "2026-08-08 14:15",
  },
  {
    id: "RET-9013",
    orderId: "#ORD-9931",
    userId: "demo-cust-id-88",
    customerName: "Marcus Johnson",
    customerEmail: "marcus.j@example.com",
    productName: "Titanium Field Watch No. 01",
    productImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop",
    quantity: 1,
    amount: 450.00,
    reason: "Changed Mind / Size Preference",
    description: "Decided to upgrade to a chronograph model instead.",
    evidenceImages: [],
    status: "Requested",
    createdAt: "2026-08-09 09:10",
    updatedAt: "2026-08-09 09:10",
  },
];

export async function getReturnRequests(userId?: string): Promise<ReturnRequest[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("returns").select("*");
    if (userId) {
      query = query.eq("user_id", userId);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as any;
    }
  } catch {
    // Fallback
  }
  return userId ? MOCK_RETURNS.filter((r) => r.userId === userId) : MOCK_RETURNS;
}

export async function createReturnRequest(data: Omit<ReturnRequest, "id" | "createdAt" | "updatedAt" | "status">): Promise<ReturnRequest> {
  const supabase = createClient();
  const newId = `RET-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReturn: ReturnRequest = {
    id: newId,
    ...data,
    status: "Requested",
    createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
  };

  try {
    await supabase.from("returns").insert({
      id: newReturn.id,
      order_id: newReturn.orderId,
      user_id: newReturn.userId,
      reason: newReturn.reason,
      description: newReturn.description,
      status: newReturn.status,
    });
  } catch {
    // Fallback
  }

  MOCK_RETURNS.unshift(newReturn);
  return newReturn;
}

export async function updateReturnStatus(returnId: string, status: ReturnRequest["status"], adminNotes?: string): Promise<boolean> {
  const ret = MOCK_RETURNS.find((r) => r.id === returnId);
  if (ret) {
    ret.status = status;
    if (adminNotes) ret.adminNotes = adminNotes;
    ret.updatedAt = new Date().toISOString().replace("T", " ").substring(0, 16);
    return true;
  }
  return false;
}
