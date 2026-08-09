"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { Search, ChevronDown, HelpCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  const faqs: FAQItem[] = [
    {
      id: "1",
      category: "Orders",
      question: "How can I track the progress of my order?",
      answer: "Log in to your Luxe account and navigate to My Orders under the Customer Dashboard. Every dispatched shipment features a live courier tracking link (AWB).",
    },
    {
      id: "2",
      category: "Orders",
      question: "Can I cancel my order after placing it?",
      answer: "Orders can be cancelled free of charge prior to fulfillment dispatch directly from your My Orders dashboard.",
    },
    {
      id: "3",
      category: "Payments",
      question: "Which payment options are supported on Luxe?",
      answer: "We support Credit/Debit Cards (Visa, MasterCard, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking across major Indian banks, and Razorpay digital wallets.",
    },
    {
      id: "4",
      category: "Shipping",
      question: "How long does standard delivery take?",
      answer: "Orders are processed within 24-48 business hours and delivered within 2–5 business days depending on destination PIN code.",
    },
    {
      id: "5",
      category: "Returns",
      question: "What is the return window for purchased items?",
      answer: "Items are eligible for return within our configured return window calculated from delivery date, provided products remain unused in original packaging.",
    },
    {
      id: "6",
      category: "Refunds",
      question: "When will I receive my refund for a returned item?",
      answer: "Once a returned item passes physical inspection, refunds are processed within 5-7 business days back to your original payment source.",
    },
    {
      id: "7",
      category: "Coupons",
      question: "How do I apply a discount promo code during checkout?",
      answer: "Enter your coupon code inside the Coupon Input box in your Cart Drawer or Checkout Order Summary and click Apply.",
    },
  ];

  const categories = ["All", "Orders", "Payments", "Shipping", "Returns", "Refunds", "Coupons"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            <span className="text-[#181512] font-bold">Frequently Asked Questions</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#171310]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs md:text-sm text-[#6F6861]">
            Find immediate answers to common questions about orders, returns, payments, and delivery.
          </p>
        </div>

        {/* Live Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F6861] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E6DED5] rounded-xl pl-11 pr-4 py-3 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F] shadow-subtle"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? "bg-[#171310] text-white border-[#171310]"
                  : "bg-white text-[#6F6861] border-[#E6DED5] hover:bg-[#FAF7F2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-xs md:text-sm font-bold text-[#181512]">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#6F6861] flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#A56B4F]" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs text-[#6F6861] leading-relaxed border-t border-[#E6DED5]/60 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E6DED5] space-y-2">
              <p className="text-xs font-bold text-[#181512]">No matching questions found.</p>
              <p className="text-[11px] text-[#6F6861]">Try adjusting your search terms or view all categories.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
