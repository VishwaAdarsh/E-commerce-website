"use client";

import { motion } from "framer-motion";

export function CuratedEssentials() {
  return (
    <section className="max-w-7xl mx-auto px-6 space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#201a18]">
          Curated Essentials
        </h2>
        <p className="text-xs text-[#51443c] mt-1">
          Shop by our signature collections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Big Card (Left): The Minimalist Home */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-7 relative h-[380px] rounded-3xl overflow-hidden group shadow-level-1 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop"
            alt="The Minimalist Home"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 mb-1">
              LIVING SPACE
            </span>
            <h3 className="text-xl font-bold">The Minimalist Home</h3>
          </div>
        </motion.div>

        {/* Stacked Cards (Right) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Wellness Routine */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative h-[177px] rounded-3xl overflow-hidden group shadow-level-1 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
              alt="Wellness Routine"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 mb-1">
                SELF CARE
              </span>
              <h3 className="text-lg font-bold">Wellness Routine</h3>
            </div>
          </motion.div>

          {/* Everyday Carry */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative h-[177px] rounded-3xl overflow-hidden group shadow-level-1 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"
              alt="Everyday Carry"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 mb-1">
                ACCESSORIES
              </span>
              <h3 className="text-lg font-bold">Everyday Carry</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
