import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import { useDemoStore } from '../../store/demoStore'
import './DemoTour.css'

const tourSteps = [
  {
    id: 1,
    target: '#sidebar',
    title: 'Navigation Sidebar',
    content: 'Access all main sections of the Claims Portal from here. The sidebar provides quick navigation to Dashboard, Claims, Analytics, Customers, Reports, and Settings.',
    position: 'right',
    route: '/'
  },
  {
    id: 2,
    target: '#search-bar',
    title: 'Global Search',
    content: 'Quickly search for claims, customers, or policies across the entire system. Use keyboard shortcut ⌘K for instant access.',
    position: 'bottom',
    route: '/'
  },
  {
    id: 3,
    target: '#notifications-btn',
    title: 'Real-time Notifications',
    content: 'Stay updated with claim status changes, new submissions, and important alerts. All notifications are logged for audit purposes.',
    position: 'bottom-left',
    route: '/'
  },
  {
    id: 4,
    target: '#stats-overview',
    title: 'Key Performance Indicators',
    content: 'Monitor critical metrics at a glance: total claims, processing times, approval rates, and customer satisfaction scores.',
    position: 'bottom',
    route: '/'
  },
  {
    id: 5,
    target: '#claims-chart',
    title: 'Claims Analytics',
    content: 'Visualize claim trends over time with interactive charts. Filter by date range, claim type, or status for deeper insights.',
    position: 'top',
    route: '/'
  },
  {
    id: 6,
    target: '#recent-claims',
    title: 'Recent Claims Activity',
    content: 'View the latest claims with quick actions. Click any claim to see full details, update status, or add notes.',
    position: 'top',
    route: '/'
  },
  {
    id: 7,
    target: '#nav-claims',
    title: 'Claims Management',
    content: "Let's explore the full Claims Management system where you can create, track, and process claims.",
    position: 'right',
    route: '/',
    nextRoute: '/claims'
  },
  {
    id: 8,
    target: '#claims-filters',
    title: 'Advanced Filtering',
    content: 'Filter claims by status, type, priority, date range, and more. Save filter presets for quick access to common views.',
    position: 'bottom',
    route: '/claims'
  },
  {
    id: 9,
    target: '#claims-table',
    title: 'Claims Table',
    content: 'Full-featured claims list with sorting, pagination, and bulk actions. Click any row to view or edit claim details.',
    position: 'top',
    route: '/claims'
  },
  {
    id: 10,
    target: '#nav-analytics',
    title: 'Analytics Dashboard',
    content: "Explore comprehensive analytics and reporting tools for data-driven decision making.",
    position: 'right',
    route: '/claims',
    nextRoute: '/analytics'
  },
  {
    id: 11,
    target: '#analytics-overview',
    title: 'Performance Analytics',
    content: 'Track KPIs, identify trends, and generate reports. Export data in multiple formats for external analysis.',
    position: 'bottom',
    route: '/analytics'
  },
  {
    id: 12,
    target: '#nav-dashboard',
    title: 'Tour Complete!',
    content: "You've seen the key features of the Zurich Claims Portal. Feel free to explore more on your own. Click 'Finish' to start using the system.",
    position: 'right',
    route: '/analytics',
    nextRoute: '/'
  }
]

function DemoTour() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentStep, nextStep, prevStep, endDemo, totalSteps, goToStep } = useDemoStore()
  const [targetElement, setTargetElement] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const step = tourSteps[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  useEffect(() => {
    // Navigate to the correct route if needed
    if (step && step.route !== location.pathname) {
      navigate(step.route)
    }
  }, [currentStep, step, location.pathname, navigate])

  useEffect(() => {
    // Find and highlight the target element
    const findTarget = () => {
      if (!step) return
      
      const element = document.querySelector(step.target)
      if (element) {
        setTargetElement(element)
        
        // Calculate tooltip position
        const rect = element.getBoundingClientRect()
        const pos = calculatePosition(rect, step.position)
        setTooltipPosition(pos)
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    // Small delay to allow route transitions
    const timer = setTimeout(findTarget, 300)
    return () => clearTimeout(timer)
  }, [currentStep, step, location.pathname])

  const calculatePosition = (rect, position) => {
    const padding = 16
    const tooltipWidth = 360
    const tooltipHeight = 200

    switch (position) {
      case 'right':
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.right + padding
        }
      case 'left':
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left - tooltipWidth - padding
        }
      case 'bottom':
        return {
          top: rect.bottom + padding,
          left: rect.left + rect.width / 2 - tooltipWidth / 2
        }
      case 'bottom-left':
        return {
          top: rect.bottom + padding,
          left: rect.right - tooltipWidth
        }
      case 'top':
        return {
          top: rect.top - tooltipHeight - padding,
          left: rect.left + rect.width / 2 - tooltipWidth / 2
        }
      default:
        return { top: rect.bottom + padding, left: rect.left }
    }
  }

  const handleNext = () => {
    if (step?.nextRoute) {
      navigate(step.nextRoute)
    }
    if (currentStep < totalSteps - 1) {
      nextStep()
    } else {
      endDemo()
      navigate('/')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStepData = tourSteps[currentStep - 1]
      if (prevStepData?.route !== location.pathname) {
        navigate(prevStepData.route)
      }
      prevStep()
    }
  }

  const handleSkip = () => {
    endDemo()
    navigate('/')
  }

  if (!step) return null

  return (
    <>
      {/* Overlay */}
      <div className="demo-overlay" />
      
      {/* Spotlight */}
      {targetElement && (
        <div 
          className="demo-spotlight"
          style={{
            top: targetElement.getBoundingClientRect().top - 8,
            left: targetElement.getBoundingClientRect().left - 8,
            width: targetElement.getBoundingClientRect().width + 16,
            height: targetElement.getBoundingClientRect().height + 16,
          }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="demo-tooltip"
          style={{
            top: Math.max(16, Math.min(tooltipPosition.top, window.innerHeight - 250)),
            left: Math.max(16, Math.min(tooltipPosition.left, window.innerWidth - 380)),
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="demo-tooltip-header">
            <span className="demo-step-badge">Step {currentStep + 1} of {totalSteps}</span>
            <button className="demo-close" onClick={handleSkip} aria-label="Close tour">
              <FiX size={18} />
            </button>
          </div>

          <h3 className="demo-tooltip-title">{step.title}</h3>
          <p className="demo-tooltip-content">{step.content}</p>

          <div className="demo-progress">
            <div className="demo-progress-bar">
              <div className="demo-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="demo-tooltip-actions">
            <button 
              className="btn btn-ghost" 
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <FiArrowLeft size={16} />
              Back
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === totalSteps - 1 ? (
                <>
                  <FiCheck size={16} />
                  Finish
                </>
              ) : (
                <>
                  Next
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Step indicators */}
          <div className="demo-steps-indicator">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                className={`demo-step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => goToStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default DemoTour
