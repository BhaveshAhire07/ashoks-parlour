export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: { 800: '#2a2a2a', 900: '#1a1a1a', 950: '#0f0f0f' },
        gold: { 300: '#EFDE75', 400: '#DFC03D', 500: '#D4AF37', 600: '#C5A028', 700: '#B8911A' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
