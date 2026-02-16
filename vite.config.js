import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'markdown': ['react-markdown', 'rehype-highlight', 'rehype-raw', 'remark-gfm'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
