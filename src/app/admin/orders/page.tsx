"use client";

import { useState } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { MOCK_ORDERS, Order } from "@/data/mockData";
import { createShiprocketShipment, ShipmentDetails } from "@/lib/services/shiprocket";
import { initiateRazorpayRefund, restoreInventoryForOrder } from "@/lib/services/refunds";
import { useToast } from "@/components/ui/Toast";
import { Search, Bell, SlidersHorizontal, Truck, ExternalLink, RefreshCw } from "lucide-react";

export default function AdminOrdersPage() {
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState<Order>(MOCK_ORDERS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const { toast } = useToast();

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesTab =
      selectedTab === "All Orders" || order.status === selectedTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
    setShipment(null);
  };

  const handleFulfillOrder = async () => {
    setIsFulfilling(true);
    toast("Creating Shiprocket shipment & generating AWB...", "info");

    try {
      const details = await createShiprocketShipment(selectedOrder.id);
      setShipment(details);
      setSelectedOrder({ ...selectedOrder, status: "Shipped" });
      toast(`Shipment created! AWB: ${details.awbCode}`, "success");
    } catch (err) {
      toast("Shipment creation failed.", "error");
    } finally {
      setIsFulfilling(false);
    }
  };

  const handleCancelAndRefund = async () => {
    toast("Initiating Razorpay refund & restoring stock...", "info");
    await initiateRazorpayRefund({
      orderId: selectedOrder.id,
      amount: selectedOrder.amount,
      reason: "Merchant cancellation",
    });
    await restoreInventoryForOrder(selectedOrder.id);
    setSelectedOrder({ ...selectedOrder, status: "Delivered" });
    toast(`Refund processed for ${selectedOrder.id}`, "success");
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-6 max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">MERCHANT ERP</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">
              Order Management
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
              />
            </div>

            <button className="relative p-2 text-[#181512] hover:text-[#A56B4F] bg-white border border-[#E6DED5] rounded-xl shadow-subtle">
              <Bell className="w-4 h-4 stroke-[2]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B74747] rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Order Tabs Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-[#E6DED5]">
            {["All Orders", "Pending", "Processing", "Shipped"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === tab
                    ? "bg-[#171310] text-white shadow-sm"
                    : "text-[#6F6861] hover:text-[#181512]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-2 bg-white border border-[#E6DED5] px-4 py-2 rounded-xl text-xs font-semibold text-[#181512] hover:bg-[#FAF7F2] transition-colors shadow-subtle">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A56B4F]" />
            <span>Filters</span>
          </button>
        </div>

        {/* Main Orders Table */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6DED5] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#181512]">
              Recent Orders ({filteredOrders.length})
            </h3>
            <button className="text-xs font-bold text-[#A56B4F] hover:underline">
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4 rounded-l-xl">ORDER ID</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder.id === order.id;
                  return (
                    <tr
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-[#FAF7F2] font-bold" : "hover:bg-[#FAF7F2]/60"
                      }`}
                    >
                      <td className={`py-4 px-4 font-bold ${isSelected ? 'text-[#A56B4F]' : 'text-[#181512]'}`}>
                        {order.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full bg-[#F2ECE4] text-[#A56B4F] flex items-center justify-center font-bold text-[10px]">
                            {order.avatarInitials}
                          </div>
                          <span className="font-semibold text-[#181512]">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#6F6861]">{order.date}</td>
                      <td className="py-4 px-4">
                        <Badge status={order.status} />
                      </td>
                      <td className="py-4 px-4 text-right font-extrabold text-[#171310]">
                        ₹{order.amount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide-over Drawer for Order Detail */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={`Order ${selectedOrder.id}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DED5]">
              <div>
                <p className="text-[11px] text-[#6F6861]">
                  Placed on {selectedOrder.date}
                </p>
              </div>
              <Badge status={selectedOrder.status} />
            </div>

            {/* Shiprocket AWB Badge */}
            {shipment && (
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#A56B4F] space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#A56B4F]">
                  <span>Shiprocket Logistics</span>
                  <a
                    href={shipment.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-[#A56B4F] hover:underline"
                  >
                    <span>Track AWB</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
                <p className="text-[#6F6861]">AWB: <strong className="font-mono text-[#181512]">{shipment.awbCode}</strong></p>
                <p className="text-[#6F6861]">Courier: {shipment.courierName}</p>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F] block">
                CUSTOMER DETAILS
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#F2ECE4] text-[#A56B4F] flex items-center justify-center font-bold text-xs">
                  {selectedOrder.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181512]">{selectedOrder.customerName}</h4>
                  <p className="text-[11px] text-[#6F6861]">{selectedOrder.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F] block">
                ITEMS ({selectedOrder.items?.length || 1})
              </span>
              <div className="space-y-3">
                {(selectedOrder.items?.length > 0 ? selectedOrder.items : [
                  { productName: "Artisanal Terracotta Vessel", quantity: 1, price: 1800, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=120&auto=format&fit=crop" },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-10 h-10 rounded-xl object-cover border border-[#E6DED5] bg-[#FAF7F2] flex-shrink-0"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-[#181512]">{item.productName}</h5>
                        <p className="text-[10px] text-[#6F6861]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#171310]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown Box */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 space-y-2 text-xs border border-[#E6DED5]">
              <div className="flex justify-between text-[#6F6861]">
                <span>Subtotal</span>
                <span className="font-bold text-[#181512]">₹{selectedOrder.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6F6861]">
                <span>Shipping (Express)</span>
                <span className="font-bold text-[#347A52]">FREE</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={handleFulfillOrder}
                disabled={isFulfilling}
                variant="primary"
                className="w-full py-3 text-xs bg-[#171310] hover:bg-[#A56B4F] text-white"
              >
                <Truck className="w-4 h-4 mr-2" />
                <span>{isFulfilling ? "Generating AWB..." : "Fulfill via Shiprocket"}</span>
              </Button>

              <Button
                onClick={handleCancelAndRefund}
                variant="danger"
                className="w-full py-2.5 text-xs bg-[#B74747] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>Cancel & Refund via Razorpay</span>
              </Button>
            </div>
          </div>
        </Drawer>
      </main>
    </div>
  );
}
