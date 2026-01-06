import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDownload,
  FiCalendar,
  FiFilter
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
  Legend,
  ComposedChart
} from 'recharts'
import { useClaimsStore } from '../../store/claimsStore'
import './Analytics.css'

const COLORS = ['#003399', '#0066CC', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

function Analytics() {
  const { claims, getStatistics } = useClaimsStore()
  const stats = getStatistics()

  // Processing time by month
  const processingTimeData = useMemo(() => {
    return [
      { month: 'Jan', avgDays: 5.2, target: 4 },
      { month: 'Feb', avgDays: 4.8, target: 4 },
      { month: 'Mar', avgDays: 4.5, target: 4 },
      { month: 'Apr', avgDays: 4.2, target: 4 },
      { month: 'May', avgDays: 3.9, target: 4 },
      { month: 'Jun', avgDays: 4.1, target: 4 },
      { month: 'Jul', avgDays: 3.8, target: 4 },
      { month: 'Aug', avgDays: 4.0, target: 4 },
      { month: 'Sep', avgDays: 3.7, target: 4 },
      { month: 'Oct', avgDays: 3.5, target: 4 },
      { month: 'Nov', avgDays: 3.6, target: 4 },
      { month: 'Dec', avgDays: 3.4, target: 4 }
    ]
  }, [])

  // Claims by adjuster
  const adjusterData = useMemo(() => {
    const adjusters = {}
    claims.forEach(claim => {
      if (!adjusters[claim.adjuster]) {
        adjusters[claim.adjuster] = { name: claim.adjuster, claims: 0, amount: 0 }
      }
      adjusters[claim.adjuster].claims += 1
      adjusters[claim.adjuster].amount += claim.amount
    })
    return Object.values(adjusters).sort((a, b) => b.claims - a.claims)
  }, [claims])

  // Approval rate trend
  const approvalTrend = useMemo(() => {
    return [
      { month: 'Jan', rate: 78 },
      { month: 'Feb', rate: 82 },
      { month: 'Mar', rate: 80 },
      { month: 'Apr', rate: 85 },
      { month: 'May', rate: 87 },
      { month: 'Jun', rate: 84 },
      { month: 'Jul', rate: 89 },
      { month: 'Aug', rate: 91 },
      { month: 'Sep', rate: 88 },
      { month: 'Oct', rate: 92 },
      { month: 'Nov', rate: 90 },
      { month: 'Dec', rate: 94 }
    ]
  }, [])

  // Claims amount distribution
  const amountDistribution = useMemo(() => {
    const ranges = [
      { range: '$0-5K', min: 0, max: 5000, count: 0 },
      { range: '$5K-10K', min: 5000, max: 10000, count: 0 },
      { range: '$10K-25K', min: 10000, max: 25000, count: 0 },
      { range: '$25K-50K', min: 25000, max: 50000, count: 0 },
      { range: '$50K+', min: 50000, max: Infinity, count: 0 }
    ]
    
    claims.forEach(claim => {
      const range = ranges.find(r => claim.amount >= r.min && claim.amount < r.max)
      if (range) range.count++
    })
    
    return ranges
  }, [claims])

  // Customer satisfaction data
  const satisfactionData = useMemo(() => {
    return [
      { category: 'Very Satisfied', value: 45 },
      { category: 'Satisfied', value: 30 },
      { category: 'Neutral', value: 15 },
      { category: 'Dissatisfied', value: 7 },
      { category: 'Very Dissatisfied', value: 3 }
    ]
  }, [])

  const kpis = [
    {
      title: 'Claims Processed',
      value: stats.total,
      change: '+12.5%',
      trend: 'up',
      subtitle: 'vs last month'
    },
    {
      title: 'Approval Rate',
      value: '94%',
      change: '+3.2%',
      trend: 'up',
      subtitle: 'vs last month'
    },
    {
      title: 'Avg Processing Time',
      value: '3.4 days',
      change: '-15%',
      trend: 'up',
      subtitle: 'vs last month'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      trend: 'up',
      subtitle: 'vs last month'
    }
  ]

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p className="analytics-subtitle">Comprehensive insights into claims performance</p>
        </div>
        <div className="analytics-actions">
          <select className="filter-select">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
            <option>All time</option>
          </select>
          <button className="btn btn-secondary">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" id="analytics-overview">
        {kpis.map((kpi, index) => (
          <motion.div 
            key={kpi.title}
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="kpi-header">
              <span className="kpi-title">{kpi.title}</span>
              <span className={`kpi-change ${kpi.trend}`}>
                {kpi.trend === 'up' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {kpi.change}
              </span>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-subtitle">{kpi.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <motion.div 
          className="card chart-card large"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3 className="card-title">Processing Time Trend</h3>
            <span className="card-subtitle">Average days to process claims</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="avgDays" name="Avg Days" fill="#003399" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3 className="card-title">Claims by Amount</h3>
            <span className="card-subtitle">Distribution of claim values</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={amountDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis type="category" dataKey="range" stroke="#9CA3AF" fontSize={12} width={70} />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#0066CC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3 className="card-title">Approval Rate Trend</h3>
            <span className="card-subtitle">Monthly claim approval percentage</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={approvalTrend}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'Approval Rate']}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h3 className="card-title">Customer Satisfaction</h3>
            <span className="card-subtitle">Survey response breakdown</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value}%`, '']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Adjusters Table */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="card-header">
          <h3 className="card-title">Adjuster Performance</h3>
          <span className="card-subtitle">Claims processed by team member</span>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Adjuster</th>
                <th>Claims Processed</th>
                <th>Total Amount</th>
                <th>Avg Processing Time</th>
                <th>Approval Rate</th>
              </tr>
            </thead>
            <tbody>
              {adjusterData.map((adjuster) => (
                <tr key={adjuster.name}>
                  <td>
                    <div className="adjuster-cell">
                      <div className="adjuster-avatar">{adjuster.name.charAt(0)}</div>
                      <span>{adjuster.name}</span>
                    </div>
                  </td>
                  <td>{adjuster.claims}</td>
                  <td>${adjuster.amount.toLocaleString()}</td>
                  <td>{(Math.random() * 2 + 2).toFixed(1)} days</td>
                  <td>
                    <div className="approval-cell">
                      <div className="approval-bar">
                        <div 
                          className="approval-fill" 
                          style={{ width: `${Math.floor(Math.random() * 20 + 80)}%` }}
                        />
                      </div>
                      <span>{Math.floor(Math.random() * 20 + 80)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
