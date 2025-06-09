/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#D4A373', // Soft, earthy terracotta/beige
        'brand-secondary': '#A1665E', // Muted, warm brown
        'brand-accent': '#E7BC91', // Light, sandy gold
        'brand-text': '#4A4A4A', // Dark grey for text
        'brand-light': '#FEFAF6', // Off-white/cream for backgrounds
      },
      fontFamily: {
        'sans': ['"Montserrat"', 'sans-serif'], // Clean, modern sans-serif
        'serif': ['"Playfair Display"', 'serif'], // Elegant, artisanal serif for headings/accents
      }
    },
  },
  plugins: [],
}
