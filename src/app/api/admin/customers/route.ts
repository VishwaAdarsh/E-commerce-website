import { NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { getCustomers } from "@/lib/services/customers";

export async function GET(request: NextRequest) {
  const { isAdmin, response } = await requireAdminUser();
  if (!isAdmin) return response!;

  try {
    const customers = await getCustomers();
    return apiSuccess(customers);
  } catch (err: any) {
    return apiError("INTERNAL_ERROR", err?.message || "Failed to fetch customers", 500);
  }
}
