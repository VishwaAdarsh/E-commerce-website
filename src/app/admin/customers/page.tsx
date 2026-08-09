"use client";

import { useState, useEffect } from "react";
import MerchantSidebar from "@/components/layout/MerchantSidebar";
import Badge from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { getCustomers, CustomerProfile } from "@/lib/services/customers";
import { Users, Search, Mail, Phone, Calendar, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const custs = await getCustomers();
      setCustomers(custs);
    }
    load();
  }, []);

  const handleCustomerClick = (c: CustomerProfile) => {
    setSelectedCustomer(c);
    setIsDrawerOpen(true);
  };

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] font-sans text-[#181512]">
      <MerchantSidebar />

      <main className="flex-grow p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6DED5] pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A56B4F]">CUSTOMER RELATIONSHIP MANAGEMENT</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#181512]">Customer Directory</h1>
            <p className="text-xs text-[#6F6861] mt-1">View customer profiles, order history, and lifetime spending.</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6F6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6DED5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#181512] placeholder-[#6F6861] focus:outline-none focus:border-[#A56B4F]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DED5] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#6F6861] border-b border-[#E6DED5]">
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">CONTACT</th>
                  <th className="py-3 px-4">JOINED</th>
                  <th className="py-3 px-4">ORDERS</th>
                  <th className="py-3 px-4">TOTAL SPENT</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED5] text-xs">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} onClick={() => handleCustomerClick(c)} className="cursor-pointer hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#181512]">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#F2ECE4] text-[#A56B4F] flex items-center justify-center font-bold text-xs">
                          {c.avatarInitials}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#6F6861]">{c.email}</td>
                    <td className="py-4 px-4 text-[#6F6861]">{c.registrationDate}</td>
                    <td className="py-4 px-4 font-bold text-[#181512]">{c.totalOrders} orders</td>
                    <td className="py-4 px-4 font-extrabold text-[#171310]">₹{c.totalSpent.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right"><Badge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Customer Profile Details">
          {selectedCustomer && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center space-x-4 pb-4 border-b border-[#E6DED5]">
                <div className="w-12 h-12 rounded-full bg-[#171310] text-[#FAF7F2] flex items-center justify-center font-bold text-base">
                  {selectedCustomer.avatarInitials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#181512]">{selectedCustomer.name}</h3>
                  <p className="text-[#6F6861]">{selectedCustomer.email}</p>
                </div>
              </div>

              <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-xl border border-[#E6DED5]">
                <div className="flex justify-between"><span>Phone:</span><span className="font-bold text-[#181512]">{selectedCustomer.phone}</span></div>
                <div className="flex justify-between"><span>Joined:</span><span className="font-bold text-[#181512]">{selectedCustomer.registrationDate}</span></div>
                <div className="flex justify-between"><span>Lifetime Spend:</span><span className="font-bold text-[#347A52]">₹{selectedCustomer.totalSpent.toLocaleString()}</span></div>
              </div>

              <div>
                <h4 className="font-bold text-[#181512] mb-2 uppercase text-[10px] tracking-wider text-[#A56B4F]">Order History</h4>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DED5] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#181512] block">Order #ORD-9932</span>
                    <span className="text-[10px] text-[#6F6861]">Oct 24, 2024</span>
                  </div>
                  <span className="font-bold text-[#171310]">₹1,240.00</span>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </main>
    </div>
  );
}
