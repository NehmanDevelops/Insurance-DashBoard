import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiX
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import { format } from 'date-fns'
import './Claims.css'

const ITEMS_PER_PAGE = 10

function Claims() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { 
    getFilteredClaims, 
    filters, 
    setFilter, 
    resetFilters,
    sortBy,
    sortOrder,
    setSorting,
    deleteClaim 
  } = useClaimsStore()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedClaims, setSelectedClaims] = useState([])
  const [actionMenuOpen, setActionMenuOpen] = useState(null)

  // Initialize filters from URL params
  useState(() => {
    const status = searchParams.get('status')
    if (status) {
      setFilter('status', status)
    }
  }, [searchParams])

  const filteredClaims = getFilteredClaims()
  const totalPages = Math.ceil(filteredClaims.length / ITEMS_PER_PAGE)
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSort = (field) => {
    if (sortBy === field) {
      setSorting(field, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSorting(field, 'desc')
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClaims(paginatedClaims.map(c => c.id))
    } else {
      setSelectedClaims([])
    }
  }

  const handleSelectClaim = (id) => {
    if (selectedClaims.includes(id)) {
      setSelectedClaims(selectedClaims.filter(c => c !== id))
    } else {
      setSelectedClaims([...selectedClaims, id])
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      deleteClaim(id)
      setActionMenuOpen(null)
    }
  }

  const handleExport = () => {
    const csv = [
      ['Claim ID', 'Customer', 'Type', 'Status', 'Amount', 'Date'].join(','),
      ...filteredClaims.map(c => [
        c.claimNumber,
        c.customerName,
        c.claimType,
        c.status,
        c.amount,
        format(new Date(c.createdAt), 'yyyy-MM-dd')
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `claims-export-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all' && v !== '').length

  return (
    <div className="claims-page">
      <div className="claims-header">
        <div>
          <h1>Claims Management</h1>
          <p className="claims-subtitle">
            Manage and track all insurance claims • {filteredClaims.length} total claims
          </p>
        </div>
        <div className="claims-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <FiDownload size={16} />
            Export
          </button>
          <Link to="/claims/new" className="btn btn-primary">
            <FiPlus size={16} />
            New Claim
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar" id="claims-filters">
        <div className="search-filter">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search by claim ID, customer, or policy..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="search-input"
          />
          {filters.search && (
            <button 
              className="clear-search"
              onClick={() => setFilter('search', '')}
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
            <option value="Paid">Paid</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="Auto">Auto</option>
            <option value="Property">Property</option>
            <option value="Liability">Liability</option>
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Travel">Travel</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilter('priority', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          {activeFiltersCount > 0 && (
            <button 
              className="btn btn-ghost btn-sm"
              onClick={resetFilters}
            >
              <FiRefreshCw size={14} />
              Clear ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedClaims.length > 0 && (
          <motion.div 
            className="bulk-actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span>{selectedClaims.length} claims selected</span>
            <div className="bulk-buttons">
              <button className="btn btn-sm btn-secondary">Bulk Update Status</button>
              <button className="btn btn-sm btn-secondary">Assign Adjuster</button>
              <button className="btn btn-sm btn-danger">Delete Selected</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Claims Table */}
      <div className="table-card" id="claims-table">
        <div className="table-container">
          <table className="table claims-table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedClaims.length === paginatedClaims.length && paginatedClaims.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th onClick={() => handleSort('claimNumber')} className="sortable">
                  Claim ID
                  {sortBy === 'claimNumber' && (
                    sortOrder === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                  )}
                </th>
                <th onClick={() => handleSort('customerName')} className="sortable">
                  Customer
                  {sortBy === 'customerName' && (
                    sortOrder === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                  )}
                </th>
                <th>Policy #</th>
                <th>Type</th>
                <th onClick={() => handleSort('amount')} className="sortable">
                  Amount
                  {sortBy === 'amount' && (
                    sortOrder === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                  )}
                </th>
                <th>Priority</th>
                <th>Status</th>
                <th>Adjuster</th>
                <th onClick={() => handleSort('createdAt')} className="sortable">
                  Date
                  {sortBy === 'createdAt' && (
                    sortOrder === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClaims.map((claim) => (
                <motion.tr 
                  key={claim.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={selectedClaims.includes(claim.id) ? 'selected' : ''}
                >
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedClaims.includes(claim.id)}
                      onChange={() => handleSelectClaim(claim.id)}
                    />
                  </td>
                  <td>
                    <Link to={`/claims/${claim.id}`} className="claim-link">
                      {claim.claimNumber}
                    </Link>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <span className="customer-name">{claim.customerName}</span>
                      <span className="customer-email">{claim.customerEmail}</span>
                    </div>
                  </td>
                  <td className="policy-number">{claim.policyNumber}</td>
                  <td>
                    <span className="badge badge-neutral">{claim.claimType}</span>
                  </td>
                  <td className="amount">${claim.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${getPriorityColor(claim.priority)}`}>
                      {claim.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="adjuster">{claim.adjuster}</td>
                  <td className="date">{format(new Date(claim.createdAt), 'MMM dd, yyyy')}</td>
                  <td className="actions-cell">
                    <div className="action-menu-wrapper">
                      <button 
                        className="action-menu-btn"
                        onClick={() => setActionMenuOpen(actionMenuOpen === claim.id ? null : claim.id)}
                      >
                        <FiMoreVertical size={16} />
                      </button>
                      
                      <AnimatePresence>
                        {actionMenuOpen === claim.id && (
                          <motion.div 
                            className="action-menu"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <Link to={`/claims/${claim.id}`} className="action-item">
                              <FiEye size={14} />
                              View Details
                            </Link>
                            <Link to={`/claims/${claim.id}?edit=true`} className="action-item">
                              <FiEdit size={14} />
                              Edit Claim
                            </Link>
                            <button 
                              className="action-item danger"
                              onClick={() => handleDelete(claim.id)}
                            >
                              <FiTrash2 size={14} />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredClaims.length === 0 && (
          <div className="empty-state">
            <FiSearch size={48} />
            <h3>No claims found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button className="btn btn-primary" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredClaims.length > 0 && (
          <div className="pagination">
            <div className="pagination-info">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredClaims.length)} of {filteredClaims.length} claims
            </div>
            <div className="pagination-controls">
              <button
                className="btn btn-ghost btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                className="btn btn-ghost btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
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

export default Claims
