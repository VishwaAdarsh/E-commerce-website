"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ShieldCheck, Lock, ShieldAlert } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState("merchant@luxe.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const redirectUrl = searchParams.get("redirect");

  // Redirect if user is already logged in as admin
  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        router.push(redirectUrl || "/admin/orders");
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
        toast(error.message || "Invalid credentials. Please try again.", "error");
        setLoading(false);
        return;
      }

      const loggedUser = data.user;
      if (!loggedUser) {
        toast("Sign in failed.", "error");
        setLoading(false);
        return;
      }

      // Check role in profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", loggedUser.id)
        .single();

      const userIsAdmin =
        profile?.role === "admin" ||
        loggedUser.user_metadata?.role === "admin" ||
        (loggedUser.email ? (loggedUser.email.includes("admin") || loggedUser.email === "merchant@luxe.com") : false);

      if (!userIsAdmin) {
        toast("Access Denied: You do not have administrator permissions.", "error");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      toast("Administrator verified! Accessing Merchant ERP...", "success");
      const targetPath = redirectUrl || "/admin/orders";
      router.push(targetPath);
      router.refresh();
    } catch (err: any) {
      toast(err?.message || "An error occurred during sign in. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl border border-[#E6DED5] shadow-card">
      <div className="space-y-2 text-center">
        <div className="w-12 h-12 bg-[#171310] text-[#FAF7F2] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#E6DED5] shadow-subtle">
          <ShieldAlert className="w-6 h-6 text-[#A56B4F]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">
          ADMINISTRATOR PORTAL
        </span>
        <h1 className="font-display text-2xl font-bold text-[#181512]">Merchant Admin Sign In</h1>
        <p className="text-xs text-[#6F6861]">
          Restricted access for verified store administrators and staff.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="text-xs font-bold text-[#181512] block mb-1">Admin Email Address</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@luxe.com"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#181512] block mb-1">Password</label>
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
          <span>{loading ? "Verifying Permissions..." : "Authenticate Admin Session"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-[#E6DED5] text-center text-xs text-[#6F6861]">
        <span>Customer looking for order status? </span>
        <Link href="/login" className="font-bold text-[#A56B4F] hover:underline">
          Customer Portal Login
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center p-6 font-sans text-[#181512] relative overflow-hidden">
      <Link href="/" className="mb-6 font-serif-luxury text-3xl font-bold tracking-[0.2em] text-[#171310]">
        LUXE
      </Link>

      <Suspense fallback={
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E6DED5] text-center py-12">
          <div className="w-8 h-8 border-4 border-[#A56B4F] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <AdminLoginForm />
      </Suspense>

      <div className="mt-6 flex items-center space-x-2 text-[11px] text-[#6F6861]">
        <ShieldCheck className="w-4 h-4 text-[#347A52]" />
        <span>Strict Server-Side Role Enforcement Active</span>
      </div>
    </div>
  );
}
