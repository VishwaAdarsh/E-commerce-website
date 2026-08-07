"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import { 
  LayoutGrid, 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  ArrowUpRight
} from "lucide-react";

export default function MerchantSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user, profile } = useAuth();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutGrid },
    { name: "Analytics", href: "/admin/orders", icon: BarChart3 },
    { name: "Inventory", href: "/admin/products", icon: Package },
    { name: "Customers", href: "#", icon: Users },
    { name: "Settings", href: "#", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#fff8f6] border-r border-[#ece0db] min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen">
      {/* Top Section */}
      <div className="space-y-6">
        {/* User Account Header */}
        <div className="flex items-center space-x-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-[#845331] text-white flex items-center justify-center font-bold text-sm overflow-hidden border border-[#d6c3b8]">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
              alt="Merchant Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#201a18] leading-tight">
              {profile?.full_name || "Merchant Portal"}
            </h4>
            <p className="text-xs text-[#51443c] truncate max-w-[130px]">
              {user?.email || "Premium Account"}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#faba90] text-[#201a18] font-semibold shadow-sm"
                    : "text-[#51443c] hover:bg-[#f8ebe6] hover:text-[#201a18]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#845331]" : "text-[#735949]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 pt-4 border-t border-[#ece0db]">
        {/* Upgrade Plan CTA Button */}
        <button className="w-full bg-[#845331] hover:bg-[#73482a] text-white py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 shadow-sm transition-all">
          <span>Upgrade Plan</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {/* Secondary Links */}
        <div className="space-y-1">
          <Link
            href="#"
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-xs font-medium text-[#51443c] hover:bg-[#f8ebe6] hover:text-[#201a18] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#735949]" />
            <span>Help Center</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-xs font-medium text-[#51443c] hover:bg-[#f8ebe6] hover:text-[#ba1a1a] transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-[#735949]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
