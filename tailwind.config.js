/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include the index.html file
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/JSX/TS/TSX files inside the src folder
  ],
  theme: {
    extend: {}, // You can extend the default theme if needed
  },
  plugins: [], // Add plugins if needed
}
