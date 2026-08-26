"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getBrandSettings, saveBrandSettings, BrandSettings, DEFAULT_BRANDING } from "@/lib/services/branding";
import { useToast } from "@/components/ui/Toast";
import { Palette, Save, Image, Globe, Shield } from "lucide-react";

export default function AdminBrandingPage() {
  const [branding, setBranding] = useState<BrandSettings>(DEFAULT_BRANDING);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getBrandSettings();
      setBranding(data);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    toast("Saving store branding assets & tokens...", "info");
    await saveBrandSettings(branding);
    toast("Store branding settings updated successfully!", "success");
    setSaving(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">BRAND ASSETS INFRASTRUCTURE</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Store Branding & Theme</h1>
            <p className="text-xs text-[#6F6861] mt-1">Configure brand identity assets, logo URLs, favicon, slogan, and primary palette tokens.</p>
          </div>

          <Button onClick={handleSave} disabled={saving} className="bg-[#171310] hover:bg-[#A56B4F] text-white">
            <Save className="w-4 h-4 mr-2" />
            <span>{saving ? "Saving..." : "Save Branding"}</span>
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & Asset URLs */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#181512]">Brand Identity Assets</h3>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Store Name</label>
              <Input
                value={branding.storeName}
                onChange={(e) => setBranding({ ...branding, storeName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Store Slogan / Tagline</label>
              <Input
                value={branding.slogan}
                onChange={(e) => setBranding({ ...branding, slogan: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Primary Logo URL</label>
                <Input
                  value={branding.logoUrl}
                  onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Favicon URL</label>
                <Input
                  value={branding.faviconUrl}
                  onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#181512]">Color Palette Tokens</h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Primary Dark</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                    className="w-8 h-8 rounded border border-[#E6DED5] cursor-pointer"
                  />
                  <Input
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Secondary Light</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={branding.secondaryColor}
                    onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                    className="w-8 h-8 rounded border border-[#E6DED5] cursor-pointer"
                  />
                  <Input
                    value={branding.secondaryColor}
                    onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Accent Terracotta</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={branding.accentColor}
                    onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                    className="w-8 h-8 rounded border border-[#E6DED5] cursor-pointer"
                  />
                  <Input
                    value={branding.accentColor}
                    onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
