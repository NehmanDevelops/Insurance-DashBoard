import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiDownload,
  FiFileText,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiPaperclip,
  FiPlus
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import { format } from 'date-fns'
import './ClaimDetails.css'

function ClaimDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getClaimById, updateClaim, deleteClaim } = useClaimsStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [newNote, setNewNote] = useState('')

  const claim = getClaimById(id)

  if (!claim) {
    return (
      <div className="claim-not-found">
        <FiAlertCircle size={48} />
        <h2>Claim Not Found</h2>
        <p>The claim you're looking for doesn't exist or has been deleted.</p>
        <Link to="/claims" className="btn btn-primary">
          Back to Claims
        </Link>
      </div>
    )
  }

  const handleStatusUpdate = (newStatus) => {
    updateClaim(id, { 
      status: newStatus,
      timeline: [
        ...claim.timeline,
        {
          date: new Date().toISOString(),
          event: `Status changed to ${newStatus}`,
          user: 'Current User'
        }
      ]
    })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this claim? This action cannot be undone.')) {
      deleteClaim(id)
      navigate('/claims')
    }
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return
    
    updateClaim(id, {
      timeline: [
        ...claim.timeline,
        {
          date: new Date().toISOString(),
          event: newNote,
          user: 'Current User',
          type: 'note'
        }
      ]
    })
    setNewNote('')
  }

  const statusOptions = ['Pending', 'Under Review', 'Approved', 'Denied', 'Paid']

  return (
    <div className="claim-details-page">
      {/* Header */}
      <div className="claim-details-header">
        <div className="header-left">
          <Link to="/claims" className="back-link">
            <FiArrowLeft size={20} />
            Back to Claims
          </Link>
          <div className="claim-title">
            <h1>{claim.claimNumber}</h1>
            <span className={`badge badge-lg badge-${getStatusColor(claim.status)}`}>
              {claim.status}
            </span>
          </div>
          <p className="claim-meta">
            Created on {format(new Date(claim.createdAt), 'MMMM dd, yyyy')} • 
            Last updated {format(new Date(claim.updatedAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FiDownload size={16} />
            Export
          </button>
          <button className="btn btn-secondary">
            <FiEdit size={16} />
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="claim-tabs">
        {['overview', 'documents', 'timeline', 'notes'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="claim-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div 
            className="overview-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Claim Info Card */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiFileText size={18} />
                  Claim Information
                </h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>Claim Type</label>
                  <span className="badge badge-neutral">{claim.claimType}</span>
                </div>
                <div className="info-item">
                  <label>Priority</label>
                  <span className={`badge badge-${getPriorityColor(claim.priority)}`}>
                    {claim.priority}
                  </span>
                </div>
                <div className="info-item">
                  <label>Policy Number</label>
                  <span>{claim.policyNumber}</span>
                </div>
                <div className="info-item">
                  <label>Incident Date</label>
                  <span>{format(new Date(claim.incidentDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="info-item full-width">
                  <label>Description</label>
                  <p>{claim.description}</p>
                </div>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiUser size={18} />
                  Customer Information
                </h3>
              </div>
              <div className="customer-info">
                <div className="customer-avatar">
                  {claim.customerName.charAt(0)}
                </div>
                <div className="customer-details">
                  <h4>{claim.customerName}</h4>
                  <div className="contact-item">
                    <FiMail size={14} />
                    {claim.customerEmail}
                  </div>
                  <div className="contact-item">
                    <FiPhone size={14} />
                    {claim.customerPhone}
                  </div>
                  <div className="contact-item">
                    <FiMapPin size={14} />
                    {claim.location.address}, {claim.location.city}, {claim.location.province} {claim.location.postalCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Info Card */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiDollarSign size={18} />
                  Financial Details
                </h3>
              </div>
              <div className="financial-grid">
                <div className="financial-item">
                  <label>Claim Amount</label>
                  <span className="amount">${claim.amount.toLocaleString()}</span>
                </div>
                <div className="financial-item">
                  <label>Estimated Amount</label>
                  <span className="amount">${claim.estimatedAmount.toLocaleString()}</span>
                </div>
                <div className="financial-item">
                  <label>Deductible</label>
                  <span>$500</span>
                </div>
                <div className="financial-item">
                  <label>Coverage Limit</label>
                  <span>$100,000</span>
                </div>
              </div>
            </div>

            {/* Status Update Card */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiClock size={18} />
                  Update Status
                </h3>
              </div>
              <div className="status-update">
                <p className="status-current">Current Status: <strong>{claim.status}</strong></p>
                <div className="status-buttons">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className={`btn btn-sm ${claim.status === status ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleStatusUpdate(status)}
                      disabled={claim.status === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Adjuster Info Card */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiUser size={18} />
                  Assigned Adjuster
                </h3>
              </div>
              <div className="adjuster-info">
                <div className="adjuster-avatar">
                  {claim.adjuster.charAt(0)}
                </div>
                <div className="adjuster-details">
                  <h4>{claim.adjuster}</h4>
                  <p>Senior Claims Adjuster</p>
                  <p>License #: ADJ-2024-001</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card info-card">
              <div className="card-header">
                <h3 className="card-title">
                  <FiCheckCircle size={18} />
                  Claim Progress
                </h3>
              </div>
              <div className="progress-stats">
                <div className="progress-item">
                  <span className="progress-label">Documents</span>
                  <span className="progress-value">{claim.documents} uploaded</span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Notes</span>
                  <span className="progress-value">{claim.notes} added</span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Days Open</span>
                  <span className="progress-value">
                    {Math.floor((new Date() - new Date(claim.createdAt)) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div 
            className="card timeline-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card-header">
              <h3 className="card-title">Activity Timeline</h3>
            </div>
            <div className="timeline">
              {[...claim.timeline].reverse().map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <FiCheckCircle size={16} />
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-event">{event.event}</p>
                    <div className="timeline-meta">
                      <span>{format(new Date(event.date), 'MMM dd, yyyy h:mm a')}</span>
                      <span>by {event.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <motion.div 
            className="card documents-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card-header">
              <h3 className="card-title">Documents</h3>
              <button className="btn btn-primary btn-sm">
                <FiPlus size={14} />
                Upload Document
              </button>
            </div>
            <div className="documents-list">
              {Array.from({ length: claim.documents }, (_, i) => (
                <div key={i} className="document-item">
                  <FiPaperclip size={18} />
                  <div className="document-info">
                    <span className="document-name">Document_{i + 1}.pdf</span>
                    <span className="document-meta">Uploaded on {format(new Date(claim.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    <FiDownload size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <motion.div 
            className="card notes-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card-header">
              <h3 className="card-title">Notes & Comments</h3>
            </div>
            <div className="add-note">
              <textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="form-textarea"
              />
              <button className="btn btn-primary" onClick={handleAddNote}>
                <FiMessageSquare size={16} />
                Add Note
              </button>
            </div>
            <div className="notes-list">
              {claim.timeline
                .filter(t => t.type === 'note')
                .reverse()
                .map((note, index) => (
                  <div key={index} className="note-item">
                    <div className="note-header">
                      <span className="note-author">{note.user}</span>
                      <span className="note-date">{format(new Date(note.date), 'MMM dd, yyyy h:mm a')}</span>
                    </div>
                    <p className="note-content">{note.event}</p>
                  </div>
                ))}
              {claim.timeline.filter(t => t.type === 'note').length === 0 && (
                <p className="no-notes">No notes yet. Add the first note above.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function getStatusColor(status) {
  const colors = {
    'Pending': 'warning',
    'Under Review': 'info',
    'Approved': 'success',
    'Denied': 'danger',
    'Paid': 'success'
  }
  return colors[status] || 'neutral'
}

function getPriorityColor(priority) {
  const colors = {
    'Low': 'neutral',
    'Medium': 'info',
    'High': 'warning',
    'Critical': 'danger'
  }
  return colors[priority] || 'neutral'
}

export default ClaimDetails
