import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, 
  FiSave, 
  FiX,
  FiUser,
  FiFileText,
  FiDollarSign,
  FiMapPin,
  FiUpload,
  FiCheck
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import './NewClaim.css'

const claimTypes = ['Auto', 'Property', 'Liability', 'Health', 'Life', 'Travel']
const priorities = ['Low', 'Medium', 'High', 'Critical']

function NewClaim() {
  const navigate = useNavigate()
  const { addClaim } = useClaimsStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    policyNumber: '',
    claimType: '',
    priority: 'Medium',
    amount: '',
    estimatedAmount: '',
    description: '',
    incidentDate: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required'
      if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) newErrors.customerEmail = 'Invalid email format'
      if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone is required'
      if (!formData.policyNumber.trim()) newErrors.policyNumber = 'Policy number is required'
    }

    if (step === 2) {
      if (!formData.claimType) newErrors.claimType = 'Claim type is required'
      if (!formData.amount) newErrors.amount = 'Claim amount is required'
      if (!formData.incidentDate) newErrors.incidentDate = 'Incident date is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.province.trim()) newErrors.province = 'Province is required'
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    addClaim({
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      policyNumber: formData.policyNumber,
      claimType: formData.claimType,
      priority: formData.priority,
      amount: parseFloat(formData.amount),
      estimatedAmount: parseFloat(formData.estimatedAmount) || parseFloat(formData.amount),
      description: formData.description,
      incidentDate: formData.incidentDate,
      status: 'Pending',
      adjuster: 'Unassigned',
      documents: 0,
      notes: 0,
      location: {
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode
      }
    })

    setIsSubmitting(false)
    navigate('/claims')
  }

  const steps = [
    { number: 1, title: 'Customer Info', icon: FiUser },
    { number: 2, title: 'Claim Details', icon: FiFileText },
    { number: 3, title: 'Location', icon: FiMapPin },
    { number: 4, title: 'Review', icon: FiCheck }
  ]

  return (
    <div className="new-claim-page">
      <div className="new-claim-header">
        <Link to="/claims" className="back-link">
          <FiArrowLeft size={20} />
          Back to Claims
        </Link>
        <h1>Submit New Claim</h1>
        <p>Complete the form below to submit a new insurance claim</p>
      </div>

      {/* Progress Steps */}
      <div className="form-progress">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
          >
            <div className="step-indicator">
              {currentStep > step.number ? (
                <FiCheck size={18} />
              ) : (
                <step.icon size={18} />
              )}
            </div>
            <span className="step-title">{step.title}</span>
            {index < steps.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="claim-form">
        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <motion.div 
            className="form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="form-section">
              <h2>
                <FiUser size={20} />
                Customer Information
              </h2>
              <p className="section-desc">Enter the policyholder's contact information</p>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={`form-input ${errors.customerName ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.customerName && <span className="error-message">{errors.customerName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className={`form-input ${errors.customerEmail ? 'error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.customerEmail && <span className="error-message">{errors.customerEmail}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className={`form-input ${errors.customerPhone ? 'error' : ''}`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.customerPhone && <span className="error-message">{errors.customerPhone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Policy Number *</label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.policyNumber ? 'error' : ''}`}
                    placeholder="POL-123456"
                  />
                  {errors.policyNumber && <span className="error-message">{errors.policyNumber}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Claim Details */}
        {currentStep === 2 && (
          <motion.div 
            className="form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="form-section">
              <h2>
                <FiFileText size={20} />
                Claim Details
              </h2>
              <p className="section-desc">Provide details about the claim</p>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Claim Type *</label>
                  <select
                    name="claimType"
                    value={formData.claimType}
                    onChange={handleChange}
                    className={`form-select ${errors.claimType ? 'error' : ''}`}
                  >
                    <option value="">Select type...</option>
                    {claimTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.claimType && <span className="error-message">{errors.claimType}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {priorities.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Claim Amount ($) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`form-input ${errors.amount ? 'error' : ''}`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  {errors.amount && <span className="error-message">{errors.amount}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Incident Date *</label>
                  <input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    className={`form-input ${errors.incidentDate ? 'error' : ''}`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.incidentDate && <span className="error-message">{errors.incidentDate}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'error' : ''}`}
                    placeholder="Provide a detailed description of the incident..."
                    rows={4}
                  />
                  {errors.description && <span className="error-message">{errors.description}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <motion.div 
            className="form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="form-section">
              <h2>
                <FiMapPin size={20} />
                Incident Location
              </h2>
              <p className="section-desc">Where did the incident occur?</p>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="Toronto"
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Province *</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={`form-select ${errors.province ? 'error' : ''}`}
                  >
                    <option value="">Select province...</option>
                    <option value="ON">Ontario</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                    <option value="QC">Quebec</option>
                    <option value="MB">Manitoba</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="YT">Yukon</option>
                    <option value="NU">Nunavut</option>
                  </select>
                  {errors.province && <span className="error-message">{errors.province}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`form-input ${errors.postalCode ? 'error' : ''}`}
                    placeholder="A1B 2C3"
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <motion.div 
            className="form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="form-section">
              <h2>
                <FiCheck size={20} />
                Review & Submit
              </h2>
              <p className="section-desc">Please review your claim details before submitting</p>

              <div className="review-sections">
                <div className="review-section">
                  <h3>Customer Information</h3>
                  <div className="review-grid">
                    <div className="review-item">
                      <label>Name</label>
                      <span>{formData.customerName}</span>
                    </div>
                    <div className="review-item">
                      <label>Email</label>
                      <span>{formData.customerEmail}</span>
                    </div>
                    <div className="review-item">
                      <label>Phone</label>
                      <span>{formData.customerPhone}</span>
                    </div>
                    <div className="review-item">
                      <label>Policy #</label>
                      <span>{formData.policyNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Claim Details</h3>
                  <div className="review-grid">
                    <div className="review-item">
                      <label>Type</label>
                      <span>{formData.claimType}</span>
                    </div>
                    <div className="review-item">
                      <label>Priority</label>
                      <span>{formData.priority}</span>
                    </div>
                    <div className="review-item">
                      <label>Amount</label>
                      <span>${parseFloat(formData.amount).toLocaleString()}</span>
                    </div>
                    <div className="review-item">
                      <label>Incident Date</label>
                      <span>{formData.incidentDate}</span>
                    </div>
                  </div>
                  <div className="review-item full-width">
                    <label>Description</label>
                    <p>{formData.description}</p>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Location</h3>
                  <div className="review-item full-width">
                    <label>Address</label>
                    <span>
                      {formData.address}, {formData.city}, {formData.province} {formData.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={handleBack}>
              <FiArrowLeft size={16} />
              Back
            </button>
          )}
          
          <div className="actions-right">
            <Link to="/claims" className="btn btn-ghost">
              <FiX size={16} />
              Cancel
            </Link>
            
            {currentStep < 4 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Continue
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Submit Claim
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewClaim
