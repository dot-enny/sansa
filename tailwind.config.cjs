/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        // keep default colors, you can extend here
      },
    },
  },
  plugins: [],
}
