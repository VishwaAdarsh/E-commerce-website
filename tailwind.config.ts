import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        foreground: "#151515",
        brand: {
          bg: "#FAF7F2",
          text: "#151515",
          bronze: "#A56A3A",
          gold: "#D4A25A",
          gray: "#5F5F5F",
          border: "#E8DDD2",
        },
        surface: {
          DEFAULT: "#ffffff",
          dim: "#E8DDD2",
          bright: "#FAF7F2",
          lowest: "#ffffff",
          container: "#F5EFE6",
        },
        primary: {
          DEFAULT: "#A56A3A",
          hover: "#8C562B",
          gold: "#D4A25A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "36px",
      },
      boxShadow: {
        "level-1": "0 2px 10px rgba(21, 21, 21, 0.04)",
        "level-2": "0 12px 30px -4px rgba(21, 21, 21, 0.08)",
        "level-3": "0 24px 50px -12px rgba(165, 106, 58, 0.2)",
        "gold-glow": "0 10px 30px -5px rgba(212, 162, 90, 0.35)",
        "bronze-glow": "0 12px 35px -5px rgba(165, 106, 58, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
