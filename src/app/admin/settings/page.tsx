"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getStoreSettings, saveStoreSettings, StoreSettings, DEFAULT_SETTINGS } from "@/lib/services/settings";
import { useToast } from "@/components/ui/Toast";
import { Settings, Save, Store, Shield, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getStoreSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    toast("Saving store settings...", "info");

    const success = await saveStoreSettings(settings);
    if (success) {
      toast("Store settings saved successfully!", "success");
    } else {
      toast("Failed to save settings.", "error");
    }
    setSaving(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">STORE CONFIGURATION</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Store Settings</h1>
            <p className="text-xs text-[#6F6861] mt-1">General store identity, currency, order return policies, and stock alert rules.</p>
          </div>

          <Button onClick={handleSave} disabled={saving} className="bg-[#171310] hover:bg-[#A56B4F] text-white">
            <Save className="w-4 h-4 mr-2" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Store Details */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#181512]">General Store Identity</h3>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Store Name</label>
              <Input
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Store Description</label>
              <Input
                value={settings.storeDescription}
                onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Support Email</label>
                <Input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Support Phone</label>
                <Input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Regional & Policy Rules */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#181512]">Order Rules & Inventory Controls</h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Cancellation Window (Days)</label>
                <Input
                  type="number"
                  value={settings.cancellationWindowDays}
                  onChange={(e) => setSettings({ ...settings, cancellationWindowDays: parseInt(e.target.value, 10) || 1 })}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Return Window (Days)</label>
                <Input
                  type="number"
                  value={settings.returnWindowDays}
                  onChange={(e) => setSettings({ ...settings, returnWindowDays: parseInt(e.target.value, 10) || 7 })}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Low Stock Alert Threshold</label>
                <Input
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => setSettings({ ...settings, lowStockThreshold: parseInt(e.target.value, 10) || 5 })}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
