import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="15" stroke="url(#dot-gradient)" strokeWidth="2" />
      <circle cx="16" cy="16" r="8" fill="url(#dot-gradient)" />
      <defs>
        <linearGradient
          id="dot-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFFF" /> {/* Cyan color */}
          <stop offset="1" stopColor="#7C3AED" /> {/* Purple color */}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo; 