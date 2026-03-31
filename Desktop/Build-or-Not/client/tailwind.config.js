/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f5f7fb',
          100: '#e8edf6',
          200: '#cad5e8',
          300: '#a4b7d4',
          400: '#7f95bf',
          500: '#6078a6',
          600: '#4a6086',
          700: '#374a69',
          800: '#24354d',
          900: '#111f34',
        },
        brand: {
          ink: '#0d182f',
          royal: '#2a4f9c',
          sapphire: '#3a68c6',
          mist: '#9ab2df',
          mint: '#58a99e',
          gold: '#c7a56a',
          amber: '#e0bb7b',
        },
        surface: {
          950: '#050915',
          900: '#0a1224',
          800: '#101b32',
          700: '#162643',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 22px 60px rgba(4, 10, 28, 0.45)',
        soft: '0 12px 30px rgba(4, 10, 28, 0.28)',
        glow: '0 0 0 1px rgba(199, 165, 106, 0.24), 0 20px 45px rgba(4, 10, 28, 0.45)',
      },
    },
  },
  plugins: [],
}
