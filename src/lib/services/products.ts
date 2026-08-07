import { createClient } from "@/lib/supabase/client";
import { Product, MOCK_PRODUCTS } from "@/data/mockData";

export async function getProducts(category?: string, query?: string): Promise<Product[]> {
  const supabase = createClient();

  try {
    let req = supabase.from("products").select("*");
    if (category && category !== "ALL") {
      req = req.eq("category", category);
    }
    if (query) {
      req = req.ilike("name", `%${query}%`);
    }

    const { data, error } = await req;

    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch (err) {
    console.warn("Using fallback mock products dataset:", err);
  }

  // Fallback to mock data
  return MOCK_PRODUCTS.filter((p) => {
    const matchesCat = !category || category === "ALL" || p.category === category;
    const matchesSearch = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (!error && data) {
      return data as Product;
    }
  } catch (err) {
    console.warn("Using fallback product lookup:", err);
  }

  return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
}

export async function createProduct(productData: Omit<Product, "id">): Promise<Product> {
  const supabase = createClient();
  const newId = `prod-${Date.now()}`;

  const newProduct: Product = {
    id: newId,
    ...productData,
  };

  try {
    await supabase.from("products").insert(newProduct);
  } catch (err) {
    console.warn("Inserted into local product cache");
  }

  return newProduct;
}
