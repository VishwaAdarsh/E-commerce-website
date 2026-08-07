"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          "bg-white rounded-3xl border border-[#ece0db] shadow-level-2 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200",
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

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
