"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getCoupons, Coupon, MOCK_COUPONS } from "@/lib/services/coupons";
import { useToast } from "@/components/ui/Toast";
import { Ticket, Plus, Search, Tag, Percent, DollarSign } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed_amount">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCoupons();
      setCoupons(data);
    }
    load();
  }, []);

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discountValue) return;

    const newCoup: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue: parseFloat(discountValue) || 0,
      minimumOrderValue: parseFloat(minOrder) || 0,
      usageLimit: 100,
      perUserLimit: 1,
      usedCount: 0,
      startDate: new Date().toISOString().split("T")[0],
      expiryDate: "2026-12-31",
      status: "ACTIVE",
    };

    setCoupons([newCoup, ...coupons]);
    toast(`Coupon "${newCoup.code}" created!`, "success");
    setIsModalOpen(false);
    setCode("");
    setDescription("");
    setDiscountValue("");
    setMinOrder("");
  };

  const filteredCoupons = coupons.filter(
    (c) => c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">PROMOTIONS & DISCOUNTS</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Coupon Engine</h1>
            <p className="text-xs text-[#6F6861] mt-1">Manage promotional campaign codes, discount rules, and usage limits.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coupon code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
              />
            </div>

            <Button onClick={() => setIsModalOpen(true)} className="bg-[#171310] hover:bg-[#A56B4F] text-white">
              <Plus className="w-4 h-4 mr-2" />
              <span>Create Coupon</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">CODE</th>
                  <th className="py-3 px-4">DISCOUNT</th>
                  <th className="py-3 px-4">MIN ORDER</th>
                  <th className="py-3 px-4">USAGE</th>
                  <th className="py-3 px-4">EXPIRY</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredCoupons.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#181512]">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-[#A56B4F]" />
                        <span className="font-mono">{c.code}</span>
                      </div>
                      <p className="text-[10px] text-[#6F6861] font-normal">{c.description}</p>
                    </td>
                    <td className="py-4 px-4 font-bold text-[#171310]">
                      {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                    </td>
                    <td className="py-4 px-4 text-[#6F6861]">₹{c.minimumOrderValue}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{c.usedCount} / {c.usageLimit}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{c.expiryDate}</td>
                    <td className="py-4 px-4 text-right"><Badge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Campaign Coupon">
          <form onSubmit={handleSaveCoupon} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Coupon Code</label>
              <Input placeholder="e.g. LUXE20" value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Description</label>
              <Input placeholder="20% off festival sale..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full bg-white border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512]"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed_amount">Fixed Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#6F6861] block mb-1">Discount Value</label>
                <Input type="number" placeholder="20" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Minimum Order Amount (₹)</label>
              <Input type="number" placeholder="1000" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} />
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#171310] hover:bg-[#A56B4F] text-white">Save Coupon</Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
