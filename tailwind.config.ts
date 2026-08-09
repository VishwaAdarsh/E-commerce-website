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
        foreground: "#181512",
        brand: {
          espresso: "#171310",
          ivory: "#FAF7F2",
          beige: "#F2ECE4",
          card: "#FFFFFF",
          terracotta: "#A56B4F",
          "terracotta-hover": "#8E5840",
          text: "#181512",
          muted: "#6F6861",
          border: "#E6DED5",
          success: "#347A52",
          warning: "#B77A2B",
          error: "#B74747",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dim: "#E6DED5",
          bright: "#FAF7F2",
          beige: "#F2ECE4",
          dark: "#171310",
        },
        primary: {
          DEFAULT: "#171310",
          hover: "#2A2420",
          accent: "#A56B4F",
          "accent-hover": "#8E5840",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(23, 19, 16, 0.05)",
        card: "0 4px 20px -2px rgba(23, 19, 16, 0.06)",
        dropdown: "0 10px 30px -5px rgba(23, 19, 16, 0.12)",
        drawer: "-10px 0 40px rgba(23, 19, 16, 0.15)",
        terracotta: "0 8px 24px -4px rgba(165, 107, 79, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
