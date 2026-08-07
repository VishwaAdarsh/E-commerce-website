"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email);
      setSubmitted(true);
      toast("Password reset instructions sent to your email.", "success");
    } catch (err: any) {
      toast(err.message || "Failed to send reset email.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col justify-center items-center p-6 font-sans text-[#201a18] relative overflow-hidden">
      {/* Decorative Warm Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#faba90]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#845331]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="mb-8 text-3xl font-extrabold tracking-tight text-[#201a18] hover:text-[#845331] transition-colors">
        LUXE
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#ece0db] shadow-level-2 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#f8ebe6] text-[#845331] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#ece0db]">
            <KeyRound className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#201a18]">Reset Password</h1>
          <p className="text-xs text-[#51443c]">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#f8ebe6] p-4 rounded-2xl border border-[#faba90] text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#845331] mx-auto" />
            <p className="text-xs text-[#774827] font-semibold">
              Check your inbox! We've sent password reset instructions to <strong>{email}</strong>.
            </p>
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
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

            <Button disabled={loading} type="submit" variant="secondary" size="lg" className="w-full py-3.5 mt-2">
              <span>{loading ? "Sending Link..." : "Send Reset Link"}</span>
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-[#ece0db] text-center text-xs">
          <Link href="/login" className="inline-flex items-center font-bold text-[#845331] hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
