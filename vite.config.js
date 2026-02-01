import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 1. Force load all environment variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    // 2. The Logic:
    // If on Vercel, use root path '/'
    // If NOT on Vercel (GitHub Pages), use the Repo Name.
    base: env.VERCEL ? '/' : '/Insurance-DashBoard/',
  }
})
