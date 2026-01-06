import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiSearch, 
  FiPlus, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiFileText,
  FiDollarSign,
  FiUser,
  FiMoreVertical
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import './Customers.css'

function Customers() {
  const { claims } = useClaimsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  // Extract unique customers from claims
  const customers = useMemo(() => {
    const customerMap = {}
    
    claims.forEach(claim => {
      if (!customerMap[claim.customerEmail]) {
        customerMap[claim.customerEmail] = {
          id: claim.customerEmail,
          name: claim.customerName,
          email: claim.customerEmail,
          phone: claim.customerPhone,
          location: claim.location,
          claims: [],
          totalAmount: 0
        }
      }
      customerMap[claim.customerEmail].claims.push(claim)
      customerMap[claim.customerEmail].totalAmount += claim.amount
    })
    
    return Object.values(customerMap)
  }, [claims])

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers
    
    const query = searchQuery.toLowerCase()
    return customers.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query)
    )
  }, [customers, searchQuery])

  return (
    <div className="customers-page">
      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p className="customers-subtitle">
            Manage customer relationships • {customers.length} total customers
          </p>
        </div>
        <div className="customers-actions">
          <button className="btn btn-primary">
            <FiPlus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-bar-container">
        <div className="search-bar">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      {viewMode === 'grid' ? (
        <div className="customers-grid">
          {filteredCustomers.map((customer, index) => (
            <motion.div 
              key={customer.id}
              className="customer-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="customer-card-header">
                <div className="customer-avatar">
                  {customer.name.charAt(0)}
                </div>
                <button className="more-btn">
                  <FiMoreVertical size={16} />
                </button>
              </div>

              <div className="customer-info">
                <h3>{customer.name}</h3>
                <div className="contact-item">
                  <FiMail size={14} />
                  <span>{customer.email}</span>
                </div>
                <div className="contact-item">
                  <FiPhone size={14} />
                  <span>{customer.phone}</span>
                </div>
                <div className="contact-item">
                  <FiMapPin size={14} />
                  <span>{customer.location.city}, {customer.location.province}</span>
                </div>
              </div>

              <div className="customer-stats">
                <div className="stat">
                  <FiFileText size={14} />
                  <span>{customer.claims.length} claims</span>
                </div>
                <div className="stat">
                  <FiDollarSign size={14} />
                  <span>${customer.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="customer-actions">
                <Link 
                  to={`/claims?search=${encodeURIComponent(customer.email)}`} 
                  className="btn btn-secondary btn-sm"
                >
                  View Claims
                </Link>
                <button className="btn btn-ghost btn-sm">
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="table-card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Claims</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar small">
                          {customer.name.charAt(0)}
                        </div>
                        <span>{customer.name}</span>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.location.city}, {customer.location.province}</td>
                    <td>{customer.claims.length}</td>
                    <td className="amount">${customer.totalAmount.toLocaleString()}</td>
                    <td>
                      <Link 
                        to={`/claims?search=${encodeURIComponent(customer.email)}`}
                        className="btn btn-ghost btn-sm"
                      >
                        View Claims
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="empty-state">
          <FiUser size={48} />
          <h3>No customers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}

export default Customers
