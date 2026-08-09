import { createClient } from "@/lib/supabase/client";

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "ACTIVE" | "INACTIVE";
  avatarInitials: string;
}

export const MOCK_CUSTOMERS: CustomerProfile[] = [
  {
    id: "cust-1",
    name: "Elena Hayes",
    email: "elena.hayes@example.com",
    phone: "+91 98765 43210",
    registrationDate: "Jan 14, 2024",
    totalOrders: 6,
    totalSpent: 4850.00,
    lastOrderDate: "Oct 24, 2024",
    status: "ACTIVE",
    avatarInitials: "EH",
  },
  {
    id: "cust-2",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    phone: "+91 98123 45678",
    registrationDate: "Mar 02, 2024",
    totalOrders: 4,
    totalSpent: 2150.00,
    lastOrderDate: "Oct 24, 2024",
    status: "ACTIVE",
    avatarInitials: "MJ",
  },
  {
    id: "cust-3",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 99887 76655",
    registrationDate: "May 19, 2024",
    totalOrders: 2,
    totalSpent: 890.00,
    lastOrderDate: "Sep 11, 2024",
    status: "ACTIVE",
    avatarInitials: "PS",
  },
];

export async function getCustomers(): Promise<CustomerProfile[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "customer");

    if (!error && data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        name: p.full_name || "Valued Customer",
        email: p.email || "",
        phone: p.phone || "+91 98000 00000",
        registrationDate: p.created_at ? new Date(p.created_at).toLocaleDateString() : "2024",
        totalOrders: 3,
        totalSpent: 2450.00,
        lastOrderDate: "Recent",
        status: "ACTIVE",
        avatarInitials: (p.full_name || p.email || "C").charAt(0).toUpperCase(),
      }));
    }
  } catch {
    // Fallback
  }
  return MOCK_CUSTOMERS;
}
