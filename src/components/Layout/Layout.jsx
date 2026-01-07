import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, 
  FiFileText, 
  FiUpload,
  FiUser,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiBell,
  FiSearch,
  FiHelpCircle,
  FiChevronDown,
  FiPhone
} from 'react-icons/fi'
import { useDemoStore } from '../../store/demoStore'
import './Layout.css'

const navItems = [
  { path: '/', icon: FiHome, label: 'My Claims', id: 'nav-dashboard' },
  { path: '/claims', icon: FiFileText, label: 'Track Claims', id: 'nav-claims' },
  { path: '/claims/new', icon: FiUpload, label: 'File New Claim', id: 'nav-new-claim' },
  { path: '/settings', icon: FiUser, label: 'My Profile', id: 'nav-settings' },
]

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const { isDemoMode, startDemo } = useDemoStore()

  const notifications = [
    { id: 1, title: 'Claim status updated', message: 'Your auto claim CLM-2025-00051 is now Under Review', time: '5 min ago', unread: true },
    { id: 2, title: 'Document received', message: 'We received your photos for CLM-2025-00051', time: '1 hour ago', unread: true },
    { id: 3, title: 'Action needed', message: 'Please upload police report for CLM-2025-00045', time: '2 hours ago', unread: false },
    { id: 4, title: 'Payment sent!', message: '$2,340 deposited for CLM-2025-00028', time: 'Yesterday', unread: false },
  ]

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="white"/>
                <path d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20Z" fill="#003399"/>
                <path d="M20 12V28M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="logo-text"
              >
                <span className="logo-title">Zurich</span>
                <span className="logo-subtitle">Customer Portal</span>
              </motion.div>
            )}
          </div>
          <button 
            className="sidebar-toggle hide-mobile"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              id={item.id}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="demo-card"
            >
              <FiHelpCircle size={24} className="demo-icon" />
              <p>Need help getting started?</p>
              <button className="btn btn-sm btn-secondary" onClick={startDemo}>
                Start Demo Tour
              </button>
            </motion.div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="header" id="header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <FiMenu size={24} />
            </button>
            <div className="search-bar" id="search-bar">
              <FiSearch size={18} />
              <input 
                type="text" 
                placeholder="Search your claims..." 
                className="search-input"
              />
              <span className="search-shortcut">⌘K</span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              {/* Notifications */}
              <div className="notification-wrapper">
                <button 
                  className="header-btn" 
                  id="notifications-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
                >
                  <FiBell size={20} />
                  <span className="notification-badge">4</span>
                </button>
                
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div 
                      className="dropdown notifications-dropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="dropdown-header">
                        <h4>Notifications</h4>
                        <button className="btn btn-ghost btn-sm">Mark all read</button>
                      </div>
                      <div className="dropdown-content">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                            <div className="notification-dot" />
                            <div className="notification-body">
                              <p className="notification-title">{notif.title}</p>
                              <p className="notification-message">{notif.message}</p>
                              <span className="notification-time">{notif.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="dropdown-footer">
                        <button className="btn btn-ghost">View all notifications</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="user-menu-wrapper">
                <button 
                  className="user-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                >
                  <div className="user-avatar">
                    <span>JD</span>
                  </div>
                  <div className="user-info hide-mobile">
                    <span className="user-name">John Doe</span>
                    <span className="user-role">Policy #POL-847291</span>
                  </div>
                  <FiChevronDown size={16} className="hide-mobile" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      className="dropdown user-dropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="dropdown-item">
                        <FiUser size={18} />
                        <span>My Profile</span>
                      </div>
                      <div className="dropdown-item">
                        <FiSettings size={18} />
                        <span>Account Settings</span>
                      </div>
                      <div className="dropdown-item">
                        <FiPhone size={18} />
                        <span>Contact Support</span>
                      </div>
                      <div className="dropdown-item">
                        <FiHelpCircle size={18} />
                        <span>Help & FAQ</span>
                      </div>
                      <hr className="dropdown-divider" />
                      <div className="dropdown-item text-danger">
                        <FiLogOut size={18} />
                        <span>Sign Out</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div 
                className="mobile-menu"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <div className="logo">
                    <div className="logo-icon">
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="white"/>
                        <path d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20Z" fill="#003399"/>
                        <path d="M20 12V28M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="logo-text">
                      <span className="logo-title">Zurich</span>
                      <span className="logo-subtitle">Claims Portal</span>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <FiX size={24} />
                  </button>
                </div>
                <nav className="mobile-nav">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `mobile-nav-item ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="main-content">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout
