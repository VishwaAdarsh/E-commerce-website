import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          ref={ref}
          className={cn(
            "w-full bg-white border border-[#d6c3b8] rounded-xl px-4 py-2.5 text-xs text-[#201a18] placeholder-[#84746b] focus:outline-none focus:border-[#845331] transition-all",
            error && "border-[#ba1a1a]",
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] text-[#ba1a1a] font-semibold">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
