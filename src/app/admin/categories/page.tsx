"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getCategories, createCategory, Category } from "@/lib/services/categories";
import { useToast } from "@/components/ui/Toast";
import { Plus, Search, FolderTree, Edit3, Trash2, Layers } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setCategories(cats);
      setLoading(false);
    }
    load();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    toast("Creating category...", "info");
    const newCat = await createCategory({
      name,
      slug,
      description,
      image: image || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop",
      status: "ACTIVE",
      sortOrder: categories.length + 1,
      parentId: parentId || null,
    });

    setCategories([...categories, newCat]);
    toast(`Category "${newCat.name}" created!`, "success");
    setIsAddModalOpen(false);
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
    setParentId("");
  };

  const filteredCategories = categories.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.slug.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">CATALOG TAXONOMY</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Category Management</h1>
            <p className="text-xs text-[#6F6861] mt-1">Organize products into hierarchical categories and subcategories.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
              />
            </div>

            <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#171310] hover:bg-[#A56B4F] text-white">
              <Plus className="w-4 h-4 mr-2" />
              <span>Add Category</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">SLUG</th>
                  <th className="py-3 px-4">DESCRIPTION</th>
                  <th className="py-3 px-4">PRODUCTS</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#181512]">
                      <div className="flex items-center space-x-3">
                        <img src={cat.image} alt={cat.name} className="w-9 h-9 rounded-xl object-cover border border-[#E6DED5]" />
                        <div>
                          <span>{cat.name}</span>
                          {cat.parentId && (
                            <span className="text-[10px] text-[#A56B4F] block font-semibold">Subcategory</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-[#6F6861]">{cat.slug}</td>
                    <td className="py-4 px-4 text-[#6F6861] max-w-xs truncate">{cat.description}</td>
                    <td className="py-4 px-4 font-bold text-[#181512]">{cat.productCount || 12} items</td>
                    <td className="py-4 px-4"><Badge status={cat.status} /></td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button className="p-1 text-[#6F6861] hover:text-[#A56B4F]"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-1 text-[#6F6861] hover:text-[#B74747]"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Category">
          <form onSubmit={handleSaveCategory} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Category Name</label>
              <Input placeholder="e.g. Fine Ceramics" value={name} onChange={(e) => handleNameChange(e.target.value)} required />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">URL Slug</label>
              <Input placeholder="fine-ceramics" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Parent Category (Optional Subcategory)</label>
              <select value={parentId} onChange={(e) => setParentId(e.target.value)} className="w-full bg-white border border-[#E6DED5] rounded-xl px-4 py-2 text-xs text-[#181512]">
                <option value="">None (Top-Level Category)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Description</label>
              <Input placeholder="Artisanal ceramic products handcrafted..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-bold text-[#6F6861] block mb-1">Cover Image URL</label>
              <Input placeholder="https://images.unsplash.com/..." value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-[#E6DED5]">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#171310] hover:bg-[#A56B4F] text-white">Save Category</Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
