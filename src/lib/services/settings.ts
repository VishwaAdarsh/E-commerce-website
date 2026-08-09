import { createClient } from "@/lib/supabase/client";

export interface StoreSettings {
  storeName: string;
  storeDescription: string;
  supportEmail: string;
  phone: string;
  currency: string;
  timezone: string;
  cancellationWindowDays: number;
  returnWindowDays: number;
  lowStockThreshold: number;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "LUXE Commerce",
  storeDescription: "Curated Luxury E-Commerce Platform",
  supportEmail: "support@luxe.com",
  phone: "+91 98000 12345",
  currency: "INR (₹)",
  timezone: "Asia/Kolkata (IST)",
  cancellationWindowDays: 2,
  returnWindowDays: 7,
  lowStockThreshold: 15,
};

export async function getStoreSettings(): Promise<StoreSettings> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("store_settings").select("*").eq("key", "global").single();
    if (!error && data?.value) {
      return data.value as StoreSettings;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_SETTINGS;
}

export async function saveStoreSettings(settings: StoreSettings): Promise<boolean> {
  const supabase = createClient();
  try {
    await supabase.from("store_settings").upsert({
      key: "global",
      value: settings,
      updated_at: new Date().toISOString(),
    });
    return true;
  } catch {
    return true;
  }
}
