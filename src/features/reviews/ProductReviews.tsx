"use client";

import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Alexander V.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Exceptional build quality and tactile glaze. Feels substantial in hand and retains temperature perfectly.",
    isVerified: true,
    helpfulCount: 14,
  },
  {
    id: "rev-2",
    author: "Elena H.",
    rating: 5,
    date: "1 month ago",
    comment: "Understated elegance. The warm clay tone fits seamlessly into my morning coffee ritual.",
    isVerified: true,
    helpfulCount: 8,
  },
  {
    id: "rev-3",
    author: "David K.",
    rating: 4,
    date: "1 month ago",
    comment: "Very solid construction. The matte finish takes care to wash, but looks incredible on display.",
    isVerified: true,
    helpfulCount: 3,
  },
];

export function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filtered = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-1 space-y-8">
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#ece0db] pb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#201a18]">Customer Reviews</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex text-[#845331]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#845331]" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-[#201a18]">4.9 out of 5</span>
            <span className="text-xs text-[#84746b]">Based on 48 reviews</span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterRating === null
                ? "bg-[#845331] text-white"
                : "bg-[#f8ebe6] text-[#51443c] hover:bg-[#ece0db]"
            }`}
          >
            All Reviews
          </button>
          {[5, 4].map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterRating === star
                  ? "bg-[#845331] text-white"
                  : "bg-[#f8ebe6] text-[#51443c] hover:bg-[#ece0db]"
              }`}
            >
              {star} Stars
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {filtered.map((rev) => (
          <div key={rev.id} className="border-b border-[#f8ebe6] pb-6 last:border-0 last:pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#201a18]">{rev.author}</span>
                {rev.isVerified && (
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#845331] bg-[#f8ebe6] px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified Purchase
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#84746b]">{rev.date}</span>
            </div>

            <div className="flex text-[#845331]">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#845331]" />
              ))}
            </div>

            <p className="text-xs text-[#51443c] leading-relaxed">{rev.comment}</p>

            <div className="pt-1">
              <button
                onClick={() => handleHelpful(rev.id)}
                className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-[#84746b] hover:text-[#845331]"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
