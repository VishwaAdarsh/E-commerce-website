"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { newsletterSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";

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
    <section className="max-w-7xl mx-auto px-6 md:px-12 my-20">
      <div className="bg-[#201a18] text-white rounded-[40px] p-10 md:p-20 relative overflow-hidden shadow-level-3 border border-[#362b27]">
        {/* Background Subtle Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#845331]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#faba90]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#faba90] border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#faba90]" />
            <span>THE PRIVÉ CIRCLE</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif-luxury text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
              Exclusive Releases & Private Previews
            </h2>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal tracking-wide max-w-lg mx-auto">
              Be the first to receive invitations to private artifact launches, bespoke editorial journals, and a 10% welcome privilege on your first acquisition.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center justify-center space-x-3 text-[#faba90] p-6 bg-white/5 border border-[#faba90]/30 rounded-2xl font-bold text-xs">
              <CheckCircle2 className="w-5 h-5 text-[#faba90]" />
              <span>Privilege code dispatched. Welcome to the LUXE Privé Circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#faba90] rounded-2xl pl-12 pr-4 py-4 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#845331] hover:bg-[#73482a] text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-level-2 flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="text-[11px] font-bold text-[#faba90] text-center">{error}</p>
              )}
            </form>
          )}

          <p className="text-[10px] text-white/40 tracking-wider">
            We honor your privacy. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
