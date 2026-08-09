"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Lock, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState("merchant@luxe.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    if (!isLoading && user) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (isAdmin) {
        router.push("/admin/orders");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, isAdmin, isLoading, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        toast(error.message || "Invalid email or password. Please try again.", "error");
        setLoading(false);
        return;
      }

      toast("Welcome back! Signed in successfully.", "success");

      const userRole =
        data.user?.user_metadata?.role ||
        (data.user?.email?.includes("admin") || data.user?.email === "merchant@luxe.com" ? "admin" : "customer");

      const targetPath = redirectUrl || (userRole === "admin" ? "/admin/orders" : "/dashboard");
      router.push(targetPath);
      router.refresh();
    } catch (err: any) {
      toast(err?.message || "An error occurred during sign in. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-left">
        <Link href="/" className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-[#171310]">
          LUXE
        </Link>
        <h1 className="font-display text-3xl font-bold text-[#181512] pt-4">Welcome back</h1>
        <p className="text-xs text-[#6F6861]">
          Sign in to access your order history, wishlist, and customer portal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="text-xs font-bold text-[#181512] block mb-1">Email Address</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-[#181512]">Password</label>
            <Link href="/forgot-password" className="text-xs font-bold text-[#A56B4F] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[#171310] hover:bg-[#A56B4F] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-subtle"
        >
          <span>{loading ? "Signing in..." : "Sign In"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E6DED5]" /></div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#6F6861] bg-[#FAF7F2] px-2">
          OR
        </div>
      </div>

      <div className="text-center text-xs text-[#6F6861]">
        <span>New to LuxeCommerce? </span>
        <Link href="/register" className="font-bold text-[#A56B4F] hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] grid grid-cols-1 lg:grid-cols-12 font-sans text-[#181512]">
      {/* Left Editorial Image Panel */}
      <div className="hidden lg:block lg:col-span-6 relative bg-[#171310] text-white overflow-hidden p-12 flex flex-col justify-between">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
            alt="LUXE Editorial"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/40 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F] bg-white/10 px-3 py-1 rounded-md">
            MEMBER PORTAL
          </span>
        </div>

        <div className="relative z-10 space-y-3">
          <h2 className="font-display text-4xl font-bold text-white leading-tight">
            Curated Commerce & Timeless Artifacts.
          </h2>
          <p className="text-xs text-[#E6DED5]/80 max-w-md">
            Join thousands of collectors and design enthusiasts across India experiencing seamless digital shopping.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="lg:col-span-6 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <Suspense fallback={
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E6DED5] text-center py-12">
            <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
