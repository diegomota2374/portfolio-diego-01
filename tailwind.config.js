/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'dark-primary': '#0a0e27', // Almost black dark blue
        'dark-accent': '#00ff88', // Green
        'dark-bg': '#0f1419',
        // Light mode colors
        'light-primary': '#4a90e2', // Lighter blue
        'light-accent': '#f5f7fa', // Ice gray/white
        'light-bg': '#ffffff',
      },
    },
  },
  plugins: [],
}

