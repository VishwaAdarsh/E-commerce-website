"use client";

import { Modal } from "@/components/ui/Modal";
import { Product } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { Star, ShoppingBag, CheckCircle2 } from "lucide-react";

interface ProductComparisonModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

export function ProductComparisonModal({ products, isOpen, onClose }: ProductComparisonModalProps) {
  const { addToCart } = useCart();

  if (!isOpen || products.length === 0) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Side-by-Side Product Comparison">
      <div className="overflow-x-auto text-xs text-[#181512]">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-[#E6DED5]">
              <th className="py-3 px-4 text-[#6F6861] uppercase tracking-wider font-bold">ATTRIBUTES</th>
              {products.map((p) => (
                <th key={p.id} className="py-3 px-4 text-center">
                  <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover border border-[#E6DED5] mx-auto mb-2" />
                  <h4 className="font-bold text-[#181512] line-clamp-1">{p.name}</h4>
                  <span className="font-extrabold text-[#171310] block pt-1">₹{p.price.toLocaleString()}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6DED5]">
            <tr>
              <td className="py-3 px-4 font-semibold text-[#6F6861]">Category</td>
              {products.map((p) => (
                <td key={p.id} className="py-3 px-4 text-center font-bold">{p.category}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-[#6F6861]">Rating</td>
              {products.map((p) => (
                <td key={p.id} className="py-3 px-4 text-center">
                  <span className="font-bold text-[#D97706] flex items-center justify-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{p.rating} / 5.0</span>
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-[#6F6861]">Material & Craft</td>
              {products.map((p) => (
                <td key={p.id} className="py-3 px-4 text-center">Terracotta Clay / Hand-Finished</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-[#6F6861]">Warranty & Returns</td>
              {products.map((p) => (
                <td key={p.id} className="py-3 px-4 text-center text-[#347A52] font-semibold">30-Day Returns</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-[#6F6861]">Action</td>
              {products.map((p) => (
                <td key={p.id} className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      addToCart(p);
                      onClose();
                    }}
                    className="bg-[#171310] text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#A56B4F]"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
