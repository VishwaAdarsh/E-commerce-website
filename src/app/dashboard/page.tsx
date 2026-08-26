"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Navbar from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { MOCK_ORDERS, MOCK_PRODUCTS, Order, Product } from "@/data/mockData";
import { getCustomerAddresses, saveCustomerAddress, CustomerAddress, MOCK_ADDRESSES } from "@/lib/services/addresses";
import { getReturnRequests, createReturnRequest, ReturnRequest, MOCK_RETURNS } from "@/lib/services/returns";
import { getProductReviews, submitProductReview, ProductReview, MOCK_REVIEWS } from "@/lib/services/reviews";
import { createSupportTicket } from "@/lib/services/tickets";
import { useToast } from "@/components/ui/Toast";
import { 
  ShoppingBag, 
  Truck, 
  Users, 
  Calendar, 
  Download, 
  TrendingUp,
  ShieldCheck,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  Star,
  LifeBuoy,
  Tag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Edit3
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "orders" | "returns" | "addresses" | "wishlist" | "reviews" | "support"
  >("overview");

  // State
  const [addresses, setAddresses] = useState<CustomerAddress[]>(MOCK_ADDRESSES);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(MOCK_RETURNS);
  const [reviews, setReviews] = useState<ProductReview[]>(MOCK_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addrName, setAddrName] = useState("Elena Hayes");
  const [addrPhone, setAddrPhone] = useState("+91 98765 43210");
  const [addrLine1, setAddrLine1] = useState("Suite 402, Luxe Earth Residency");
  const [addrLine2, setAddrLine2] = useState("Bandra West");
  const [addrCity, setAddrCity] = useState("Mumbai");
  const [addrState, setAddrState] = useState("Maharashtra");
  const [addrPin, setAddrPin] = useState("400050");
  const [addrType, setAddrType] = useState<"Home" | "Work" | "Other">("Home");

  // Return Modal State
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState("#ORD-9932");
  const [returnProduct, setReturnProduct] = useState("Aluminum Type K2 Keyboard");
  const [returnReason, setReturnReason] = useState("Damaged / Key switch defect");
  const [returnDesc, setReturnDesc] = useState("");

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revProduct, setRevProduct] = useState("Artisanal Terracotta Vessel");
  const [revProdId, setRevProdId] = useState("prod-1");
  const [revRating, setRevRating] = useState(5);
  const [revTitle, setRevTitle] = useState("");
  const [revText, setRevText] = useState("");

  // Support Ticket Modal State
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");

  const userName = user?.user_metadata?.full_name || (user?.email ? user.email.split("@")[0] : "Valued Customer");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
        <MerchantSidebar />
        <main className="flex-grow p-8 space-y-8 max-w-7xl">
          <div className="flex items-center justify-between border-b border-[#E6DED5] pb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#181512]">Admin Control Center</h1>
              <p className="text-xs text-[#6F6861]">Manage products, orders, coupons, and reports.</p>
            </div>
            <Link href="/admin/orders" className="bg-[#171310] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase">
              Go to Order Management
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Handlers
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr = await saveCustomerAddress({
      userId: user?.id || "demo-cust-id-88",
      fullName: addrName,
      phone: addrPhone,
      addressLine1: addrLine1,
      addressLine2: addrLine2,
      city: addrCity,
      state: addrState,
      postalCode: addrPin,
      country: "India",
      addressType: addrType,
      isDefault: addresses.length === 0,
    });
    setAddresses([...addresses, newAddr]);
    toast("Saved new address to address book!", "success");
    setIsAddressModalOpen(false);
  };

  const handleCreateReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRet = await createReturnRequest({
      orderId: returnOrderId,
      userId: user?.id || "demo-cust-id-88",
      customerName: userName,
      customerEmail: user?.email || "customer@luxe.com",
      productName: returnProduct,
      productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop",
      quantity: 1,
      amount: 189.00,
      reason: returnReason,
      description: returnDesc,
      evidenceImages: [],
    });
    setReturnRequests([newRet, ...returnRequests]);
    toast(`Return request #${newRet.id} submitted for review!`, "success");
    setIsReturnModalOpen(false);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRev = await submitProductReview({
      productId: revProdId,
      productName: revProduct,
      userId: user?.id || "demo-cust-id-88",
      customerName: userName,
      rating: revRating,
      title: revTitle,
      text: revText,
      photos: [],
    });
    setReviews([newRev, ...reviews]);
    toast("Verified review published successfully!", "success");
    setIsReviewModalOpen(false);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSupportTicket({
      customerName: userName,
      customerEmail: user?.email || "customer@luxe.com",
      category: "Order Query",
      subject: ticketSubject,
      message: ticketMsg,
    });
    toast("Customer support ticket submitted!", "success");
    setIsTicketModalOpen(false);
    setTicketSubject("");
    setTicketMsg("");
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" as any } : o))
    );
    toast(`Order ${orderId} cancellation requested!`, "info");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#181512]">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-10 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6DED5] pb-6 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">CUSTOMER SELF-SERVICE HUB</span>
            <h1 className="font-display text-3xl font-bold text-[#181512]">Welcome back, {userName}</h1>
            <p className="text-xs text-[#6F6861] mt-1">Manage orders, returns, saved addresses, verified reviews, and customer support.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Portal Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-2 bg-white p-4 rounded-2xl border border-[#E6DED5] shadow-subtle">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "overview" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <Package className="w-4 h-4 text-[#A56B4F]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "profile" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <User className="w-4 h-4 text-[#A56B4F]" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "orders" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#A56B4F]" />
              <span>My Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("returns")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "returns" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <RefreshCw className="w-4 h-4 text-[#A56B4F]" />
              <span>Returns & Refunds ({returnRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "addresses" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <MapPin className="w-4 h-4 text-[#A56B4F]" />
              <span>Saved Addresses ({addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "wishlist" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <Heart className="w-4 h-4 text-[#A56B4F]" />
              <span>Saved Wishlist</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "reviews" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <Star className="w-4 h-4 text-[#A56B4F]" />
              <span>My Reviews ({reviews.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("support")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "support" ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-[#FAF7F2]"
              }`}
            >
              <LifeBuoy className="w-4 h-4 text-[#A56B4F]" />
              <span>Customer Support</span>
            </button>

            <button
              onClick={() => signOut()}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-[#B74747] hover:bg-[#FAF7F2] transition-colors pt-4 border-t border-[#E6DED5]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </aside>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                    <span className="text-xs text-[#6F6861] font-semibold">Total Orders</span>
                    <p className="text-3xl font-extrabold text-[#181512]">{orders.length}</p>
                    <p className="text-[11px] text-[#347A52] font-bold">1 order in transit</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                    <span className="text-xs text-[#6F6861] font-semibold">Saved Addresses</span>
                    <p className="text-3xl font-extrabold text-[#181512]">{addresses.length}</p>
                    <button onClick={() => setActiveTab("addresses")} className="text-[11px] text-[#A56B4F] font-bold hover:underline">Manage book →</button>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-2">
                    <span className="text-xs text-[#6F6861] font-semibold">Membership Privilege</span>
                    <p className="text-3xl font-extrabold text-[#A56B4F]">Gold Tier</p>
                    <p className="text-[11px] text-[#6F6861]">Free Express Shipping Active</p>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                    <h3 className="text-base font-bold text-[#181512]">Recent Orders</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-[#A56B4F] hover:underline">View All</button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-4 rounded-xl border border-[#E6DED5] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#181512]">{order.id}</span>
                            <Badge status={order.status} />
                          </div>
                          <p className="text-[#6F6861]">{order.date}</p>
                        </div>
                        <span className="font-extrabold text-[#171310] text-sm">₹{order.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MY PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-6">
                <h3 className="text-lg font-bold text-[#181512] border-b border-[#E6DED5] pb-3">My Account Profile</h3>
                <form className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-[#6F6861] block mb-1">Full Name</label>
                    <Input defaultValue={userName} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6F6861] block mb-1">Email Address</label>
                    <Input defaultValue={user?.email || "customer@luxe.com"} disabled />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6F6861] block mb-1">Phone Number</label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <Button type="button" onClick={() => toast("Profile updated!", "success")} className="bg-[#171310] text-white text-xs">
                    Save Profile Changes
                  </Button>
                </form>
              </div>
            )}

            {/* MY ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                  <h3 className="text-lg font-bold text-[#181512]">Order History & Tracking</h3>
                  <Link href="/shop" className="text-xs font-bold text-[#A56B4F] hover:underline">+ New Order</Link>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-5 rounded-2xl border border-[#E6DED5] bg-[#FAF7F2] space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-sm text-[#181512]">{order.id}</span>
                          <span className="text-[11px] text-[#6F6861] block">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge status={order.status} />
                          <span className="font-extrabold text-[#171310] text-base">₹{order.amount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="pt-2 divide-y divide-[#E6DED5]">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-xl object-cover border border-[#E6DED5]" />
                              <div>
                                <h5 className="font-bold text-[#181512]">{item.productName}</h5>
                                <p className="text-[10px] text-[#6F6861]">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-extrabold text-[#181512]">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-[#E6DED5] flex flex-wrap items-center justify-end gap-3">
                        {order.status !== "Cancelled" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-xs font-bold text-[#B74747] hover:underline"
                          >
                            Cancel Order
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setReturnOrderId(order.id);
                            setIsReturnModalOpen(true);
                          }}
                          className="text-xs font-bold text-[#A56B4F] hover:underline"
                        >
                          Request Return
                        </button>
                        <button
                          onClick={() => setIsReviewModalOpen(true)}
                          className="bg-[#171310] hover:bg-[#A56B4F] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold"
                        >
                          Write Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RETURNS & REFUNDS TAB */}
            {activeTab === "returns" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#181512]">Returns & Refund Tracking</h3>
                    <p className="text-xs text-[#6F6861]">Track return status and refund processing.</p>
                  </div>
                  <Button onClick={() => setIsReturnModalOpen(true)} className="bg-[#171310] text-white text-xs">
                    + New Return Request
                  </Button>
                </div>

                <div className="space-y-4">
                  {returnRequests.map((ret) => (
                    <div key={ret.id} className="p-5 rounded-2xl border border-[#E6DED5] bg-[#FAF7F2] space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-[#A56B4F] font-mono text-sm">{ret.id}</span>
                          <span className="text-[11px] text-[#6F6861] block">Order: {ret.orderId} • Submitted: {ret.createdAt}</span>
                        </div>
                        <Badge status={ret.status} />
                      </div>

                      <div className="flex items-center space-x-3 pt-2">
                        <img src={ret.productImage} alt={ret.productName} className="w-10 h-10 rounded-xl object-cover border border-[#E6DED5]" />
                        <div>
                          <h5 className="font-bold text-[#181512]">{ret.productName}</h5>
                          <p className="text-[11px] text-[#6F6861]">Reason: {ret.reason}</p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="p-3 bg-white rounded-xl border border-[#E6DED5] flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#347A52]">Timeline Stage: {ret.status}</span>
                        <span className="font-extrabold text-[#171310]">Refund Amount: ₹{ret.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#181512]">Saved Shipping Addresses</h3>
                    <p className="text-xs text-[#6F6861]">Manage saved delivery addresses for fast checkout.</p>
                  </div>
                  <Button onClick={() => setIsAddressModalOpen(true)} className="bg-[#171310] text-white text-xs">
                    + Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2 text-xs relative">
                      {addr.isDefault && (
                        <span className="bg-[#A56B4F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full absolute top-3 right-3">
                          DEFAULT
                        </span>
                      )}
                      <div className="flex items-center space-x-2 font-bold text-[#181512]">
                        <MapPin className="w-4 h-4 text-[#A56B4F]" />
                        <span>{addr.fullName} ({addr.addressType})</span>
                      </div>
                      <p className="text-[#6F6861]">{addr.addressLine1}, {addr.addressLine2}</p>
                      <p className="text-[#6F6861]">{addr.city}, {addr.state} - {addr.postalCode}</p>
                      <p className="text-[#6F6861]">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <h3 className="text-lg font-bold text-[#181512] border-b border-[#E6DED5] pb-3">Saved Wishlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_PRODUCTS.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] flex items-center space-x-3 text-xs">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-[#E6DED5]" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-[#181512]">{p.name}</h4>
                        <span className="font-extrabold text-[#171310] block">₹{p.price.toLocaleString()}</span>
                      </div>
                      <Button onClick={() => toast(`Added ${p.name} to cart!`, "success")} className="bg-[#171310] text-white text-[11px]">
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                  <h3 className="text-lg font-bold text-[#181512]">My Verified Reviews</h3>
                  <Button onClick={() => setIsReviewModalOpen(true)} className="bg-[#171310] text-white text-xs">
                    + Write Product Review
                  </Button>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#181512]">{rev.productName}</span>
                        <div className="flex text-[#D97706]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-bold text-[#171310]">{rev.title}</h4>
                      <p className="text-[#6F6861]">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUPPORT TAB */}
            {activeTab === "support" && (
              <div className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DED5] pb-3">
                  <h3 className="text-lg font-bold text-[#181512]">Customer Support Hub</h3>
                  <Button onClick={() => setIsTicketModalOpen(true)} className="bg-[#171310] text-white text-xs">
                    + Open Support Ticket
                  </Button>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#A56B4F]">Ticket #SUP-1092</span>
                    <Badge status="Open" />
                  </div>
                  <h4 className="font-bold text-[#181512]">Inquiry regarding custom leather strap sizing for Titanium Field Watch</h4>
                  <p className="text-[#6F6861]">Hi, I ordered the Titanium Field Watch. Can I get an extra leather strap in dark tan?</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Address Modal */}
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title="Add Saved Shipping Address">
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Full Name</label>
            <Input value={addrName} onChange={(e) => setAddrName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Phone Number</label>
            <Input value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Address Line 1</label>
            <Input value={addrLine1} onChange={(e) => setAddrLine1(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">City</label>
              <Input value={addrCity} onChange={(e) => setAddrCity(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">PIN Code</label>
              <Input value={addrPin} onChange={(e) => setAddrPin(e.target.value)} required />
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
            <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-[#171310] text-white">Save Address</Button>
          </div>
        </form>
      </Modal>

      {/* Return Request Modal */}
      <Modal isOpen={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)} title="Initiate Item Return Request">
        <form onSubmit={handleCreateReturn} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Select Order ID</label>
            <select value={returnOrderId} onChange={(e) => setReturnOrderId(e.target.value)} className="w-full bg-white border border-[#E6DED5] rounded-xl px-3 py-2 text-xs">
              {orders.map((o) => (
                <option key={o.id} value={o.id}>{o.id} — ₹{o.amount.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Return Reason</label>
            <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} className="w-full bg-white border border-[#E6DED5] rounded-xl px-3 py-2 text-xs">
              <option value="Damaged / Key switch defect">Damaged or Defective Item</option>
              <option value="Wrong Item Received">Wrong Item Received</option>
              <option value="Wrong Size or Variant">Wrong Size / Variant</option>
              <option value="Changed Mind">Changed Mind</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Issue Description</label>
            <Input value={returnDesc} onChange={(e) => setReturnDesc(e.target.value)} placeholder="Explain defect or reason..." required />
          </div>
          <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
            <Button type="button" variant="outline" onClick={() => setIsReturnModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-[#171310] text-white">Submit Return Request</Button>
          </div>
        </form>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Write Verified Product Review">
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Star Rating (1-5)</label>
            <select value={revRating} onChange={(e) => setRevRating(parseInt(e.target.value, 10))} className="w-full bg-white border border-[#E6DED5] rounded-xl px-3 py-2 text-xs font-bold">
              <option value={5}>★★★★★ (5 Stars - Excellent)</option>
              <option value={4}>★★★★☆ (4 Stars - Good)</option>
              <option value={3}>★★★☆☆ (3 Stars - Average)</option>
              <option value={2}>★★☆☆☆ (2 Stars - Poor)</option>
              <option value={1}>★☆☆☆☆ (1 Star - Terrible)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Review Headline Title</label>
            <Input value={revTitle} onChange={(e) => setRevTitle(e.target.value)} placeholder="Exquisite Craftsmanship!" required />
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Detailed Feedback</label>
            <Input value={revText} onChange={(e) => setRevText(e.target.value)} placeholder="Describe product quality, texture..." required />
          </div>
          <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
            <Button type="button" variant="outline" onClick={() => setIsReviewModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-[#171310] text-white">Publish Review</Button>
          </div>
        </form>
      </Modal>

      {/* Ticket Modal */}
      <Modal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} title="Open Customer Support Ticket">
        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Subject</label>
            <Input value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Inquiry regarding order shipment..." required />
          </div>
          <div>
            <label className="text-xs font-bold text-[#6F6861] block mb-1">Message Detail</label>
            <Input value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)} placeholder="Describe how we can help..." required />
          </div>
          <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
            <Button type="button" variant="outline" onClick={() => setIsTicketModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-[#171310] text-white">Submit Ticket</Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
