import { motion } from 'framer-motion'
import { FiPlay, FiX, FiCheck, FiArrowRight, FiCode, FiGithub, FiPhone, FiClock, FiUpload, FiShield } from 'react-icons/fi'
import './WelcomeModal.css'

function WelcomeModal({ onStartDemo, onSkip }) {
  const features = [
    'Track your claim status in real-time — no phone calls needed',
    'Upload supporting documents securely from anywhere',
    'Get instant notifications when your claim status changes',
    'View your complete claims history at a glance',
    'File new claims 24/7 without waiting on hold',
    'Access detailed timelines showing every step of your claim',
    'Mobile-friendly — check your claims from any device'
  ]

  const benefits = [
    { icon: FiPhone, title: 'Reduce Call Wait Times', desc: 'Self-service reduces call center volume by 40%' },
    { icon: FiClock, title: '24/7 Access', desc: 'Check your claim status anytime, anywhere' },
    { icon: FiUpload, title: 'Easy Document Upload', desc: 'Drag & drop supporting documents securely' },
    { icon: FiShield, title: 'Secure & Private', desc: 'Bank-level encryption protects your data' }
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

        {/* TLDR Banner */}
        <motion.div 
          className="tldr-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FiCode className="tldr-icon" />
          <div className="tldr-content">
            <span className="tldr-label">TL;DR</span>
            <span className="tldr-text">MADE BY <strong>NEHMAN RAHIMI</strong> TO CONTRIBUTE TO <strong>ZURICH CANADA</strong></span>
          </div>
          <a 
            href="https://github.com/NehmanDevelops/Insurance-DashBoard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tldr-github"
          >
            <FiGithub size={18} />
          </a>
        </motion.div>

        <div className="welcome-header">
          <div className="welcome-logo">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="12" fill="#003399"/>
              <path d="M12 30C12 20.059 20.059 12 30 12C39.941 12 48 20.059 48 30C48 39.941 39.941 48 30 48C20.059 48 12 39.941 12 30Z" fill="white" fillOpacity="0.2"/>
              <path d="M30 18V42M18 30H42" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <h1>Customer Claims Portal</h1>
          <p className="welcome-subtitle">
            Track your insurance claims, upload documents, and get real-time status updates — all without making a phone call
          </p>
        </div>

        <div className="welcome-content">
          <div className="welcome-features">
            <h3>🎯 What You Can Do Here:</h3>
            <ul>
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                >
                  <FiCheck className="check-icon" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="welcome-benefits">
            <h3>💡 Why Self-Service?</h3>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  className="benefit-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <benefit.icon className="benefit-icon" size={24} />
                  <span className="benefit-title">{benefit.title}</span>
                  <span className="benefit-desc">{benefit.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="zurich-values">
          <h3>📊 The Problem We're Solving:</h3>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-title">40% of Calls</span>
              <span className="value-desc">Are customers asking "Where's my claim?"</span>
            </div>
            <div className="value-item">
              <span className="value-title">15 min Avg Wait</span>
              <span className="value-desc">Average hold time for claim status</span>
            </div>
            <div className="value-item">
              <span className="value-title">$8-12 per Call</span>
              <span className="value-desc">Cost to handle each status inquiry</span>
            </div>
            <div className="value-item">
              <span className="value-title">24/7 Demand</span>
              <span className="value-desc">Customers want access outside business hours</span>
            </div>
          </div>
        </div>

        <div className="welcome-actions">
          <button className="btn btn-primary btn-lg" onClick={onStartDemo}>
            <FiPlay size={18} />
            See How It Works
          </button>
          <button className="btn btn-ghost" onClick={onSkip}>
            Skip and explore the portal
            <FiArrowRight size={16} />
          </button>
        </div>

        <div className="welcome-footer">
          <p>Built with ❤️ by Nehman Rahimi • A Self-Service Solution for Zurich Canada • January 2026</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeModal
