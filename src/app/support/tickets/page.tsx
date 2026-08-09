"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { getTicketById } from "@/lib/services/tickets";
import { SupportTicket } from "@/types/erp";
import { Search, Clock, ShieldCheck, MessageSquare, AlertCircle, ArrowLeft } from "lucide-react";

export default function TicketStatusPage() {
  const [ticketSearchInput, setTicketSearchInput] = useState("SUP-1092");
  const [searchedTicket, setSearchedTicket] = useState<SupportTicket | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSearchInput.trim()) return;

    const ticket = await getTicketById(ticketSearchInput);
    setSearchedTicket(ticket);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-4xl mx-auto px-6 md:px-12 py-10 w-full space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 border-b border-[#E6DED5] pb-6">
          <div className="text-xs text-[#6F6861] flex items-center space-x-2 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-[#A56B4F]">Home</Link>
            <span>/</span>
            <Link href="/support" className="hover:text-[#A56B4F]">Support</Link>
            <span>/</span>
            <span className="text-[#181512] font-bold">Ticket Status Tracker</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#171310]">
            Track Support Ticket Status
          </h1>
          <p className="text-xs md:text-sm text-[#6F6861]">
            Enter your support reference ticket ID (e.g., SUP-1092) to view status updates and support agent replies.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-[#E6DED5] shadow-subtle">
          <Search className="w-5 h-5 text-[#6F6861] ml-3" />
          <input
            type="text"
            placeholder="Enter Ticket ID (e.g. SUP-1092)..."
            value={ticketSearchInput}
            onChange={(e) => setTicketSearchInput(e.target.value)}
            className="flex-grow bg-transparent text-xs font-bold text-[#181512] placeholder-[#6F6861] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#171310] hover:bg-[#A56B4F] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Track Ticket
          </button>
        </form>

        {/* Ticket Details View */}
        {hasSearched && (
          <div>
            {searchedTicket ? (
              <div className="bg-white rounded-3xl p-8 border border-[#E6DED5] shadow-card space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6DED5] pb-4 gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
                      TICKET #{searchedTicket.id}
                    </span>
                    <h3 className="text-base font-bold text-[#181512]">{searchedTicket.subject}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#6F6861]">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                      searchedTicket.status === "Open"
                        ? "bg-[#FAF7F2] text-[#A56B4F] border border-[#E6DED5]"
                        : "bg-[#347A52] text-white"
                    }`}>
                      {searchedTicket.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-[#6F6861] bg-[#FAF7F2] p-4 rounded-2xl border border-[#E6DED5]">
                  <div>
                    <span>Customer Name:</span>
                    <p className="font-bold text-[#181512]">{searchedTicket.customerName}</p>
                  </div>
                  <div>
                    <span>Created Timestamp:</span>
                    <p className="font-bold text-[#181512]">{searchedTicket.createdAt}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171310]">Message History</h4>
                  <div className="space-y-3">
                    {searchedTicket.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border text-xs space-y-1 ${
                          msg.sender === "customer"
                            ? "bg-[#FAF7F2] border-[#E6DED5] text-[#181512]"
                            : "bg-[#171310] text-white border-[#171310]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-70">
                          <span>{msg.sender === "customer" ? searchedTicket.customerName : "Support Team"}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#E6DED5] space-y-2">
                <AlertCircle className="w-8 h-8 text-[#B74747] mx-auto" />
                <h4 className="text-sm font-bold text-[#181512]">Ticket Not Found</h4>
                <p className="text-xs text-[#6F6861]">No ticket was found matching ID "{ticketSearchInput}". Check your reference number or create a new support ticket.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
