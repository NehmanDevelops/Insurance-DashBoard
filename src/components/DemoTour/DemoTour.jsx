import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowLeft, FiArrowRight, FiCheck, FiPhone, FiClock, FiUpload, FiShield, FiBell, FiDollarSign } from 'react-icons/fi'
import { useDemoStore } from '../../store/demoStore'
import './DemoTour.css'

const tourSteps = [
  {
    id: 1,
    target: '#sidebar',
    title: '👋 Welcome to Your Claims Portal',
    content: 'This self-service portal lets you track claims, upload documents, and get real-time updates — all without calling our support line. Let\'s see how it saves you time!',
    benefit: 'No more waiting on hold',
    problem: '40% of support calls are just status checks',
    position: 'right',
    route: '/'
  },
  {
    id: 2,
    target: '#stats-overview',
    title: '📊 Your Claims at a Glance',
    content: 'See all your active claims, pending actions, and approved amounts in one place. No more searching through emails or waiting for callbacks.',
    benefit: '24/7 access to your claim status',
    problem: 'Customers want info outside business hours',
    position: 'bottom',
    route: '/'
  },
  {
    id: 3,
    target: '#recent-claims',
    title: '📋 Track Every Claim in Real-Time',
    content: 'Each claim shows its current status with a visual progress tracker. Watch your claim move from Submitted → Under Review → Decision → Payment.',
    benefit: 'Instant status visibility',
    problem: 'Average hold time for status: 15 minutes',
    position: 'top',
    route: '/'
  },
  {
    id: 4,
    target: '#notifications-btn',
    title: '🔔 Automatic Status Notifications',
    content: 'Get notified instantly when your claim status changes. No need to check repeatedly — we\'ll tell you when there\'s news.',
    benefit: 'Proactive updates save time',
    problem: 'Customers call multiple times for updates',
    position: 'bottom-left',
    route: '/'
  },
  {
    id: 5,
    target: '#nav-claims',
    title: '📁 View All Your Claims',
    content: 'Access your complete claims history. Filter by status, type, or date to find exactly what you need.',
    benefit: 'Complete history at your fingertips',
    problem: 'Hard to track multiple claims',
    position: 'right',
    route: '/',
    nextRoute: '/claims'
  },
  {
    id: 6,
    target: '#claims-filters',
    title: '🔍 Find Claims Quickly',
    content: 'Use filters to find specific claims by status (Pending, Approved, Paid) or claim type (Auto, Property, Health). Search by claim number for instant results.',
    benefit: 'Find any claim in seconds',
    problem: 'Customers forget claim numbers',
    position: 'bottom',
    route: '/claims'
  },
  {
    id: 7,
    target: '#claims-table',
    title: '📊 Detailed Claim Information',
    content: 'Click any claim to see full details: timeline of events, adjuster contact info, uploaded documents, and estimated payment dates.',
    benefit: 'All details in one place',
    problem: 'Information scattered across systems',
    position: 'top',
    route: '/claims'
  },
  {
    id: 8,
    target: '#nav-new-claim',
    title: '➕ File New Claims Online',
    content: 'Submit new claims 24/7 without calling. Upload photos, documents, and descriptions directly from your phone or computer.',
    benefit: 'File claims anytime, anywhere',
    problem: 'Office hours limit when customers can file',
    position: 'right',
    route: '/claims',
    nextRoute: '/claims/new'
  },
  {
    id: 9,
    target: '#nav-settings',
    title: '👤 Manage Your Profile',
    content: 'Update your contact info, notification preferences, and payment details. Keep everything current so claims process faster.',
    benefit: 'Self-service account management',
    problem: 'Outdated info delays claims',
    position: 'right',
    route: '/claims/new',
    nextRoute: '/settings'
  },
  {
    id: 10,
    target: '#nav-dashboard',
    title: '🎉 You\'re All Set!',
    content: 'This self-service portal reduces call center volume by 40% while giving you 24/7 access. Track claims, upload documents, and get updates instantly. Built by Nehman Rahimi for Zurich Canada.',
    benefit: 'Better service, lower costs',
    problem: 'Each status call costs $8-12',
    position: 'right',
    route: '/settings',
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
          
          {step.benefit && (
            <div className="demo-tooltip-meta">
              <div className="demo-meta-item benefit">
                <FiCheck size={14} />
                <span><strong>Benefit:</strong> {step.benefit}</span>
              </div>
              <div className="demo-meta-item problem">
                <FiDollarSign size={14} />
                <span><strong>Problem Solved:</strong> {step.problem}</span>
              </div>
            </div>
          )}

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
