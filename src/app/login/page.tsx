"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState("merchant@luxe.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const redirectUrl = searchParams.get("redirect");

  // Redirect if user is already logged in
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
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-2 space-y-6 relative z-10">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#f8ebe6] text-[#845331] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#ece0db]">
          <Lock className="w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#201a18]">Sign In to LUXE</h1>
        <p className="text-xs text-[#51443c]">
          Access your customer dashboard, order history, and merchant controls.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#51443c] block mb-1">Email Address</label>
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
            <label className="text-xs font-bold text-[#51443c]">Password</label>
            <Link href="/forgot-password" className="text-xs font-bold text-[#845331] hover:underline">
              Forgot?
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

        <Button disabled={loading} type="submit" variant="secondary" size="lg" className="w-full py-3.5 mt-2">
          <span>{loading ? "Signing in..." : "Sign In"}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="pt-4 border-t border-[#ece0db] text-center text-xs text-[#51443c]">
        <span>Don't have an account? </span>
        <Link href="/register" className="font-bold text-[#845331] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col justify-center items-center p-6 font-sans text-[#201a18] relative overflow-hidden">
      {/* Decorative Warm Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#faba90]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#845331]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="mb-8 text-3xl font-extrabold tracking-tight text-[#201a18] hover:text-[#845331] transition-colors">
        LUXE
      </Link>

      <Suspense fallback={
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-2 text-center py-12">
          <div className="w-8 h-8 border-4 border-[#845331] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <LoginForm />
      </Suspense>

      <div className="mt-8 flex items-center space-x-2 text-[11px] text-[#84746b]">
        <ShieldCheck className="w-4 h-4 text-[#845331]" />
        <span>Protected by Supabase Enterprise Security</span>
      </div>
    </div>
  );
}
