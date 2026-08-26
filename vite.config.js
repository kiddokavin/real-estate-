import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/real-estate-/', // Exact GitHub Pages repository name path
  server: {
    port: 3000,
    host: true
  }
})
