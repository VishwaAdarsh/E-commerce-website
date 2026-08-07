"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems((prev) => [...prev, product]);
      toast(`Added "${product.name}" to your wishlist!`, "success");
    } else {
      removeFromWishlist(product.id);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
    toast("Item removed from wishlist.", "info");
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((p) => p.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
