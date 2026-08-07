"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw, ShoppingBag } from "lucide-react";

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 my-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-2 text-center space-y-6">
          <div className="w-16 h-16 bg-[#ffdad6] text-[#93000a] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-[#201a18]">
              Payment Failed
            </h1>
            <p className="text-xs text-[#51443c]">
              We were unable to process your payment via Razorpay. No funds were debited.
            </p>
          </div>

          <div className="bg-[#f8ebe6] p-4 rounded-2xl border border-[#ece0db] text-xs text-[#51443c] space-y-1">
            <p className="font-bold text-[#ba1a1a]">Possible reasons:</p>
            <p>• Insufficient funds or card limit exceeded</p>
            <p>• Transaction timed out or was cancelled</p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>Retry Payment</span>
              </Button>
            </Link>

            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>Return to Catalog</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
