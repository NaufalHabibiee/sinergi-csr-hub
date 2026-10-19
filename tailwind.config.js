/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#176B4D',   // Deep Forest
          dark: '#0F4833',
          emerald: '#23966B',  // Emerald
          mint: '#E8F5EE',     // Soft Mint
          mintHover: '#D4EEDB',
        },
        surface: {
          bg: '#F8FAF8',       // Warm White
          card: '#FFFFFF',
          secondary: '#F1F5F2',
          muted: '#E9EFEA',
        },
        ink: {
          primary: '#17231E',  // Dark Ink text
          secondary: '#364B41',
          muted: '#69766F',    // Muted Gray
        },
        border: {
          subtle: '#E3EAE5',
          medium: '#CBD8D0',
        },
        status: {
          amber: '#E7AC3B',
          red: '#C94C4C',
          blue: '#2563EB',
          emerald: '#23966B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(23, 35, 30, 0.05)',
        card: '0 2px 6px -1px rgba(23, 35, 30, 0.06), 0 1px 4px -1px rgba(23, 35, 30, 0.04)',
        elevated: '0 10px 25px -5px rgba(23, 35, 30, 0.08), 0 8px 10px -6px rgba(23, 35, 30, 0.04)',
      }
    },
  },
  plugins: [],
}
