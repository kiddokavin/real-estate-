import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/real-estate-/', // Explicit GitHub Pages repo path
  server: {
    port: 3000,
    host: true
  }
})
