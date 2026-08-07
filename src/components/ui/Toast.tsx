"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (message: string, type: ToastType = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Overlay Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-level-2 border text-xs font-semibold animate-in slide-in-from-bottom-5 duration-300",
              t.type === "success" && "bg-white border-[#faba90] text-[#774827]",
              t.type === "error" && "bg-white border-[#ffdad6] text-[#93000a]",
              t.type === "info" && "bg-white border-[#ece0db] text-[#201a18]"
            )}
          >
            <div className="flex items-center space-x-3">
              {t.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#845331]" />}
              {t.type === "error" && <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />}
              {t.type === "info" && <Info className="w-4 h-4 text-[#845331]" />}
              <span>{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#84746b] hover:text-[#201a18] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
