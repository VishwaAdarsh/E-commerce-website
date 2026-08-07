"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";

export default function AdminIndexPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login?redirect=/admin");
      } else if (!isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/admin/orders");
      }
    }
  }, [user, isAdmin, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#fff8f6] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#845331] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
