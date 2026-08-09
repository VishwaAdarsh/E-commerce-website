"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { createSupportTicket } from "@/lib/services/tickets";
import { Mail, Phone, Clock, ArrowRight, CheckCircle2, MessageSquare, Paperclip } from "lucide-react";

export default function ContactSupportPage() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [category, setCategory] = useState("Orders");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast("Please fill in all required fields.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const newTicket = await createSupportTicket({
        customerName: name.trim(),
        customerEmail: email.trim(),
        orderId: orderId.trim(),
        category,
        subject: subject.trim(),
        message: message.trim(),
      });

      setCreatedTicketId(newTicket.id);
      toast(`Support Ticket ${newTicket.id} created successfully!`, "success");
    } catch (err) {
      toast("Failed to submit support ticket. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="text-[#181512] font-bold">Contact Customer Support</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#171310]">
            Submit a Support Request
          </h1>
          <p className="text-xs md:text-sm text-[#6F6861]">
            Our support team reviews queries promptly. Submit details below to receive a ticket reference number.
          </p>
        </div>

        {createdTicketId ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E6DED5] shadow-card text-center space-y-6">
            <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto text-[#347A52] border border-[#E6DED5]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#347A52] bg-[#FAF7F2] px-3 py-1 rounded-md border border-[#E6DED5]">
                SUPPORT TICKET CREATED
              </span>
              <h2 className="text-2xl font-bold text-[#181512]">Thank you! Your request has been logged.</h2>
              <p className="text-xs text-[#6F6861]">
                Your reference ticket ID is: <strong className="font-mono text-[#A56B4F] text-sm">{createdTicketId}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/support/tickets">
                <button className="bg-[#171310] hover:bg-[#A56B4F] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                  Track Ticket Status
                </button>
              </Link>

              <button
                onClick={() => {
                  setCreatedTicketId(null);
                  setMessage("");
                  setSubject("");
                }}
                className="bg-white border border-[#E6DED5] text-[#181512] px-6 py-3 rounded-xl text-xs font-bold uppercase"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#E6DED5] shadow-card space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#181512] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adarsh Sharma"
                  className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#181512] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#181512] block mb-1">Order Number (Optional)</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ORD-9932"
                  className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#181512] block mb-1">Issue Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
                >
                  <option value="Orders">Orders & Shipping</option>
                  <option value="Returns">Returns & Exchanges</option>
                  <option value="Refunds">Refund Inquiry</option>
                  <option value="Payments">Payments & Billing</option>
                  <option value="Product">Product Technical Inquiry</option>
                  <option value="Other">General Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#181512] block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your inquiry"
                className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#181512] block mb-1">Detailed Message *</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your issue or question in detail..."
                className="w-full bg-[#FAF7F2] border border-[#E6DED5] rounded-xl px-4 py-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#A56B4F]"
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#171310] hover:bg-[#A56B4F] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-card"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Request..." : "Submit Support Ticket"}</span>
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
