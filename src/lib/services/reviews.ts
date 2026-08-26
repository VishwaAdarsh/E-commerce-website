import { createClient } from "@/lib/supabase/client";

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  customerName: string;
  rating: number; // 1-5
  title: string;
  text: string;
  photos: string[];
  isVerifiedPurchaser: boolean;
  status: "Pending" | "Published" | "Reported" | "Rejected";
  createdAt: string;
}

export const MOCK_REVIEWS: ProductReview[] = [
  {
    id: "rev-201",
    productId: "prod-1",
    productName: "Artisanal Terracotta Vessel",
    userId: "demo-cust-id-88",
    customerName: "Elena Hayes",
    rating: 5,
    title: "Exquisite Craftsmanship & Warm Texture",
    text: "The matte terracotta texture brings a modern architectural feel to our living space. Exceeded expectations!",
    photos: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop"],
    isVerifiedPurchaser: true,
    status: "Published",
    createdAt: "2026-08-05",
  },
  {
    id: "rev-202",
    productId: "prod-2",
    productName: "Aluminum Type K2 Keyboard",
    userId: "demo-cust-id-88",
    customerName: "Marcus Johnson",
    rating: 5,
    title: "Unmatched CNC Weight & Tactile Acoustics",
    text: "The aluminum weight keeps it grounded on desk. Hot-swappable switches make customization effortless.",
    photos: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop"],
    isVerifiedPurchaser: true,
    status: "Published",
    createdAt: "2026-08-06",
  },
];

export async function getProductReviews(productId?: string): Promise<ProductReview[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("reviews").select("*");
    if (productId) {
      query = query.eq("product_id", productId);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as any;
    }
  } catch {
    // Fallback
  }
  return productId ? MOCK_REVIEWS.filter((r) => r.productId === productId && r.status === "Published") : MOCK_REVIEWS;
}

export async function submitProductReview(reviewData: Omit<ProductReview, "id" | "createdAt" | "status" | "isVerifiedPurchaser">): Promise<ProductReview> {
  const supabase = createClient();
  const newRev: ProductReview = {
    id: `rev-${Date.now()}`,
    ...reviewData,
    isVerifiedPurchaser: true,
    status: "Published",
    createdAt: new Date().toISOString().split("T")[0],
  };

  try {
    await supabase.from("reviews").insert({
      id: newRev.id,
      product_id: newRev.productId,
      user_id: newRev.userId,
      rating: newRev.rating,
      title: newRev.title,
      text: newRev.text,
      status: newRev.status,
    });
  } catch {
    // Fallback
  }

  MOCK_REVIEWS.unshift(newRev);
  return newRev;
}

export async function updateReviewStatus(reviewId: string, status: ProductReview["status"]): Promise<boolean> {
  const rev = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (rev) {
    rev.status = status;
    return true;
  }
  return false;
}
