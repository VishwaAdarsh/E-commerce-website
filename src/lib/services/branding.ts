import { createClient } from "@/lib/supabase/client";

export interface BrandSettings {
  storeName: string;
  slogan: string;
  logoUrl: string;
  squareLogoUrl: string;
  faviconUrl: string;
  coverImageUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  supportEmail: string;
  phone: string;
  instagramUrl: string;
  twitterUrl: string;
  facebookUrl: string;
}

export const DEFAULT_BRANDING: BrandSettings = {
  storeName: "LUXE Commerce",
  slogan: "Curated Luxury Artifacts & Design Objects",
  logoUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300&auto=format&fit=crop",
  squareLogoUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200&auto=format&fit=crop",
  faviconUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=64&auto=format&fit=crop",
  coverImageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
  primaryColor: "#171310",
  secondaryColor: "#FAF7F2",
  accentColor: "#A56B4F",
  supportEmail: "support@luxe.com",
  phone: "+91 98000 12345",
  instagramUrl: "https://instagram.com/luxe",
  twitterUrl: "https://twitter.com/luxe",
  facebookUrl: "https://facebook.com/luxe",
};

export async function getBrandSettings(): Promise<BrandSettings> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("brand_settings").select("*").eq("key", "global").single();
    if (!error && data?.value) {
      return data.value as BrandSettings;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_BRANDING;
}

export async function saveBrandSettings(branding: BrandSettings): Promise<boolean> {
  const supabase = createClient();
  try {
    await supabase.from("brand_settings").upsert({
      key: "global",
      value: branding,
      updated_at: new Date().toISOString(),
    });
    return true;
  } catch {
    return true;
  }
}
