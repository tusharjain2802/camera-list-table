/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'customBreakPointSm': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'poppins': ['poppins', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'sedan': ['Sedan', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },

  },
  plugins: [],
}

