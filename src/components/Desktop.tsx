import React from 'react';
import VantaBackground from './VantaBackground';
import ParallaxBackground from './ParallaxBackground';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Vanta.js Animated Background */}
      <VantaBackground />
      
      {/* Enhanced Parallax Background Effects */}
      <ParallaxBackground />
      
      {/* Frosted Glass Overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-[1px]" 
        style={{ 
          zIndex: 3,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)'
        }} 
      />
      
      {/* Desktop Content */}
      <div className="relative h-full" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default Desktop;