import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-[#845331] hover:bg-[#73482a] text-white shadow-sm",
      secondary: "bg-[#faba90] hover:bg-[#f9b98f] text-[#774827] shadow-sm",
      outline: "bg-white border border-[#d6c3b8] text-[#51443c] hover:bg-[#f8ebe6]",
      ghost: "bg-transparent hover:bg-[#f8ebe6] text-[#51443c]",
      danger: "bg-white border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]/40",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-xs",
      lg: "px-6 py-3.5 text-xs tracking-wide",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
