"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-6 space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#201a18]">
          Elevate Your Everyday With Uncompromising Design.
        </h1>
        <p className="text-sm md:text-base text-[#51443c] leading-relaxed max-w-lg">
          Discover the curated collection of premium essentials, crafted with{" "}
          <strong className="font-semibold text-[#201a18]">
            meticulous attention to detail
          </strong>{" "}
          and sustainable materials.
        </p>
        <div className="flex items-center space-x-4 pt-2">
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              Explore Collection
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View Lookbook
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="md:col-span-6 relative"
      >
        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-level-2 border border-[#ece0db]/60">
          <img
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
            alt="White ceramic vase with eucalyptus on natural wood"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
