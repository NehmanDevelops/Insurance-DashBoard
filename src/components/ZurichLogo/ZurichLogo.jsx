import './ZurichLogo.css'

// Official Zurich Insurance Logo Component
function ZurichLogo({ size = 'medium', variant = 'full', className = '' }) {
  const sizes = {
    small: { width: 100, height: 32 },
    medium: { width: 140, height: 45 },
    large: { width: 200, height: 65 },
    xlarge: { width: 280, height: 90 }
  }

  const { width, height } = sizes[size] || sizes.medium

  // Icon only variant (just the Z circle)
  if (variant === 'icon') {
    const iconSize = size === 'small' ? 32 : size === 'large' ? 56 : size === 'xlarge' ? 72 : 40
    return (
      <svg
        className={`zurich-logo-icon ${className}`}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#1A67A7" />
        <path
          d="M28 35H72L28 65H72"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }

  // Full logo with wordmark
  return (
    <svg
      className={`zurich-logo ${className}`}
      width={width}
      height={height}
      viewBox="0 0 280 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Z Circle Icon */}
      <circle cx="45" cy="45" r="43" fill="#1A67A7" />
      <path
        d="M22 28H68L22 62H68"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* ZURICH Text */}
      <text
        x="100"
        y="58"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="bold"
        fill="#1A67A7"
        letterSpacing="2"
      >
        ZURICH
      </text>
    </svg>
  )
}

// Horizontal logo for headers
export function ZurichLogoHorizontal({ className = '' }) {
  return (
    <div className={`zurich-logo-horizontal ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#1A67A7" />
        <path
          d="M28 35H72L28 65H72"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="zurich-wordmark">Zurich</span>
    </div>
  )
}

// Stacked logo for welcome screens
export function ZurichLogoStacked({ size = 'medium', className = '' }) {
  const iconSizes = {
    small: 48,
    medium: 64,
    large: 80,
    xlarge: 100
  }
  const iconSize = iconSizes[size] || iconSizes.medium

  return (
    <div className={`zurich-logo-stacked ${size} ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#1A67A7" />
        <path
          d="M28 35H72L28 65H72"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="zurich-wordmark-stacked">ZURICH</span>
    </div>
  )
}

export default ZurichLogo
