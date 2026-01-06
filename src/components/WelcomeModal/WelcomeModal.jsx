import { motion } from 'framer-motion'
import { FiPlay, FiX, FiCheck, FiArrowRight } from 'react-icons/fi'
import './WelcomeModal.css'

function WelcomeModal({ onStartDemo, onSkip }) {
  const features = [
    'Real-time claims tracking and management',
    'Advanced analytics and reporting',
    'Customer relationship management',
    'Automated workflow processing',
    'Compliance and audit trails'
  ]

  return (
    <motion.div 
      className="welcome-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="welcome-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button className="welcome-close" onClick={onSkip} aria-label="Close">
          <FiX size={20} />
        </button>

        <div className="welcome-header">
          <div className="welcome-logo">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="12" fill="#003399"/>
              <path d="M12 30C12 20.059 20.059 12 30 12C39.941 12 48 20.059 48 30C48 39.941 39.941 48 30 48C20.059 48 12 39.941 12 30Z" fill="white" fillOpacity="0.2"/>
              <path d="M30 18V42M18 30H42" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <h1>Welcome to Zurich Claims Portal</h1>
          <p className="welcome-subtitle">
            Your comprehensive insurance claims management solution for Zurich Canada
          </p>
        </div>

        <div className="welcome-content">
          <div className="welcome-features">
            <h3>What you can do:</h3>
            <ul>
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <FiCheck className="check-icon" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="welcome-stats">
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Active Claims</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">94%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.2</span>
              <span className="stat-label">Avg Days</span>
            </div>
          </div>
        </div>

        <div className="welcome-actions">
          <button className="btn btn-primary btn-lg" onClick={onStartDemo}>
            <FiPlay size={18} />
            Start Interactive Demo
          </button>
          <button className="btn btn-ghost" onClick={onSkip}>
            Skip and explore on my own
            <FiArrowRight size={16} />
          </button>
        </div>

        <div className="welcome-footer">
          <p>© 2025 Zurich Insurance Canada • Claims Management System v2.0</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeModal
