import './ZurichLogo.css'
import zurichLogo from '../../assets/zurich.png'

// Official Zurich Insurance Logo Component
function ZurichLogo({ size = 'medium', variant = 'full', className = '' }) {
  const sizes = {
    small: { width: 100, height: 32 },
    medium: { width: 140, height: 45 },
    large: { width: 200, height: 65 },
    xlarge: { width: 280, height: 90 }
  }

  const { width, height } = sizes[size] || sizes.medium

  // Icon only variant (just the Z circle) - keeping SVG for icon
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

  // Full logo with actual Zurich image
  return (
    <img
      src={zurichLogo}
      alt="Zurich Insurance"
      className={`zurich-logo ${className}`}
      style={{ width: width, height: 'auto', maxHeight: height, objectFit: 'contain' }}
    />
  )
}

// Horizontal logo for headers - using actual image
export function ZurichLogoHorizontal({ className = '' }) {
  return (
    <div className={`zurich-logo-horizontal ${className}`}>
      <img
        src={zurichLogo}
        alt="Zurich Insurance"
        style={{ height: 36, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

// Stacked logo for welcome screens - using actual image
export function ZurichLogoStacked({ size = 'medium', className = '' }) {
  const heights = {
    small: 48,
    medium: 64,
    large: 80,
    xlarge: 100
  }
  const logoHeight = heights[size] || heights.medium

  return (
    <div className={`zurich-logo-stacked ${size} ${className}`}>
      <img
        src={zurichLogo}
        alt="Zurich Insurance"
        style={{ height: logoHeight, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

export default ZurichLogo
