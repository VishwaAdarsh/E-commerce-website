"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/lib/services/products";
import { logStockMovement, MOCK_MOVEMENTS, InventoryMovement } from "@/lib/services/inventory";
import { Product } from "@/data/mockData";
import { useToast } from "@/components/ui/Toast";
import { Boxes, Plus, Minus, Search, History, AlertTriangle } from "lucide-react";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>(MOCK_MOVEMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustQty, setAdjustQty] = useState<string>("10");
  const [adjustReason, setAdjustReason] = useState<string>("Supplier Restock Batch");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      const prods = await getProducts();
      setProducts(prods);
    }
    load();
  }, []);

  const handleOpenAdjustModal = (p: Product) => {
    setSelectedProduct(p);
    setAdjustQty("10");
    setAdjustReason("Supplier Restock Batch");
    setIsModalOpen(true);
  };

  const handleAdjustStock = async (e: React.FormEvent, type: "add" | "subtract") => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qty = parseInt(adjustQty, 10) || 0;
    const prev = selectedProduct.stock;
    const next = type === "add" ? prev + qty : Math.max(0, prev - qty);

    // Update product stock
    setProducts((prevList) =>
      prevList.map((p) => (p.id === selectedProduct.id ? { ...p, stock: next } : p))
    );

    // Log stock movement audit trail
    const changeType = type === "add" ? "Stock Added" : "Manual Adjustment";
    const logged = await logStockMovement({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      changeType,
      quantity: qty,
      previousQuantity: prev,
      newQuantity: next,
      reason: adjustReason,
      adminUser: "Merchant Admin",
    });

    setMovements([logged, ...movements]);
    toast(`Stock updated for ${selectedProduct.name}: ${prev} → ${next}`, "success");
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">STOCK AUDIT & LOGISTICS</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Inventory Control</h1>
            <p className="text-xs text-[#6F6861] mt-1">Real-time stock levels, available allocation, and stock movement logs.</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search SKU or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
            />
          </div>
        </div>

        {/* Inventory Stock Table */}
        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-[#E6DED5] font-bold text-sm text-[#181512]">Live Stock Levels</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">PRODUCT</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">CURRENT STOCK</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">QUICK ADJUSTMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#181512]">
                      <div className="flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 rounded-xl object-cover border border-[#E6DED5]" />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-[#6F6861]">{p.sku}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{p.category}</td>
                    <td className="py-4 px-4 font-extrabold text-[#171310]">{p.stock} units</td>
                    <td className="py-4 px-4">
                      <Badge status={p.stock <= 5 ? "LOW STOCK" : p.stock === 0 ? "DRAFT" : "ACTIVE"} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button onClick={() => handleOpenAdjustModal(p)} className="bg-[#FAF7F2] text-[#181512] border border-[#E6DED5] text-xs hover:bg-[#E6DED5]">
                        <span>Adjust Stock</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Movement Audit Log */}
        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-[#A56B4F]" />
              <h3 className="text-base font-bold text-[#181512]">Stock Movement Audit History Log</h3>
            </div>
          </div>

          <div className="space-y-3">
            {movements.map((mov) => (
              <div key={mov.id} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#181512]">{mov.productName}</span>
                    <span className="bg-[#171310] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{mov.changeType}</span>
                  </div>
                  <p className="text-[11px] text-[#6F6861]">Reason: {mov.reason} • By {mov.adminUser}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#181512] block">{mov.previousQuantity} → {mov.newQuantity} units</span>
                  <span className="text-[10px] text-[#6F6861]">{mov.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adjust Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Stock Adjustment — ${selectedProduct?.name}`}>
          <div className="space-y-4">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] text-xs">
              Current Stock: <strong className="text-[#181512] font-bold">{selectedProduct?.stock} units</strong>
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Adjustment Quantity</label>
              <Input type="number" value={adjustQty} onChange={(e) => setAdjustQty(e.target.value)} required />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Reason / Reference Note</label>
              <Input value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)} required />
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
              <Button type="button" variant="outline" onClick={(e) => handleAdjustStock(e, "subtract")} className="border-[#B74747] text-[#B74747]">
                <Minus className="w-4 h-4 mr-1" /> Subtract Stock
              </Button>
              <Button type="button" onClick={(e) => handleAdjustStock(e, "add")} className="bg-[#171310] hover:bg-[#A56B4F] text-white">
                <Plus className="w-4 h-4 mr-1" /> Add Stock
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
