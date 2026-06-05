import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textColor?: string;
  theme?: 'dark' | 'light';
}

export default function Logo({
  className = '',
  size = 40,
  withText = false,
  textColor,
  theme = 'light',
}: LogoProps) {
  // Determine standard color of the font
  const defaultFillColor = theme === 'dark' ? '#FFFFFF' : '#3B2314';
  
  return (
    <div className={`flex flex-col items-center justify-center select-none shrink-0 ${className}`} style={{ width: size, height: withText ? size * 1.25 : size }}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Main Badge shadow details to look professional */}
        <circle cx="100" cy="95" r="72" fill="#F97316" className="opacity-10" />
        
        {/* Main Orange Circle */}
        <circle cx="100" cy="95" r="68" fill="#F97316" />
        
        {/* Inner White Ring */}
        <circle cx="100" cy="95" r="61" fill="none" stroke="white" strokeWidth="4" />
        
        {/* Stylized White Chicken Head */}
        {/* Composed of: Crown comb, beak, head silhouette, wattle */}
        <path
          d="M 64,136 
             C 62,112 68,90 85,80 
             C 77,74 76,64 85,58 
             C 95,52 108,54 112,66 
             C 118,63 125,66 132,73 
             C 138,79 148,88 152,94 
             L 155,97 
             C 142,101 133,105 130,113 
             C 126,110 119,114 116,120 
             C 107,121 95,129 82,136 
             Z"
          fill="white"
        />
        
        {/* Overlapping smooth circular wattle */}
        <circle cx="140" cy="115" r="10" fill="white" />
        
        {withText && (
          <>
            {/* Text arc pathway */}
            <path
              id="word-arc"
              d="M 15,190 Q 100,214 185,190"
              fill="none"
            />
            <text
              className="font-extrabold tracking-widest font-sans"
              style={{ 
                fontSize: '28px', 
                fill: textColor || defaultFillColor,
                fontWeight: 900,
                letterSpacing: '0.12em'
              }}
            >
              <textPath href="#word-arc" startOffset="50%" textAnchor="middle">
                JABEEL
              </textPath>
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
