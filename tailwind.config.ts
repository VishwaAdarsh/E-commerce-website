import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fff8f6",
        surface: {
          DEFAULT: "#ffffff",
          dim: "#e3d8d3",
          bright: "#fff8f6",
          lowest: "#ffffff",
          low: "#fef1ec",
          container: "#f8ebe6",
          high: "#f2e6e1",
          highest: "#ece0db",
          variant: "#ece0db",
        },
        primary: {
          DEFAULT: "#845331",
          hover: "#73482a",
          container: "#faba90",
          fixed: "#ffdcc7",
          "fixed-dim": "#f9b98f",
          "on-container": "#774827",
        },
        secondary: {
          DEFAULT: "#735949",
          container: "#ffdbc7",
          "on-container": "#795f4f",
        },
        tertiary: {
          DEFAULT: "#2d6673",
          container: "#99d0df",
          "on-container": "#1f5a67",
        },
        "on-surface": {
          DEFAULT: "#201a18",
          variant: "#51443c",
        },
        outline: {
          DEFAULT: "#84746b",
          variant: "#d6c3b8",
        },
        border: "#ece0db",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "level-1": "0 1px 3px rgba(0,0,0,0.05)",
        "level-2": "0 10px 15px -3px rgba(0,0,0,0.08)",
        "soft-glow": "0 8px 30px rgba(132, 83, 49, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
