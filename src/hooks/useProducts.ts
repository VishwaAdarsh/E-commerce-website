"use client";

import { useState, useEffect } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/mockData";
import { getProducts, getProductById } from "@/lib/services/products";

export function useProducts(category?: string, query?: string, sortOrder?: string) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await getProducts(category, query);
        let sorted = [...data];
        if (sortOrder === "price-low") {
          sorted.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "price-high") {
          sorted.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "rating") {
          sorted.sort((a, b) => b.rating - a.rating);
        }
        if (isMounted) {
          setProducts(sorted);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch products.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [category, query, sortOrder]);

  return { products, loading, error, setProducts };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const data = await getProductById(id);
      if (isMounted) {
        setProduct(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { product, loading };
}

export function useAdminProductActions(setProductsList: React.Dispatch<React.SetStateAction<Product[]>>) {
  const deleteProduct = (id: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
  };

  const archiveProduct = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "DRAFT" as const } : p))
    );
  };

  const duplicateProduct = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
    };
    setProductsList((prev) => [duplicated, ...prev]);
  };

  return { deleteProduct, archiveProduct, duplicateProduct };
}
