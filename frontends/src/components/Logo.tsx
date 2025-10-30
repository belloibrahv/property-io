import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact';
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  className = '', 
  width,
  height 
}) => {
  if (variant === 'compact') {
    return (
      <svg 
        width={width || 120} 
        height={height || 40} 
        viewBox="0 0 120 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`logo-animated ${className}`}
      >
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#1D4ED8', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#F59E0B', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#D97706', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#E2E8F0', stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        <g>
          <circle cx="20" cy="20" r="16" fill="url(#primaryGradient)" opacity="0.12" className="pulse"/>
          
          <g transform="translate(8, 8)">
            <rect x="4" y="16" width="16" height="12" fill="url(#primaryGradient)" rx="1"/>
            <rect x="6" y="18" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="10" y="18" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="16" y="18" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="6" y="22" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="10" y="22" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="16" y="22" width="2" height="2" fill="white" opacity="0.8" rx="0.3"/>
            <rect x="8" y="25" width="4" height="3" fill="url(#accentGradient)" rx="0.5"/>
            
            <path d="M2 10 L12 4 L22 10 L18 13 L12 8 L6 13 Z" fill="url(#accentGradient)" opacity="0.9" className="roof"/>
          </g>
          
          <text x="42" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="700" fill="url(#textGradient)">
            Afrika Property
          </text>
          <text x="42" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="600" fill="url(#accentGradient)">
            Guardian
          </text>

          <line x1="42" y1="31" x2="110" y2="31" stroke="url(#primaryGradient)" strokeWidth="1" opacity="0.3" className="orbit"/>
        </g>
      </svg>
    );
  }

  return (
    <svg 
      width={width || 200} 
      height={height || 60} 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-animated ${className}`}
    >
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#1D4ED8', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#F59E0B', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#D97706', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#E2E8F0', stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      <g>
        <circle cx="30" cy="30" r="25" fill="url(#primaryGradient)" opacity="0.12" className="pulse"/>
        
        <g transform="translate(10, 10)">
          <rect x="8" y="25" width="24" height="20" fill="url(#primaryGradient)" rx="2"/>
          
          <rect x="10" y="28" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          <rect x="16" y="28" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          <rect x="26" y="28" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          
          <rect x="10" y="34" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          <rect x="16" y="34" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          <rect x="26" y="34" width="4" height="4" fill="white" opacity="0.8" rx="0.5"/>
          
          <rect x="13" y="40" width="6" height="5" fill="url(#accentGradient)" rx="1"/>
          
          <path d="M5 15 L20 5 L35 15 L30 20 L20 12 L10 20 Z" fill="url(#accentGradient)" opacity="0.9" className="roof"/>
          
          <circle cx="6" cy="18" r="2" fill="url(#accentGradient)" opacity="0.7"/>
          <circle cx="34" cy="18" r="2" fill="url(#accentGradient)" opacity="0.7"/>
          
          <line x1="2" y1="22" x2="38" y2="22" stroke="url(#primaryGradient)" strokeWidth="1" opacity="0.6" className="orbit"/>
        </g>
        
        <text x="65" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" fill="url(#textGradient)">
          Afrika Property
        </text>
        <text x="65" y="42" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="600" fill="url(#accentGradient)">
          Guardian
        </text>
        
        <line x1="65" y1="47" x2="180" y2="47" stroke="url(#primaryGradient)" strokeWidth="1" opacity="0.3"/>
      </g>
    </svg>
  );
};

export default Logo;