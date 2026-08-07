import React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  className?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = PackageOpen,
  className,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-[#ece0db] shadow-level-1 space-y-4",
        className
      )}
    >
      <div className="p-4 bg-[#f8ebe6] rounded-2xl text-[#845331]">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-extrabold text-[#201a18]">{title}</h3>
        {description && <p className="text-xs text-[#51443c] leading-relaxed">{description}</p>}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
