"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import { 
  LayoutGrid, 
  BarChart3, 
  Package, 
  FolderTree,
  Boxes,
  ShoppingBag,
  Ticket,
  Users, 
  LifeBuoy,
  FileSpreadsheet,
  Settings, 
  LogOut,
  ExternalLink
} from "lucide-react";

export default function MerchantSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user, profile } = useAuth();

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
      ],
    },
    {
      group: "CATALOG",
      items: [
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Categories", href: "/admin/categories", icon: FolderTree },
        { name: "Inventory", href: "/admin/inventory", icon: Boxes },
      ],
    },
    {
      group: "SALES",
      items: [
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Coupons", href: "/admin/coupons", icon: Ticket },
      ],
    },
    {
      group: "CUSTOMERS",
      items: [
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Support Desk", href: "/admin/support", icon: LifeBuoy },
      ],
    },
    {
      group: "ANALYTICS",
      items: [
        { name: "Reports", href: "/admin/reports", icon: FileSpreadsheet },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        { name: "Store Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-white border-r border-[#E6DED5] min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen overflow-y-auto">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Brand & Admin Profile */}
        <div className="space-y-3 pb-4 border-b border-[#E6DED5]">
          <Link href="/" className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-[#171310] block px-2">
            LUXE ERP
          </Link>
          
          <div className="flex items-center space-x-3 px-2 py-2 bg-[#FAF7F2] rounded-2xl border border-[#E6DED5]">
            <div className="w-9 h-9 rounded-full bg-[#171310] text-[#FAF7F2] flex items-center justify-center font-bold text-xs shadow-subtle flex-shrink-0">
              {profile?.full_name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#181512] truncate">
                {profile?.full_name || "Merchant Admin"}
              </h4>
              <p className="text-[10px] text-[#6F6861] truncate">
                {user?.email || "merchant@luxe.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Grouped Navigation */}
        <nav className="space-y-5">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#A56B4F] block">
                {group.group}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#171310] text-white shadow-subtle"
                        : "text-[#6F6861] hover:bg-[#FAF7F2] hover:text-[#181512]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#A56B4F]" : "text-[#6F6861]"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 pt-4 border-t border-[#E6DED5]">
        <Link
          href="/"
          target="_blank"
          className="w-full bg-[#FAF7F2] hover:bg-[#E6DED5]/50 text-[#181512] py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between border border-[#E6DED5]"
        >
          <span>View Customer Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#A56B4F]" />
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold text-[#B74747] hover:bg-[#B74747]/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-[#B74747]" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}
