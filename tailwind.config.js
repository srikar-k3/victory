/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, screens: { lg: "1024px", xl: "1152px", "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          primary: "#610924",
          secondary: "#D89EA3",
          accent: "#F2D17D",
          light: "#F5F1ED",
          dark: "#001A23",
        },
        ink: {
          DEFAULT: "#001A23",
          muted: "#2a3a41",
          subtle: "#6b7a80",
        },
        paper: {
          DEFAULT: "#f5f1ed",
          elevated: "#ffffff",
        },
      },
      ringColor: { brand: "#F2D17D" },
      fontFamily: {
        sans: ["Inter", "Sora", "ui-sans-serif", "system-ui", "-apple-system", "Arial", "sans-serif"],
      },
      borderRadius: { xl: "14px", "2xl": "20px" },
      maxWidth: { prose: "72ch" },
      screens: { md: "700px", lg: "1024px", xl: "1280px" },
    },
  },
  plugins: [],
};
