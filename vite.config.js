import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel sets VERCEL=1 in the build environment
  // On Vercel, use root '/'. On GitHub Pages, use '/Insurance-DashBoard/'
  base: process.env.VERCEL === '1' ? '/' : '/Insurance-DashBoard/',
})

