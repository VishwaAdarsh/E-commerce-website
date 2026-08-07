"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ isOpen, onClose, title, children, className }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            className={cn(
              "pointer-events-auto w-screen max-w-md bg-white border-l border-[#ece0db] shadow-level-2 flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#ece0db]">
              <h3 className="text-base font-extrabold text-[#201a18]">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#84746b] hover:text-[#201a18] hover:bg-[#f8ebe6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
