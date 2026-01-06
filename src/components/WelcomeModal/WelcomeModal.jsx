import { motion } from 'framer-motion'
import { FiPlay, FiX, FiCheck, FiArrowRight, FiCode, FiGithub } from 'react-icons/fi'
import './WelcomeModal.css'

function WelcomeModal({ onStartDemo, onSkip }) {
  const features = [
    'Real-time claims tracking and management',
    'Advanced analytics with Recharts visualization',
    'Customer relationship management (CRM)',
    'Zustand state management for enterprise scalability',
    'React Query for efficient data fetching',
    'Framer Motion animations for modern UX',
    'Fully responsive design with CSS Grid/Flexbox'
  ]

  const techStack = [
    { name: 'React 19', desc: 'Latest React with hooks' },
    { name: 'Zustand', desc: 'Lightweight state management' },
    { name: 'React Query', desc: 'Server state management' },
    { name: 'Recharts', desc: 'Data visualization' },
    { name: 'Framer Motion', desc: 'Smooth animations' },
    { name: 'Vite', desc: 'Fast build tooling' }
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
          <h1>Zurich Claims Portal</h1>
          <p className="welcome-subtitle">
            Enterprise-grade Insurance Claims Management System demonstrating modern React development practices
          </p>
        </div>

        <div className="welcome-content">
          <div className="welcome-features">
            <h3>🎯 What This Dashboard Showcases:</h3>
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

          <div className="welcome-tech">
            <h3>🛠️ Tech Stack Used:</h3>
            <div className="tech-grid">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-desc">{tech.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="zurich-values">
          <h3>💼 Aligned with Zurich's Developer Values:</h3>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-title">Clean Code</span>
              <span className="value-desc">Modular, maintainable architecture</span>
            </div>
            <div className="value-item">
              <span className="value-title">User-Centric</span>
              <span className="value-desc">Intuitive UX with accessibility</span>
            </div>
            <div className="value-item">
              <span className="value-title">Scalable</span>
              <span className="value-desc">Enterprise-ready patterns</span>
            </div>
            <div className="value-item">
              <span className="value-title">Innovative</span>
              <span className="value-desc">Latest React 19 features</span>
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
          <p>Built with ❤️ by Nehman Rahimi for Zurich Canada • January 2026</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeModal
