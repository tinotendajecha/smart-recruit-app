'use client';

import React from 'react';

interface LoadingProps {
  variant?: 'fullscreen' | 'component';
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({ 
  variant = 'component',
  text = 'Loading...',
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const LoadingSpinner = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer circle */}
      <div className="absolute inset-0 border-4 border-green-100 rounded-full" />
      
      {/* Animated circle */}
      <div className="absolute inset-0 border-4 border-green-600 rounded-full animate-spin-slow" style={{
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        animationDuration: '1.5s'
      }} />

      {/* Inner pulsing circle */}
      <div className="absolute inset-4 bg-green-500 rounded-full opacity-20 animate-pulse" />
      
      {/* Center dot */}
      <div className="absolute inset-[42%] bg-green-600 rounded-full" />
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <LoadingSpinner />
      {text && (
        <p className="mt-2 text-sm text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Export smaller components for specific use cases
export const LoadingDots = () => (
  <div className="flex space-x-1 items-center justify-center mt-64">
    {[1, 2, 3].map((dot) => (
      <div
        key={dot}
        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
        style={{ animationDelay: `${dot * 0.1}s` }}
      />
    ))}
  </div>
);

export const LoadingBar = () => (
  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className="h-full bg-green-600 rounded-full animate-loading-bar"
      style={{
        width: '30%',
      }}
    />
  </div>
);