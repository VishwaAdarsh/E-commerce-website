import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { HeroBanner } from "@/features/storefront/HeroBanner";
import { CuratedEssentials } from "@/features/storefront/CuratedEssentials";
import { NewsletterSection } from "@/features/storefront/NewsletterSection";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col font-sans text-[#201a18]">
      <Navbar />

      <main className="flex-grow space-y-24 pt-8 pb-16">
        {/* Feature Component 1: Hero Banner */}
        <HeroBanner />

        {/* Feature Component 2: Curated Essentials Bento Grid */}
        <CuratedEssentials />

        {/* Trending Now Grid */}
        <section className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#201a18]">
              Trending Now
            </h2>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#845331] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Feature Component 3: Newsletter Subscription */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
