import React from 'react';

interface IconProps {
  className?: string;
}

export function AnimationIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8 2s3 3 8 3 8-3 8-3v10s-3 3-8 3-8-3-8-3z"></path>
      <path d="M8 12v10s3-3 8-3 8 3 8 3V12"></path>
      <circle cx="4" cy="8" r="2"></circle>
      <path d="M4 14v2a6 6 0 0 0 12 0v-3"></path>
      <path d="M6 6v8"></path>
    </svg>
  );
}

export function CharacterReelIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M20 13.8a7 7 0 0 0-8-5.5m-8 5.5a7 7 0 0 1 8-5.5"></path>
      <path d="M15 8a2 2 0 0 0-3 0"></path>
      <path d="M9 12h6"></path>
      <path d="M8 16l1-4a5 5 0 0 0 6 0l1 4"></path>
    </svg>
  );
}

export function TVIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="4" width="20" height="15" rx="2"></rect>
      <path d="M8 20h8"></path>
      <path d="M12 16v4"></path>
      <path d="m9 8 2 2 4-4"></path>
    </svg>
  );
}

export function CommercialIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 7h18m-2 8H8a2 2 0 0 1-2-2V7"></path>
      <path d="M7 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0"></path>
      <path d="M18 7v4a2 2 0 0 1-2 2v0"></path>
      <circle cx="16" cy="20" r="2"></circle>
      <path d="M22 7v4a2 2 0 0 1-2 2h-2"></path>
      <circle cx="8" cy="20" r="2"></circle>
    </svg>
  );
}

export function DocumentaryIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M8 12h8"></path>
      <path d="M8 8h4"></path>
      <path d="M8 16h3"></path>
      <path d="M18 3v18"></path>
    </svg>
  );
}

export function FullReelIcon({ className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}
