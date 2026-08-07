import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-3 border border-[#ece0db] shadow-level-1 hover:shadow-level-2 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f8ebe6] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur-md text-[#845331] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#ece0db]">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#faba90] text-[#774827] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-semibold text-[#201a18] flex items-center space-x-1 border border-[#ece0db]">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-[#845331] text-[#845331]" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="px-1 pb-1 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#735949] block mb-1">
            {product.category}
          </span>
          <Link href={`/shop/${product.id}`}>
            <h3 className="text-sm font-bold text-[#201a18] group-hover:text-[#845331] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f8ebe6]">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-extrabold text-[#845331]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#84746b] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Link
            href={`/shop/${product.id}`}
            className="text-xs font-semibold text-[#845331] hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
