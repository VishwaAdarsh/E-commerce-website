"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { MOCK_ORDERS } from "@/data/mockData";
import { downloadInvoicePdf, generateInvoiceNumber } from "@/lib/utils/invoice";
import { CheckCircle2, Download, ArrowRight, Package, Truck, ShieldCheck } from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = (params.id as string) || "ORD-9932";

  const order = MOCK_ORDERS.find((o) => o.id.includes(orderId)) || MOCK_ORDERS[0];
  const invoiceNo = generateInvoiceNumber(order.id);

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 w-full space-y-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#ece0db] shadow-level-2 text-center space-y-6">
          <div className="w-16 h-16 bg-[#faba90] text-[#774827] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#735949]">
              PAYMENT CONFIRMED
            </span>
            <h1 className="text-3xl font-extrabold text-[#201a18]">
              Thank You For Your Order!
            </h1>
            <p className="text-xs text-[#51443c]">
              Order confirmation and receipt has been sent to{" "}
              <strong className="text-[#201a18]">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Invoice & Order Badges */}
          <div className="grid grid-cols-2 gap-4 bg-[#f8ebe6] p-4 rounded-2xl border border-[#ece0db] text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#84746b] block">Order ID</span>
              <span className="font-extrabold text-[#845331]">{order.id}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#84746b] block">Invoice No.</span>
              <span className="font-extrabold text-[#201a18]">{invoiceNo}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => downloadInvoicePdf(order)}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Download Invoice</span>
            </Button>

            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="bg-white rounded-3xl p-6 border border-[#ece0db] shadow-level-1 space-y-4">
          <h3 className="text-base font-extrabold text-[#201a18] flex items-center space-x-2">
            <Package className="w-4 h-4 text-[#845331]" />
            <span>Order Summary</span>
          </h3>

          <div className="divide-y divide-[#ece0db] text-xs">
            {(order.items.length > 0 ? order.items : [
              { productName: "Luxe Mechanical Keyboard", quantity: 1, price: 240.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=120&auto=format&fit=crop" },
              { productName: "Ergo-X Executive Chair", quantity: 1, price: 1000.00, image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1209?q=80&w=120&auto=format&fit=crop" }
            ]).map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-10 h-10 rounded-xl object-cover border border-[#ece0db] bg-[#f8ebe6]"
                  />
                  <div>
                    <h5 className="font-bold text-[#201a18]">{item.productName}</h5>
                    <p className="text-[10px] text-[#84746b]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-extrabold text-[#201a18]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#ece0db] flex justify-between items-baseline text-xs">
            <span className="font-bold text-[#201a18]">Total Paid</span>
            <span className="text-xl font-extrabold text-[#845331]">${order.amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#ece0db] flex items-center space-x-3 text-xs">
            <Truck className="w-6 h-6 text-[#845331] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-[#201a18]">Estimated Delivery</h4>
              <p className="text-[11px] text-[#84746b]">3-5 Business Days</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#ece0db] flex items-center space-x-3 text-xs">
            <ShieldCheck className="w-6 h-6 text-[#845331] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-[#201a18]">Buyer Protection</h4>
              <p className="text-[11px] text-[#84746b]">Covered by LUXE Guarantee</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
