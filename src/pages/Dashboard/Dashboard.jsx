import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiFileText, 
  FiClock, 
  FiCheckCircle,
  FiAlertCircle,
  FiUpload,
  FiPlus,
  FiArrowRight,
  FiPhone,
  FiMessageSquare,
  FiEye,
  FiDollarSign
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import { format } from 'date-fns'
import ZurichLogo from '../../components/ZurichLogo/ZurichLogo'
    'Under Review': 2,
    'Approved': 3,
    'Denied': 3,
    'Paid': 4
  }
  const currentStep = statusMap[status] || 1

  return (
    <div className="claim-progress-tracker">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <StatusStep 
            key={step}
            step={index + 1}
            current={currentStep === index + 1}
            completed={currentStep > index + 1}
          />
        ))}
      </div>
      <div className="progress-labels">
        {steps.map((step, index) => (
          <span key={step} className={currentStep >= index + 1 ? 'active' : ''}>
            {step}
          </span>
        ))}
      </div>
      <div className="progress-line">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

function Dashboard() {
  const { claims, getStatistics } = useClaimsStore()
  const stats = getStatistics()

  // Get customer's claims (in real app, filtered by customer ID)
  const myClaims = useMemo(() => {
    return [...claims]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }, [claims])

  // Get active claims (not paid/denied)
  const activeClaims = useMemo(() => {
    return claims.filter(c => !['Paid', 'Denied'].includes(c.status))
  }, [claims])

  // Get claims needing action (documents, info needed)
  const needsAction = useMemo(() => {
    return claims.filter(c => c.status === 'Pending').slice(0, 3)
  }, [claims])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="dashboard customer-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back, John!</h1>
          <p className="dashboard-subtitle">Track your claims, upload documents, and get instant status updates</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/claims/new" className="btn btn-primary">
            <FiPlus size={16} />
            File New Claim
          </Link>
        </div>
      </div>

      {/* Quick Stats for Customer */}
      <motion.div 
        className="customer-stats-grid"
        id="stats-overview"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="customer-stat-card" variants={itemVariants}>
          <div className="stat-icon active">
            <FiClock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{activeClaims.length}</span>
            <span className="stat-label">Active Claims</span>
          </div>
        </motion.div>

        <motion.div className="customer-stat-card" variants={itemVariants}>
          <div className="stat-icon pending">
            <FiAlertCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{needsAction.length}</span>
            <span className="stat-label">Need Your Action</span>
          </div>
        </motion.div>

        <motion.div className="customer-stat-card" variants={itemVariants}>
          <div className="stat-icon success">
            <FiCheckCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.approved + stats.paid}</span>
            <span className="stat-label">Approved This Year</span>
          </div>
        </motion.div>

        <motion.div className="customer-stat-card" variants={itemVariants}>
          <div className="stat-icon paid">
            <FiDollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">${(stats.totalAmount / 1000).toFixed(0)}K</span>
            <span className="stat-label">Total Claimed</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="dashboard-content-grid">
        {/* My Active Claims */}
        <motion.div 
          className="card active-claims-card"
          id="recent-claims"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3 className="card-title">
              <FiFileText size={20} />
              My Active Claims
            </h3>
            <Link to="/claims" className="btn btn-ghost btn-sm">
              View All
              <FiArrowRight size={14} />
            </Link>
          </div>
          
          <div className="active-claims-list">
            {myClaims.length === 0 ? (
              <div className="empty-state">
                <FiFileText size={48} />
                <h4>No claims yet</h4>
                <p>When you file a claim, it will appear here</p>
                <Link to="/claims/new" className="btn btn-primary">
                  File Your First Claim
                </Link>
              </div>
            ) : (
              myClaims.map((claim) => (
                <motion.div 
                  key={claim.id}
                  className="active-claim-item"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="claim-header">
                    <div className="claim-info">
                      <span className="claim-number">{claim.claimNumber}</span>
                      <span className={`claim-type ${claim.claimType.toLowerCase()}`}>
                        {claim.claimType}
                      </span>
                    </div>
                    <span className={`status-badge ${claim.status.toLowerCase().replace(' ', '-')}`}>
                      {claim.status}
                    </span>
                  </div>
                  
                  <ClaimProgressTracker status={claim.status} />
                  
                  <div className="claim-details">
                    <div className="claim-detail">
                      <span className="label">Filed:</span>
                      <span className="value">{format(new Date(claim.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="claim-detail">
                      <span className="label">Amount:</span>
                      <span className="value amount">${claim.amount.toLocaleString()}</span>
                    </div>
                    <div className="claim-detail">
                      <span className="label">Last Update:</span>
                      <span className="value">{format(new Date(claim.updatedAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>

                  <div className="claim-actions">
                    <Link to={`/claims/${claim.id}`} className="btn btn-secondary btn-sm">
                      <FiEye size={14} />
                      View Details
                    </Link>
                    <button className="btn btn-ghost btn-sm">
                      <FiUpload size={14} />
                      Upload Docs
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="dashboard-sidebar">
          {/* Action Required */}
          {needsAction.length > 0 && (
            <motion.div 
              className="card action-required-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="card-header">
                <h3 className="card-title">
                  <FiAlertCircle size={20} />
                  Action Required
                </h3>
              </div>
              <div className="action-items">
                {needsAction.map((claim) => (
                  <div key={claim.id} className="action-item">
                    <div className="action-icon">
                      <FiUpload size={18} />
                    </div>
                    <div className="action-content">
                      <span className="action-title">Upload Documents</span>
                      <span className="action-claim">{claim.claimNumber}</span>
                    </div>
                    <Link to={`/claims/${claim.id}`} className="btn btn-sm btn-secondary">
                      Upload
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div 
            className="card quick-actions-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="quick-action-buttons">
              <Link to="/claims/new" className="quick-action-btn">
                <FiPlus size={20} />
                <span>File New Claim</span>
              </Link>
              <Link to="/claims" className="quick-action-btn">
                <FiFileText size={20} />
                <span>View All Claims</span>
              </Link>
              <button className="quick-action-btn">
                <FiUpload size={20} />
                <span>Upload Documents</span>
              </button>
            </div>
          </motion.div>

          {/* Need Help? */}
          <motion.div 
            className="card help-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="help-content">
              <ZurichLogo variant="icon" size="small" className="help-logo" />
              <h4>Need Help?</h4>
              <p>Our Zurich team is available 24/7 to assist you with your claims.</p>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Self-Service Benefits */}
          <motion.div 
            className="card benefits-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4>Why Self-Service?</h4>
            <ul className="benefits-list">
              <li>
                <FiCheckCircle size={16} />
                <span>Track claims 24/7 without waiting on hold</span>
              </li>
              <li>
                <FiCheckCircle size={16} />
                <span>Upload documents securely from anywhere</span>
              </li>
              <li>
                <FiCheckCircle size={16} />
                <span>Get instant notifications on status changes</span>
              </li>
              <li>
                <FiCheckCircle size={16} />
                <span>View complete claim history at a glance</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
