/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {boxShadow: {
      'inner-custom': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)', // Example custom inner shadow
    },
  },
  },
  plugins: [],
}

