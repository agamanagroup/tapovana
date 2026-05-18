/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f2f7f2",
          100: "#e0ede0",
          200: "#c3dcc3",
          300: "#96c196",
          400: "#619e61",
          500: "#3d7a3d",
          600: "#2d612d",
          700: "#244e24",
          800: "#1e3e1e",
          900: "#193319",
          950: "#0d1f0d",
        },
        earth: {
          50:  "#faf7f2",
          100: "#f2ebe0",
          200: "#e4d4bf",
          300: "#d2b896",
          400: "#be9669",
          500: "#ae7e4e",
          600: "#9a6840",
          700: "#7f5336",
          800: "#694430",
          900: "#57392a",
          950: "#2f1d15",
        },
        cream: {
          50:  "#fefdf8",
          100: "#fdf9ed",
          200: "#faf0d0",
          300: "#f5e4a8",
          400: "#eed47a",
          500: "#e5c254",
        },
        stone: {
          warm: "#f5f0e8",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "card": "0 2px 16px 0 rgba(30,62,30,0.07), 0 1px 4px 0 rgba(30,62,30,0.05)",
        "card-hover": "0 8px 32px 0 rgba(30,62,30,0.13), 0 2px 8px 0 rgba(30,62,30,0.08)",
        "table": "0 1px 3px 0 rgba(30,62,30,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
