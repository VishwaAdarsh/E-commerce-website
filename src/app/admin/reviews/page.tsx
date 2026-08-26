"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProductReviews, updateReviewStatus, ProductReview, MOCK_REVIEWS } from "@/lib/services/reviews";
import { useToast } from "@/components/ui/Toast";
import { Star, Search, CheckCircle2, XCircle, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ProductReview[]>(MOCK_REVIEWS);
  const [filterTab, setFilterTab] = useState<"All" | "Pending" | "Published" | "Reported" | "Rejected">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getProductReviews();
      setReviews(data);
    }
    load();
  }, []);

  const handleStatusUpdate = async (reviewId: string, status: ProductReview["status"]) => {
    await updateReviewStatus(reviewId, status);
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, status } : r)));
    toast(`Review status updated to ${status}`, "success");
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesTab = filterTab === "All" || r.status === filterTab;
    const matchesQuery =
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(1, reviews.length)).toFixed(1);

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">REVIEW MODERATION ERP</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Customer Reviews Queue</h1>
            <p className="text-xs text-[#6F6861] mt-1">Moderate verified purchaser product reviews, ratings, and feedback.</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product or reviewer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F6861]">TOTAL REVIEWS</span>
            <p className="text-2xl font-extrabold text-[#181512]">{reviews.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">AVERAGE STORE RATING</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-[#D97706]">{avgRating}</span>
              <Star className="w-5 h-5 fill-current text-[#D97706]" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#347A52]">PUBLISHED REVIEWS</span>
            <p className="text-2xl font-extrabold text-[#347A52]">{reviews.filter((r) => r.status === "Published").length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A56B4F]">PENDING MODERATION</span>
            <p className="text-2xl font-extrabold text-[#A56B4F]">{reviews.filter((r) => r.status === "Pending").length}</p>
          </div>
        </div>

        {/* Queue Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#E6DED5] pb-2 text-xs font-bold">
          {(["All", "Pending", "Published", "Reported", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                filterTab === tab ? "bg-[#171310] text-white" : "text-[#6F6861] hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reviews Queue List */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-[#E6DED5] shadow-subtle space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E6DED5] pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#181512] text-sm">{rev.productName}</span>
                    {rev.isVerifiedPurchaser && (
                      <span className="bg-[#347A52]/10 text-[#347A52] text-[9px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Purchaser</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6F6861]">By: {rev.customerName} • {rev.createdAt}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex text-[#D97706]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge status={rev.status} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#171310] text-xs mb-1">{rev.title}</h4>
                <p className="text-xs text-[#6F6861] leading-relaxed">{rev.text}</p>
              </div>

              {/* Moderation Controls */}
              <div className="pt-3 border-t border-[#E6DED5] flex items-center justify-end space-x-3">
                {rev.status !== "Published" && (
                  <Button onClick={() => handleStatusUpdate(rev.id, "Published")} className="bg-[#347A52] text-white text-xs py-1.5">
                    Approve & Publish
                  </Button>
                )}
                {rev.status !== "Rejected" && (
                  <Button onClick={() => handleStatusUpdate(rev.id, "Rejected")} variant="outline" className="text-xs text-[#B74747] py-1.5">
                    Reject Review
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
