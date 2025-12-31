import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks more granularly
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            if (id.includes('three')) {
              return 'vendor-three'
            }
            if (id.includes('@emailjs')) {
              return 'vendor-emailjs'
            }
            // Other node_modules
            return 'vendor-other'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Use esbuild minify (default, faster and doesn't require terser)
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['three'], // Let Three.js be lazy loaded
  },
})

