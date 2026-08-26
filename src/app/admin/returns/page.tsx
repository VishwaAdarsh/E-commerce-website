"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { getReturnRequests, updateReturnStatus, ReturnRequest, MOCK_RETURNS } from "@/lib/services/returns";
import { useToast } from "@/components/ui/Toast";
import { RefreshCw, Search, CheckCircle2, XCircle, AlertTriangle, PackageCheck, DollarSign } from "lucide-react";

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<ReturnRequest[]>(MOCK_RETURNS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getReturnRequests();
      setReturns(data);
    }
    load();
  }, []);

  const handleReturnClick = (ret: ReturnRequest) => {
    setSelectedReturn(ret);
    setAdminNotes(ret.adminNotes || "");
    setIsDrawerOpen(true);
  };

  const handleStatusChange = async (returnId: string, status: ReturnRequest["status"]) => {
    await updateReturnStatus(returnId, status, adminNotes);
    setReturns((prev) => prev.map((r) => (r.id === returnId ? { ...r, status, adminNotes } : r)));
    if (selectedReturn) {
      setSelectedReturn({ ...selectedReturn, status, adminNotes });
    }
    toast(`Return ${returnId} status updated to ${status}`, "success");
  };

  const filteredReturns = returns.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = returns.filter((r) => r.status === "Requested" || r.status === "Under Review").length;
  const approvedCount = returns.filter((r) => r.status === "Approved" || r.status === "Return In Transit").length;
  const refundedTotal = returns.filter((r) => r.status === "Refunded").reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">RETURNS & REFUNDS ERP</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Return Requests Dashboard</h1>
            <p className="text-xs text-[#6F6861] mt-1">Review customer return requests, inspect evidence, manage restocking, and trigger refunds.</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Return ID or Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL RETURNS</span>
            <p className="text-2xl font-extrabold text-[#181512]">{returns.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F]">PENDING APPROVAL</span>
            <p className="text-2xl font-extrabold text-[#A56B4F]">{pendingCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#347A52]">APPROVED RETURNS</span>
            <p className="text-2xl font-extrabold text-[#347A52]">{approvedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#171310]">REFUNDED AMOUNT</span>
            <p className="text-2xl font-extrabold text-[#171310]">₹{refundedTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Returns Table */}
        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">RETURN ID</th>
                  <th className="py-3 px-4">ORDER ID</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">PRODUCT</th>
                  <th className="py-3 px-4">REASON</th>
                  <th className="py-3 px-4 text-right">AMOUNT</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredReturns.map((ret) => (
                  <tr key={ret.id} onClick={() => handleReturnClick(ret)} className="cursor-pointer hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#A56B4F] font-mono">{ret.id}</td>
                    <td className="py-4 px-4 font-mono text-[#181512] font-semibold">{ret.orderId}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-[#181512] block">{ret.customerName}</span>
                      <span className="text-[10px] text-[#6F6861]">{ret.customerEmail}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#181512]">{ret.productName}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{ret.reason}</td>
                    <td className="py-4 px-4 text-right font-extrabold text-[#171310]">₹{ret.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right"><Badge status={ret.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={`Return Request Details — ${selectedReturn?.id}`}>
          {selectedReturn && (
            <div className="space-y-6 text-xs">
              <div className="pb-4 border-b border-[#E6DED5] space-y-1">
                <Badge status={selectedReturn.status} />
                <h3 className="text-base font-bold text-[#181512] pt-2">{selectedReturn.productName}</h3>
                <p className="text-[11px] text-[#6F6861]">Order: {selectedReturn.orderId} • Customer: {selectedReturn.customerName}</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F] block">Return Reason & Description</span>
                <p className="font-bold text-[#181512]">{selectedReturn.reason}</p>
                <p className="text-[#6F6861] leading-relaxed">{selectedReturn.description}</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861] block">Admin Internal Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record inspection notes or refund approval reference..."
                  className="w-full bg-white border border-[#E6DED5] rounded-xl p-3 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                  rows={3}
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E6DED5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861] block">Admin Return Workflow Actions</span>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handleStatusChange(selectedReturn.id, "Approved")} className="bg-[#347A52] text-white text-xs">
                    Approve Return
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedReturn.id, "Rejected")} variant="outline" className="text-xs text-[#B74747]">
                    Reject Request
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedReturn.id, "Received")} variant="outline" className="text-xs">
                    Mark Item Received
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedReturn.id, "Refunded")} className="bg-[#171310] text-white text-xs">
                    Trigger Refund (₹{selectedReturn.amount})
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </main>
    </div>
  );
}
