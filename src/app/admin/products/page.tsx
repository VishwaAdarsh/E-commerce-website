"use client";

import { useState } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MOCK_PRODUCTS, Product } from "@/data/mockData";
import { useAdminProductActions } from "@/hooks/useProducts";
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Copy,
  Archive,
  Trash2,
  Edit3
} from "lucide-react";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { deleteProduct, archiveProduct, duplicateProduct } = useAdminProductActions(setProductsList);

  // Form state
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("KITCHENWARE");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const filteredProducts = productsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "ALL" || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName("");
    setSku("");
    setCategory("KITCHENWARE");
    setPrice("");
    setStock("");
    setImageUrl("");
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSku(product.sku);
    setCategory(product.category);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setImageUrl(product.image);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !price) return;

    if (editingProduct) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name,
                sku,
                category,
                price: parseFloat(price),
                stock: parseInt(stock, 10) || 0,
                image: imageUrl || p.image,
              }
            : p
        )
      );
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name,
        sku,
        category,
        price: parseFloat(price) || 99.0,
        stock: parseInt(stock, 10) || 50,
        status: "ACTIVE",
        rating: 5.0,
        isNew: true,
        image: imageUrl || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
        description: "Artisanal catalog release crafted with sustainable materials."
      };
      setProductsList([newProd, ...productsList]);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#fff8f6] font-sans text-[#201a18]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        {/* Header & Main Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#201a18]">
              Product Inventory
            </h1>
            <p className="text-xs text-[#51443c] mt-1">
              Manage your store's high-end catalog, stock, and variations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#84746b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SKU or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#d6c3b8] rounded-xl pl-10 pr-4 py-2 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-[#d6c3b8] px-3 py-2 rounded-xl text-xs font-semibold text-[#51443c] focus:outline-none focus:border-[#845331]"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="LOW STOCK">LOW STOCK</option>
              <option value="DRAFT">DRAFT</option>
            </select>

            {/* Add Product Button */}
            <Button
              onClick={handleOpenAddModal}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </div>
        </div>

        {/* Inventory Data Table Card */}
        <div className="bg-white rounded-2xl border border-[#ece0db] shadow-level-1 overflow-hidden flex flex-col justify-between min-h-[480px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8ebe6] text-[10px] font-bold uppercase tracking-wider text-[#51443c] border-b border-[#ece0db]">
                  <th className="py-3 px-4 w-10">
                    <input type="checkbox" className="rounded border-[#d6c3b8] text-[#845331] focus:ring-[#845331]" />
                  </th>
                  <th className="py-3 px-4">PRODUCT</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">PRICE</th>
                  <th className="py-3 px-4">STOCK</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece0db] text-xs">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#fff8f6] transition-colors">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded border-[#d6c3b8] text-[#845331] focus:ring-[#845331]" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#ece0db] bg-[#f8ebe6] flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-[#201a18]">{product.name}</h4>
                          <p className="text-[10px] text-[#84746b]">Standard Finish</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-[#51443c]">{product.sku}</td>
                    <td className="py-4 px-4 text-[#51443c] font-medium">{product.category}</td>
                    <td className="py-4 px-4 font-extrabold text-[#201a18]">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className={`py-4 px-4 font-bold ${product.stock < 15 ? 'text-[#93000a]' : 'text-[#201a18]'}`}>
                      {product.stock}
                    </td>
                    <td className="py-4 px-4">
                      <Badge status={product.status} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          title="Edit Product"
                          className="p-1 text-[#84746b] hover:text-[#845331] transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateProduct(product)}
                          title="Duplicate Product"
                          className="p-1 text-[#84746b] hover:text-[#845331] transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => archiveProduct(product.id)}
                          title="Archive Product"
                          className="p-1 text-[#84746b] hover:text-[#735949] transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          title="Delete Product"
                          className="p-1 text-[#84746b] hover:text-[#ba1a1a] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="p-4 bg-[#fff8f6] border-t border-[#ece0db] flex items-center justify-between text-xs text-[#51443c]">
            <span>Showing 1 to {filteredProducts.length} of 248 products</span>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-[#84746b] hover:text-[#201a18] disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 text-[#84746b] hover:text-[#201a18]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Add / Edit Product Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title={editingProduct ? "Edit Catalog Product" : "Add New Catalog Product"}
        >
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#51443c] block mb-1">Product Title</label>
              <Input
                placeholder="e.g. Artisanal Terra Cotta Pitcher"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#51443c] block mb-1">SKU Code</label>
                <Input
                  placeholder="e.g. KT-TER-09"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#51443c] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[#d6c3b8] rounded-xl px-4 py-2.5 text-xs text-[#201a18] focus:outline-none focus:border-[#845331]"
                >
                  <option value="KITCHENWARE">KITCHENWARE</option>
                  <option value="TECHNOLOGY">TECHNOLOGY</option>
                  <option value="TEXTILES">TEXTILES</option>
                  <option value="DECOR">DECOR</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                  <option value="PERIPHERALS">PERIPHERALS</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#51443c] block mb-1">Price ($)</label>
                <Input
                  type="number"
                  placeholder="99.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#51443c] block mb-1">Stock Units</label>
                <Input
                  type="number"
                  placeholder="50"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#51443c] block mb-1">Image URL / Asset</label>
              <Input
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#ece0db]">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingProduct ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
