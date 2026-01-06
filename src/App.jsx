import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Claims from './pages/Claims/Claims'
import ClaimDetails from './pages/Claims/ClaimDetails'
import NewClaim from './pages/Claims/NewClaim'
import Analytics from './pages/Analytics/Analytics'
import Customers from './pages/Customers/Customers'
import Reports from './pages/Reports/Reports'
import Settings from './pages/Settings/Settings'
import DemoTour from './components/DemoTour/DemoTour'
import WelcomeModal from './components/WelcomeModal/WelcomeModal'
import { useDemoStore } from './store/demoStore'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const { isDemoMode, startDemo } = useDemoStore()

  const handleStartDemo = () => {
    setShowWelcome(false)
    startDemo()
  }

  const handleSkipDemo = () => {
    setShowWelcome(false)
  }

  return (
    <>
      {showWelcome && (
        <WelcomeModal 
          onStartDemo={handleStartDemo} 
          onSkip={handleSkipDemo} 
        />
      )}
      
      {isDemoMode && <DemoTour />}
      
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/claims/new" element={<NewClaim />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
