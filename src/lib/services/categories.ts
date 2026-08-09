import { createClient } from "@/lib/supabase/client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "ACTIVE" | "DRAFT" | "INACTIVE";
  sortOrder: number;
  parentId?: string | null;
  productCount?: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Home & Living",
    slug: "home-living",
    description: "Sculptural vessel decor, ceramics, and organic accents.",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop",
    status: "ACTIVE",
    sortOrder: 1,
    productCount: 42,
  },
  {
    id: "cat-2",
    name: "Technology & Gear",
    slug: "technology-gear",
    description: "CNC milled keyboards, audiophile headphones, and gadgets.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
    status: "ACTIVE",
    sortOrder: 2,
    productCount: 28,
  },
  {
    id: "cat-3",
    name: "Textiles & Comfort",
    slug: "textiles-comfort",
    description: "Peruvian alpaca blankets and French flax linen bedding.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=400&auto=format&fit=crop",
    status: "ACTIVE",
    sortOrder: 3,
    productCount: 19,
  },
  {
    id: "cat-4",
    name: "Kitchenware & Coffee",
    slug: "kitchenware-coffee",
    description: "Ceramic pour-overs, handmade bowls, and copper tools.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=400&auto=format&fit=crop",
    status: "ACTIVE",
    sortOrder: 4,
    productCount: 35,
  },
];

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        image: c.image || "",
        status: c.status || "ACTIVE",
        sortOrder: c.sort_order || 0,
        parentId: c.parent_id,
        productCount: 15,
      }));
    }
  } catch (err) {
    // Fallback
  }
  return DEFAULT_CATEGORIES;
}

export async function createCategory(data: Omit<Category, "id">): Promise<Category> {
  const supabase = createClient();
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    ...data,
    productCount: 0,
  };

  try {
    await supabase.from("categories").insert({
      id: newCat.id,
      name: newCat.name,
      slug: newCat.slug,
      description: newCat.description,
      image: newCat.image,
      status: newCat.status,
      sort_order: newCat.sortOrder,
      parent_id: newCat.parentId || null,
    });
  } catch {
    // Fallback
  }

  return newCat;
}
