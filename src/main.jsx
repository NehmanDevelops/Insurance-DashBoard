import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

// Create a client for React Query - enterprise-grade data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

// Determine the basename dynamically:
// - On Vercel (or any root-hosted deployment), use '/'
// - On GitHub Pages, use '/Insurance-DashBoard'
const getBasename = () => {
  // Check if we're on GitHub Pages by looking at the hostname
  if (window.location.hostname.includes('github.io')) {
    return '/Insurance-DashBoard'
  }
  // Default to root for Vercel and local development
  return '/'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

