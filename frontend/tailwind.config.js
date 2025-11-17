/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent used for gradients
        accent: "#7c3aed",

        // Additional soft-glass helper color
        glass1: "rgba(255, 255, 255, 0.06)",
      },

      // Custom backdrop blur levels for glass UI
      backdropBlur: {
        xs: "2px",
      },

      // Optional: smooth card hover lifting
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

