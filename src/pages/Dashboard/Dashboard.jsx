import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiFileText, 
  FiClock, 
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiUsers,
  FiPlus,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useClaimsStore } from '../../store/claimsStore'
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import './Dashboard.css'

const COLORS = ['#003399', '#0066CC', '#10B981', '#F59E0B', '#EF4444']

function Dashboard() {
  const { claims, getStatistics } = useClaimsStore()
  const stats = getStatistics()

  // Generate chart data
  const claimsOverTime = useMemo(() => {
    const last30Days = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date()
    })

    return last30Days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd')
      const dayClaims = claims.filter(c => 
        format(new Date(c.createdAt), 'yyyy-MM-dd') === dayStr
      )
      return {
        date: format(day, 'MMM dd'),
        claims: dayClaims.length,
        amount: dayClaims.reduce((sum, c) => sum + c.amount, 0) / 1000
      }
    })
  }, [claims])

  const claimsByType = useMemo(() => {
    const types = {}
    claims.forEach(claim => {
      types[claim.claimType] = (types[claim.claimType] || 0) + 1
    })
    return Object.entries(types).map(([name, value]) => ({ name, value }))
  }, [claims])

  const claimsByStatus = useMemo(() => {
    return [
      { name: 'Pending', value: stats.pending, color: '#F59E0B' },
      { name: 'Under Review', value: stats.underReview, color: '#3B82F6' },
      { name: 'Approved', value: stats.approved, color: '#10B981' },
      { name: 'Denied', value: stats.denied, color: '#EF4444' },
      { name: 'Paid', value: stats.paid, color: '#003399' },
    ]
  }, [stats])

  const recentClaims = useMemo(() => {
    return [...claims]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }, [claims])

  const monthlyComparison = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, index) => {
      const monthClaims = claims.filter(c => new Date(c.createdAt).getMonth() === index)
      return {
        month,
        claims: monthClaims.length,
        amount: monthClaims.reduce((sum, c) => sum + c.amount, 0) / 1000
      }
    })
  }, [claims])

  const statCards = [
    {
      title: 'Total Claims',
      value: stats.total,
      change: '+12%',
      trend: 'up',
      icon: FiFileText,
      color: 'blue'
    },
    {
      title: 'Pending Review',
      value: stats.pending + stats.underReview,
      change: '-5%',
      trend: 'down',
      icon: FiClock,
      color: 'warning'
    },
    {
      title: 'Total Amount',
      value: `$${(stats.totalAmount / 1000000).toFixed(1)}M`,
      change: '+8%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'green'
    },
    {
      title: 'Avg Processing',
      value: `${stats.avgProcessingTime} days`,
      change: '-15%',
      trend: 'down',
      icon: FiCheckCircle,
      color: 'purple'
    }
  ]

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
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your claims.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <Link to="/claims/new" className="btn btn-primary">
            <FiPlus size={16} />
            New Claim
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="stats-grid"
        id="stats-overview"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((stat, index) => (
          <motion.div 
            key={stat.title}
            className={`stat-card stat-${stat.color}`}
            variants={itemVariants}
          >
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {stat.change} from last month
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Claims Over Time */}
        <motion.div 
          className="card chart-card"
          id="claims-chart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3 className="card-title">Claims Trend (Last 30 Days)</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot blue"></span> Claims</span>
              <span className="legend-item"><span className="legend-dot green"></span> Amount (K)</span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={claimsOverTime}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#003399" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="claims" 
                  stroke="#003399" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorClaims)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Claims by Status */}
        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3 className="card-title">Claims by Status</h3>
          </div>
          <div className="chart-container pie-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={claimsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {claimsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="charts-grid">
        {/* Monthly Comparison */}
        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3 className="card-title">Monthly Claims Comparison</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="claims" fill="#003399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Claims by Type */}
        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h3 className="card-title">Claims by Type</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={claimsByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {claimsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Claims */}
      <motion.div 
        className="card"
        id="recent-claims"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="card-header">
          <h3 className="card-title">Recent Claims</h3>
          <Link to="/claims" className="btn btn-ghost btn-sm">
            View All
            <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentClaims.map((claim) => (
                <tr key={claim.id}>
                  <td>
                    <Link to={`/claims/${claim.id}`} className="claim-link">
                      {claim.claimNumber}
                    </Link>
                  </td>
                  <td>{claim.customerName}</td>
                  <td>
                    <span className="badge badge-neutral">{claim.claimType}</span>
                  </td>
                  <td className="amount">${claim.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td>{format(new Date(claim.createdAt), 'MMM dd, yyyy')}</td>
                  <td>
                    <Link to={`/claims/${claim.id}`} className="btn btn-ghost btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="card quick-action-card">
          <FiFileText size={32} className="quick-action-icon" />
          <h4>Submit New Claim</h4>
          <p>Create a new insurance claim with all required documentation.</p>
          <Link to="/claims/new" className="btn btn-primary">
            Get Started
          </Link>
        </div>
        <div className="card quick-action-card">
          <FiUsers size={32} className="quick-action-icon" />
          <h4>Customer Lookup</h4>
          <p>Search for existing customers and view their claim history.</p>
          <Link to="/customers" className="btn btn-secondary">
            Search
          </Link>
        </div>
        <div className="card quick-action-card">
          <FiAlertCircle size={32} className="quick-action-icon" />
          <h4>Pending Actions</h4>
          <p>Review claims that require your attention or approval.</p>
          <Link to="/claims?status=Pending" className="btn btn-secondary">
            View Pending
          </Link>
        </div>
      </motion.div>
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

export default Dashboard
