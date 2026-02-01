import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Check if we are running on Vercel using the standard environment variable
  const isVercel = process.env.VERCEL === '1';

  return {
    plugins: [react()],
    // If on Vercel, use root '/'. If on GitHub Pages, use '/Insurance-DashBoard/'
    base: isVercel ? '/' : '/Insurance-DashBoard/',
  }
})
