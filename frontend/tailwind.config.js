/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:           "#0f0f12",
        surface:      "#16161a",
        surface2:     "#1c1c21",
        border:       "#2a2a35",
        "border-hover":"#3d3d4d",
        brand:        "#7c3aed",
        "brand-light":"#8b5cf6",
        "brand-dim":  "#7c3aed1a",
        income:       "#10b981",
        "income-dim": "#10b98115",
        expense:      "#f43f5e",
        "expense-dim":"#f43f5e15",
        warning:      "#f59e0b",
        info:         "#3b82f6",
        primary:      "#f8f8ff",
        secondary:    "#a1a1b5",
        muted:        "#6b6b80",
      },
      fontFamily: {
        sans:  ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono:  ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.3)",
        "glow-sm": "0 0 10px rgba(124,58,237,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.3)",
        modal: "0 24px 64px rgba(0,0,0,0.5)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
        "count-up": "countUp 1s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
