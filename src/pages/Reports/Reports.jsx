import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiDownload, 
  FiCalendar, 
  FiFileText,
  FiPieChart,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiRefreshCw
} from 'react-icons/fi'
import { useClaimsStore } from '../../store/claimsStore'
import { format } from 'date-fns'
import './Reports.css'

const reportTemplates = [
  {
    id: 'claims-summary',
    title: 'Claims Summary Report',
    description: 'Overview of all claims including status distribution, amounts, and trends',
    icon: FiFileText,
    category: 'Claims'
  },
  {
    id: 'financial-overview',
    title: 'Financial Overview',
    description: 'Detailed financial analysis of claims payments and reserves',
    icon: FiDollarSign,
    category: 'Financial'
  },
  {
    id: 'adjuster-performance',
    title: 'Adjuster Performance',
    description: 'Performance metrics for claims adjusters including processing times',
    icon: FiUsers,
    category: 'Performance'
  },
  {
    id: 'trend-analysis',
    title: 'Trend Analysis',
    description: 'Historical trends and forecasting for claims volume and amounts',
    icon: FiTrendingUp,
    category: 'Analytics'
  },
  {
    id: 'processing-time',
    title: 'Processing Time Report',
    description: 'Analysis of claim processing times by type, priority, and adjuster',
    icon: FiClock,
    category: 'Performance'
  },
  {
    id: 'customer-insights',
    title: 'Customer Insights',
    description: 'Customer analytics including satisfaction scores and claim patterns',
    icon: FiPieChart,
    category: 'Analytics'
  }
]

function Reports() {
  const { claims, getStatistics } = useClaimsStore()
  const stats = getStatistics()
  const [selectedReport, setSelectedReport] = useState(null)
  const [dateRange, setDateRange] = useState('last30')
  const [generating, setGenerating] = useState(false)

  const handleGenerateReport = async (reportId) => {
    setGenerating(true)
    setSelectedReport(reportId)
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setGenerating(false)
    
    // In real app, this would trigger a download
    alert(`Report "${reportTemplates.find(r => r.id === reportId)?.title}" generated successfully!`)
  }

  const recentReports = [
    { name: 'Claims Summary - Dec 2025', date: '2025-12-28', size: '2.4 MB', type: 'PDF' },
    { name: 'Financial Overview Q4 2025', date: '2025-12-15', size: '1.8 MB', type: 'Excel' },
    { name: 'Monthly Performance Report', date: '2025-12-01', size: '3.1 MB', type: 'PDF' },
    { name: 'Customer Satisfaction Survey', date: '2025-11-30', size: '890 KB', type: 'PDF' }
  ]

  const quickStats = [
    { label: 'Total Claims', value: stats.total, change: '+12%' },
    { label: 'Total Amount', value: `$${(stats.totalAmount / 1000000).toFixed(1)}M`, change: '+8%' },
    { label: 'Avg Processing', value: `${stats.avgProcessingTime} days`, change: '-15%' },
    { label: 'Satisfaction', value: `${stats.satisfactionRate}%`, change: '+2%' }
  ]

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p className="reports-subtitle">Generate and download detailed reports</p>
        </div>
        <div className="reports-actions">
          <select 
            className="filter-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="thisYear">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="btn btn-secondary">
            <FiCalendar size={16} />
            Select Dates
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        {quickStats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="quick-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
            <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Report Templates */}
      <div className="section">
        <h2>Generate New Report</h2>
        <p className="section-desc">Select a report template to generate</p>
        
        <div className="report-templates">
          {reportTemplates.map((report, index) => (
            <motion.div 
              key={report.id}
              className={`report-template ${selectedReport === report.id && generating ? 'generating' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="template-icon">
                <report.icon size={24} />
              </div>
              <div className="template-info">
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <span className="template-category">{report.category}</span>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleGenerateReport(report.id)}
                disabled={generating}
              >
                {selectedReport === report.id && generating ? (
                  <>
                    <FiRefreshCw size={14} className="spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FiDownload size={14} />
                    Generate
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="section">
        <h2>Recent Reports</h2>
        <p className="section-desc">Previously generated reports</p>
        
        <div className="table-card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Generated</th>
                  <th>Size</th>
                  <th>Format</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index}>
                    <td>
                      <div className="report-name">
                        <FiFileText size={18} />
                        <span>{report.name}</span>
                      </div>
                    </td>
                    <td>{format(new Date(report.date), 'MMM dd, yyyy')}</td>
                    <td>{report.size}</td>
                    <td>
                      <span className={`badge badge-${report.type === 'PDF' ? 'danger' : 'success'}`}>
                        {report.type}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <FiDownload size={14} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2>Scheduled Reports</h2>
            <p className="section-desc">Automatically generated reports</p>
          </div>
          <button className="btn btn-secondary btn-sm">
            <FiCalendar size={14} />
            New Schedule
          </button>
        </div>
        
        <div className="scheduled-reports">
          <div className="scheduled-item">
            <div className="schedule-info">
              <h4>Weekly Claims Summary</h4>
              <p>Every Monday at 9:00 AM • Email to team@zurich.ca</p>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="scheduled-item">
            <div className="schedule-info">
              <h4>Monthly Financial Report</h4>
              <p>1st of each month at 8:00 AM • Email to finance@zurich.ca</p>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="scheduled-item">
            <div className="schedule-info">
              <h4>Quarterly Performance Review</h4>
              <p>End of quarter • Email to management@zurich.ca</p>
            </div>
            <span className="badge badge-warning">Paused</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
