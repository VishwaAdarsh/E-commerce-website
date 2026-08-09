"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { getTickets, updateTicketStatus, SupportTicket, MOCK_TICKETS } from "@/lib/services/tickets";
import { useToast } from "@/components/ui/Toast";
import { LifeBuoy, Search, MessageSquare, CheckCircle2, Clock } from "lucide-react";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getTickets();
      setTickets(data);
    }
    load();
  }, []);

  const handleTicketClick = (t: SupportTicket) => {
    setSelectedTicket(t);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = async (ticketId: string, status: SupportTicket["status"]) => {
    await updateTicketStatus(ticketId, status);
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status } : t)));
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status });
    }
    toast(`Ticket #${ticketId} status updated to ${status}`, "success");
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">CUSTOMER CARE & HELP DESK</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Support Ticket Queue</h1>
            <p className="text-xs text-[#6F6861] mt-1">Manage customer inquiries, order assistance, and support responses.</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ticket ID or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">TICKET ID</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">SUBJECT</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredTickets.map((t) => (
                  <tr key={t.id} onClick={() => handleTicketClick(t)} className="cursor-pointer hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#A56B4F] font-mono">{t.id}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-[#181512] block">{t.customerName}</span>
                      <span className="text-[10px] text-[#6F6861]">{t.customerEmail}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#181512]">{t.subject}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{t.createdAt}</td>
                    <td className="py-4 px-4 text-right"><Badge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={`Ticket Details — ${selectedTicket?.id}`}>
          {selectedTicket && (
            <div className="space-y-6 text-xs">
              <div className="pb-4 border-b border-[#E6DED5] space-y-1">
                <Badge status={selectedTicket.status} />
                <h3 className="text-base font-bold text-[#181512] pt-2">{selectedTicket.subject}</h3>
                <p className="text-[11px] text-[#6F6861]">From: {selectedTicket.customerName} ({selectedTicket.customerEmail})</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F] block">Customer Message</span>
                <p className="text-[#181512] leading-relaxed">
                  {selectedTicket.messages?.[0]?.text || "No message body recorded."}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861] block">Update Status</span>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handleStatusChange(selectedTicket.id, "In Progress")} variant="outline" className="text-xs">
                    Mark In Progress
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedTicket.id, "Resolved")} className="bg-[#347A52] text-white text-xs">
                    Mark Resolved
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
