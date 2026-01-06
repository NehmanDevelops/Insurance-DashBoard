import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowLeft, FiArrowRight, FiCheck, FiCode, FiZap, FiLayers, FiDatabase, FiUsers, FiBarChart2 } from 'react-icons/fi'
import { useDemoStore } from '../../store/demoStore'
import './DemoTour.css'

const tourSteps = [
  {
    id: 1,
    target: '#sidebar',
    title: '📱 Component-Based Navigation',
    content: 'This sidebar demonstrates React component architecture - a modular, reusable navigation system. Each nav item is dynamically rendered using map(), promoting DRY principles that Zurich values in maintainable codebases.',
    zurichValue: 'Clean, modular architecture',
    techUsed: 'React Router DOM, Framer Motion',
    position: 'right',
    route: '/'
  },
  {
    id: 2,
    target: '#search-bar',
    title: '🔍 Controlled Input Component',
    content: 'The search uses React controlled components pattern with useState hooks. This ensures predictable behavior and easy testing - key principles for enterprise-grade applications at Zurich.',
    zurichValue: 'Testable, predictable code',
    techUsed: 'React Hooks, Debouncing',
    position: 'bottom',
    route: '/'
  },
  {
    id: 3,
    target: '#notifications-btn',
    title: '🔔 Real-time State Updates',
    content: 'Notifications use Zustand for global state management - a lightweight alternative to Redux. This demonstrates understanding of modern state patterns that scale well for insurance claim workflows.',
    zurichValue: 'Scalable state management',
    techUsed: 'Zustand with persist middleware',
    position: 'bottom-left',
    route: '/'
  },
  {
    id: 4,
    target: '#stats-overview',
    title: '📊 Data-Driven KPIs',
    content: 'These statistics are computed from the claims store using memoized selectors. Statistics like processing time and approval rates are crucial metrics for insurance operations at Zurich Canada.',
    zurichValue: 'Data-driven decision making',
    techUsed: 'Zustand selectors, useMemo',
    position: 'bottom',
    route: '/'
  },
  {
    id: 5,
    target: '#claims-chart',
    title: '📈 Interactive Data Visualization',
    content: 'Built with Recharts - a declarative charting library. These visualizations help Zurich adjusters identify claim trends, seasonal patterns, and potential fraud indicators through data analysis.',
    zurichValue: 'Visual analytics for insights',
    techUsed: 'Recharts, ResponsiveContainer',
    position: 'top',
    route: '/'
  },
  {
    id: 6,
    target: '#recent-claims',
    title: '📋 Optimized List Rendering',
    content: 'The claims table uses efficient rendering with proper key props and pagination. This prevents performance issues when handling thousands of claims - essential for Zurich\'s high-volume operations.',
    zurichValue: 'Performance optimization',
    techUsed: 'React keys, Pagination state',
    position: 'top',
    route: '/'
  },
  {
    id: 7,
    target: '#nav-claims',
    title: '📁 Claims CRUD Operations',
    content: 'Let\'s explore full claims management - Create, Read, Update, Delete. This showcases form handling, validation, and state persistence that mirrors real insurance claim workflows.',
    zurichValue: 'Complete business logic',
    techUsed: 'React Router, Form validation',
    position: 'right',
    route: '/',
    nextRoute: '/claims'
  },
  {
    id: 8,
    target: '#claims-filters',
    title: '🎛️ Advanced Filtering System',
    content: 'Multi-criteria filtering with status, type, priority, and date ranges. Uses compound filtering logic that adjusters at Zurich would use daily to manage their claim queues efficiently.',
    zurichValue: 'User-centric workflow design',
    techUsed: 'Array filter/reduce, URL params',
    position: 'bottom',
    route: '/claims'
  },
  {
    id: 9,
    target: '#claims-table',
    title: '📊 Enterprise Data Grid',
    content: 'Features sorting, bulk selection, action menus, and CSV export. Demonstrates handling complex UI interactions while maintaining code readability - crucial for team collaboration at Zurich.',
    zurichValue: 'Collaborative, readable code',
    techUsed: 'Complex state, Event handlers',
    position: 'top',
    route: '/claims'
  },
  {
    id: 10,
    target: '#nav-analytics',
    title: '📉 Analytics & Reporting',
    content: 'Advanced analytics with trend analysis, KPIs, and adjuster performance metrics. Shows ability to transform raw data into actionable insights for Zurich management.',
    zurichValue: 'Business intelligence',
    techUsed: 'Recharts, Data aggregation',
    position: 'right',
    route: '/claims',
    nextRoute: '/analytics'
  },
  {
    id: 11,
    target: '#analytics-overview',
    title: '🎯 Performance Dashboards',
    content: 'Real-time KPIs, approval rates, and processing trends. These metrics help Zurich managers monitor team performance and identify bottlenecks in claim processing.',
    zurichValue: 'Operational excellence',
    techUsed: 'Date-fns, Statistical calculations',
    position: 'bottom',
    route: '/analytics'
  },
  {
    id: 12,
    target: '#nav-customers',
    title: '👥 Customer Management',
    content: 'CRM functionality with customer profiles, claim history, and contact management. Demonstrates understanding of insurance customer relationships critical to Zurich\'s service.',
    zurichValue: 'Customer-first approach',
    techUsed: 'Grid/List views, Search filtering',
    position: 'right',
    route: '/analytics',
    nextRoute: '/customers'
  },
  {
    id: 13,
    target: '#nav-reports',
    title: '📄 Report Generation',
    content: 'Scheduled and on-demand reporting system. Shows understanding of insurance compliance requirements and audit trails that Zurich requires for regulatory purposes.',
    zurichValue: 'Compliance & audit trails',
    techUsed: 'Async operations, File exports',
    position: 'right',
    route: '/customers',
    nextRoute: '/reports'
  },
  {
    id: 14,
    target: '#nav-settings',
    title: '⚙️ User Preferences',
    content: 'Comprehensive settings with profile management, security options, and preferences. Demonstrates form handling best practices and attention to user experience.',
    zurichValue: 'User experience focus',
    techUsed: 'Form state, Toggle components',
    position: 'right',
    route: '/reports',
    nextRoute: '/settings'
  },
  {
    id: 15,
    target: '#nav-dashboard',
    title: '🎉 Tour Complete!',
    content: 'You\'ve seen how this dashboard demonstrates modern React development practices aligned with Zurich\'s values: clean code, scalable architecture, user-centric design, and business-focused features. Built by Nehman Rahimi.',
    zurichValue: 'Full-stack excellence',
    techUsed: 'React 19, Zustand, Recharts, Vite',
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
          
          {step.zurichValue && (
            <div className="demo-tooltip-meta">
              <div className="demo-meta-item zurich-value">
                <FiZap size={14} />
                <span><strong>Zurich Value:</strong> {step.zurichValue}</span>
              </div>
              <div className="demo-meta-item tech-used">
                <FiCode size={14} />
                <span><strong>Tech:</strong> {step.techUsed}</span>
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
