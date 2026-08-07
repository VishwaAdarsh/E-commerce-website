"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { newsletterSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError(null);
      setSubscribed(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-[#fef1ec] rounded-3xl p-8 md:p-12 border border-[#faba90]/50 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#735949]">
            JOIN THE CLUB
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#201a18]">
            Exclusive Access, Delivered.
          </h2>
          <p className="text-xs text-[#51443c] leading-relaxed max-w-md">
            Subscribe to receive early access to new collections, curated content, and a 10% welcome discount on your first order.
          </p>
        </div>

        <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-[#ece0db] shadow-level-1 space-y-3">
          {subscribed ? (
            <div className="flex items-center space-x-3 text-[#845331] p-4 bg-[#f8ebe6] rounded-xl font-bold text-xs">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you for subscribing! Check your inbox for your 10% discount code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error || undefined}
              />
              <Button type="submit" className="w-full bg-[#201a18] hover:bg-black text-white">
                <span>Subscribe Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </form>
          )}
          <p className="text-[10px] text-[#84746b] text-center pt-1">
            By subscribing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
