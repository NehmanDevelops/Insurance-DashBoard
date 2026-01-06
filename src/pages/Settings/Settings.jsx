import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiUser, 
  FiLock, 
  FiBell, 
  FiMail,
  FiSave,
  FiShield,
  FiGlobe,
  FiMoon,
  FiSun,
  FiMonitor,
  FiCheck,
  FiUpload
} from 'react-icons/fi'
import './Settings.css'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [theme, setTheme] = useState('light')
  
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@zurich.ca',
    phone: '+1 (416) 555-0123',
    role: 'Senior Claims Adjuster',
    department: 'Claims Management',
    employeeId: 'ZCA-2024-0892'
  })

  const [notifications, setNotifications] = useState({
    emailClaims: true,
    emailReports: true,
    emailUpdates: false,
    pushClaims: true,
    pushReminders: true,
    pushAlerts: true
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'preferences', label: 'Preferences', icon: FiGlobe }
  ]

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-container">
        {/* Sidebar */}
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-panel"
            >
              <div className="panel-header">
                <h2>Profile Information</h2>
                <p>Update your personal details and contact information</p>
              </div>

              <div className="avatar-section">
                <div className="avatar-large">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Profile" />
                </div>
                <div className="avatar-actions">
                  <button className="btn btn-secondary btn-sm">
                    <FiUpload size={14} />
                    Upload Photo
                  </button>
                  <span className="avatar-hint">JPG, PNG or GIF. Max 2MB</span>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" value={profile.role} disabled />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" value={profile.department} disabled />
                </div>
                <div className="form-group full-width">
                  <label>Employee ID</label>
                  <input type="text" value={profile.employeeId} disabled />
                </div>
              </div>

              <div className="panel-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  <FiSave size={16} />
                  Save Changes
                </button>
                {saved && (
                  <motion.span 
                    className="save-success"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <FiCheck size={16} />
                    Changes saved successfully!
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-panel"
            >
              <div className="panel-header">
                <h2>Security Settings</h2>
                <p>Manage your password and security preferences</p>
              </div>

              <div className="security-section">
                <h3>Change Password</h3>
                <div className="form-stack">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">
                  <FiLock size={14} />
                  Update Password
                </button>
              </div>

              <div className="security-section">
                <h3>Two-Factor Authentication</h3>
                <p className="section-text">Add an extra layer of security to your account</p>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <FiShield size={20} />
                    <div>
                      <span className="toggle-label">Enable 2FA</span>
                      <span className="toggle-desc">Require a verification code when signing in</span>
                    </div>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="security-section">
                <h3>Active Sessions</h3>
                <p className="section-text">Manage devices where you're currently logged in</p>
                <div className="session-list">
                  <div className="session-item current">
                    <div className="session-icon">
                      <FiMonitor size={20} />
                    </div>
                    <div className="session-info">
                      <span className="session-device">Windows PC - Chrome</span>
                      <span className="session-location">Toronto, Canada • Current session</span>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <div className="session-item">
                    <div className="session-icon">
                      <FiMonitor size={20} />
                    </div>
                    <div className="session-info">
                      <span className="session-device">iPhone 15 - Safari</span>
                      <span className="session-location">Toronto, Canada • 2 hours ago</span>
                    </div>
                    <button className="btn btn-ghost btn-sm">Revoke</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-panel"
            >
              <div className="panel-header">
                <h2>Notification Preferences</h2>
                <p>Choose how you want to be notified</p>
              </div>

              <div className="notification-section">
                <h3>
                  <FiMail size={18} />
                  Email Notifications
                </h3>
                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Claim Updates</span>
                      <span className="notification-desc">Get notified when claims are updated</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.emailClaims}
                        onChange={(e) => setNotifications({...notifications, emailClaims: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Report Delivery</span>
                      <span className="notification-desc">Receive scheduled reports via email</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.emailReports}
                        onChange={(e) => setNotifications({...notifications, emailReports: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Product Updates</span>
                      <span className="notification-desc">News about new features and updates</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.emailUpdates}
                        onChange={(e) => setNotifications({...notifications, emailUpdates: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="notification-section">
                <h3>
                  <FiBell size={18} />
                  Push Notifications
                </h3>
                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">New Claim Assignments</span>
                      <span className="notification-desc">When a new claim is assigned to you</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.pushClaims}
                        onChange={(e) => setNotifications({...notifications, pushClaims: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Deadline Reminders</span>
                      <span className="notification-desc">Reminders for upcoming deadlines</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.pushReminders}
                        onChange={(e) => setNotifications({...notifications, pushReminders: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Urgent Alerts</span>
                      <span className="notification-desc">Critical alerts that need immediate attention</span>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={notifications.pushAlerts}
                        onChange={(e) => setNotifications({...notifications, pushAlerts: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  <FiSave size={16} />
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-panel"
            >
              <div className="panel-header">
                <h2>Application Preferences</h2>
                <p>Customize your dashboard experience</p>
              </div>

              <div className="preference-section">
                <h3>Appearance</h3>
                <p className="section-text">Choose your preferred theme</p>
                <div className="theme-options">
                  <div 
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <FiSun size={24} />
                    <span>Light</span>
                  </div>
                  <div 
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <FiMoon size={24} />
                    <span>Dark</span>
                  </div>
                  <div 
                    className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    <FiMonitor size={24} />
                    <span>System</span>
                  </div>
                </div>
              </div>

              <div className="preference-section">
                <h3>Language & Region</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Language</label>
                    <select defaultValue="en">
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Time Zone</label>
                    <select defaultValue="america/toronto">
                      <option value="america/toronto">Eastern Time (Toronto)</option>
                      <option value="america/vancouver">Pacific Time (Vancouver)</option>
                      <option value="america/calgary">Mountain Time (Calgary)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date Format</label>
                    <select defaultValue="mdy">
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Currency</label>
                    <select defaultValue="cad">
                      <option value="cad">CAD ($)</option>
                      <option value="usd">USD ($)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="preference-section">
                <h3>Dashboard Defaults</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Default View</label>
                    <select defaultValue="dashboard">
                      <option value="dashboard">Dashboard</option>
                      <option value="claims">Claims</option>
                      <option value="analytics">Analytics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Items Per Page</label>
                    <select defaultValue="10">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  <FiSave size={16} />
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
