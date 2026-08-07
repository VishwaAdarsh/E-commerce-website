import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { CartProvider } from "@/features/cart/CartContext";
import { WishlistProvider } from "@/features/wishlist/WishlistContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXE | Earth & Artifact Precision Commerce",
  description: "Curated collection of premium essentials, crafted with meticulous attention to detail and sustainable materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fff8f6] text-[#201a18]">
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
