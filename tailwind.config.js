/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        "primary": "#5E17EB",
        "primary-dark": "5814E1",
        "secondary": "#FFC516",
      },
    },
  },
  plugins: [],
}

